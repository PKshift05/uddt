import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default class SettingAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: null,
            newPassword: null,
            confirmPassword: null,
            userData: null,
            errorMessagePS: "",
            errorMessagePSconfirm: "",
            successful: ""
        };
    }

    componentDidMount() {
        this.loadUserData();
    }

    async loadUserData() {
        try {
            const user = await AsyncStorage.getItem('user'); // Use AsyncStorage
            if (user !== null) {
                this.setState({ userData: JSON.parse(user) });
            }
        } catch (error) {
            console.error('Something went wrong while getting Data', error);
        }
    }
    handleTextInputFocus = () => {
        // Ẩn thông báo lỗi khi người dùng tương tác với TextInput
        this.setState({ errorMessagePS: "" });
        this.setState({ errorMessagePSconfirm: "" });

    };

    async checkPass() {
        const { oldPassword, newPassword, confirmPassword, userData } = this.state;
        if (oldPassword == null) {
            this.setState({ errorMessagePS: "You haven't filled it in yet!" })
        }
        if (oldPassword != userData?.password) {
            this.setState({ errorMessagePS: "You entered the wrong password!" })
        }
        if (newPassword != confirmPassword) {
            this.setState({ errorMessagePSconfirm: "Not confirmed!" })
            if (newPassword == "" || confirmPassword == "") {
                this.setState({ errorMessagePSconfirm: "You haven't filled it in yet!" })
            }
        }
    }

    async changePass() {
        const { errorMessagePS, errorMessagePSconfirm, newPassword, userData } = this.state;
        await this.checkPass();
        if (errorMessagePS == "" && errorMessagePSconfirm == "") {
            try {
                const response = await axios.post('http://172.20.10.3:3000/changePassword', {
                    password: newPassword,
                    id: userData?.userID,
                });

                if (response.data.message === "Thay đổi thành công") {
                    // Xử lý sau khi đăng nhập thành công, ví dụ: chuyển hướng đến trang Tab
                    this.setState({ successful: "Successful!" });


                    //   await AsyncStorage.setItem(
                    //     'user', JSON.stringify({
                    //       userName: userName,
                    //       password: password,
                    //       userID: userAcc[0]?.UserID,
                    //     }),
                    //   );


                }
            } catch (error) {
                // Xử lý lỗi
                console.error(error);
            }
        };
    }
    render() {
        const { oldPassword, newPassword, confirmPassword, userData, errorMessagePS, errorMessagePSconfirm, successful } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.containerChange}>

                    <Text style={styles.Title}>Change Password</Text>
                    <TextInput
                        style={styles.textInput}

                        mode="outlined"
                        label="Your Password"
                        placeholder="Type something"
                        textColor='white'
                        outlineColor={COLORS.WhiteRGBA50}
                        activeOutlineColor={COLORS.WhiteRGBA50}
                        left={<TextInput.Icon icon="lock" />}
                        onChangeText={(text) => this.setState({ oldPassword: text })}
                        onFocus={this.handleTextInputFocus}

                    />
                    {errorMessagePS !== '' && (
                        <Text style={styles.errorText}>{errorMessagePS}</Text>
                    )}
                    <TextInput
                        style={styles.textInput}
                        mode="outlined"
                        label="New Password"
                        placeholder="Type something"
                        textColor='white'
                        outlineColor={COLORS.WhiteRGBA50}
                        activeOutlineColor={COLORS.WhiteRGBA50}
                        left={<TextInput.Icon icon="lock" />}
                        onChangeText={(text) => this.setState({ newPassword: text })}
                        onFocus={this.handleTextInputFocus}

                    />
                    <TextInput
                        style={styles.textInput}
                        mode="outlined"
                        label="Confirm New Password"
                        placeholder="Type something"
                        textColor='white'
                        outlineColor={COLORS.WhiteRGBA50}
                        activeOutlineColor={COLORS.WhiteRGBA50}
                        left={<TextInput.Icon icon="lock" />}
                        onChangeText={(text) => this.setState({ confirmPassword: text })}
                        onFocus={this.handleTextInputFocus}

                    />
                    {errorMessagePSconfirm !== '' && (
                        <Text style={styles.errorText}>{errorMessagePSconfirm}</Text>
                    )}
                    {successful !== '' && (
                        <Text style={styles.successfulText}>{successful}</Text>
                    )}
                </View>
                <Button
                    style={styles.buttonSave}
                    mode='contained'
                    buttonColor={COLORS.Orange}
                    onPress={() => this.changePass()}
                >
                    <Text style={{
                        marginTop: 15,
                        fontSize: 20,
                        color: COLORS.White,

                    }}>
                        Save
                    </Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: COLORS.Black,
    },
    Title: {
        marginVertical: SPACING.space_20,
        color: COLORS.Orange,
        fontSize: FONTSIZE.size_24,
        alignSelf: 'center'
    },
    textInput: {
        marginVertical: SPACING.space_10,
        backgroundColor: COLORS.DarkGrey,
        width: '90%',
        alignSelf: 'center',
    },
    containerChange: {
        marginVertical: SPACING.space_36,
    },
    buttonSave: {
        borderRadius: SPACING.space_20 + 5,
        marginHorizontal: SPACING.space_20,
        height: 50,
    },
    errorText: {
        marginVertical: SPACING.space_4,
        color: 'red',
        textAlign: 'center',
    },

    successfulText: {
        color: 'green',
        marginVertical: SPACING.space_4,
        textAlign: 'center',
    },
})
