import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, FlatList, Image } from 'react-native';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../component/AppHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class ListTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            userData: null,
        };
    }

    async componentDidMount() {
        await this.getUserDataFromStorage();
        console.log(this.state.userData?.userID);
        this.getListTicket();
    }

    async getUserDataFromStorage() {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user !== null) {
                this.setState({ userData: JSON.parse(user) });
            }
        } catch (error) {
            console.log('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
        }
    }

    async getListTicket() {
        axios
            .post('http://192.168.1.8:3000/getListTickets', {
                userID: this.state.userData?.userID
            })
            .then(res => {
                // Handle a successful response
                this.setState({
                    data: res.data,
                });

            })
            .catch((error) => {
                console.error('Lỗi gọi API: ', error);
            });
    }

    render() {
        const { data } = this.state;
        console.log(data)
        return (

            <ScrollView style={styles.container}>
                <StatusBar hidden />
                <View style={styles.appHeaderContainer}>
                    <AppHeader
                        name="close"
                        header={'Purchased Tickets'}
                        action={() => this.props.navigation.goBack()} />
                </View>
                <View style={styles.ScrollList}>

                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item) => item.id}
                        horizontal={false} // Đặt giá trị này thành false để hiển thị dọc
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>

                                <Image style={styles.image} source={{uri:item.MoviePoster}} />
                                <View style={styles.item}>
                                    <Text style={styles.itemText} >Film: {item.NameMovie}</Text>
                                    <Text style={styles.subText} >Time: {item.Timestamp}</Text>
                                    <Text style={styles.subText} >NumberOfSeats: {item.NumberOfSeats}</Text>
                                </View>
                            </View>
                        )}
                    />

                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: COLORS.Black,
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.DarkGrey,
        borderBottomWidth: 5,
    },
    appHeaderContainer: {
        marginHorizontal: SPACING.space_36,
        marginTop: SPACING.space_20 * 2,
    },
    image: {
        width: 100,
        height: 100,
    },
    item: {
        padding: SPACING.space_20,
        marginVertical: 2,
        marginHorizontal: 16,


    },
    itemText: {
        fontSize: 18,
        color: COLORS.White,
    },
    ScrollList: {
        marginTop: SPACING.space_28
    },
    subText: {
        marginTop: SPACING.space_4,
        fontSize: FONTSIZE.size_14,
        color: COLORS.WhiteRGBA50,
    }

})
