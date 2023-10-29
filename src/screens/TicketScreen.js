import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, ImageBackground, TouchableOpacity, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppHeader from '../component/AppHeader';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import DashedLine from 'react-native-dashed-line';
import { Button, IconButton, MD3Colors } from 'react-native-paper';




export default class TicketScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketData: null,
    };
  }

  componentDidMount() {
    this.loadTicketData();
  }

  componentDidUpdate(prevProps) {
    // So sánh giá trị params trước và sau khi component cập nhật
    if (prevProps.route.params !== this.props.route.params) {
      this.loadTicketData();
    }
  }
  async loadTicketData() {
    try {
      const ticket = await AsyncStorage.getItem('ticket'); // Use AsyncStorage
      if (ticket !== null) {
        this.setState({ ticketData: JSON.parse(ticket) });
      }

    } catch (error) {
      console.error('Something went wrong while getting Data', error);
    }
  }


  render() {
    const { ticketData } = this.state;
    console.log(ticketData);

    if (ticketData == undefined || ticketData == null) {
      return (
        <View style={styles.container}>
          <StatusBar hidden />
          <View style={styles.appHeaderContainer}>
            <AppHeader
              name="close"
              header={'My Tickets'}
              action={() => this.props.navigation.goBack()} />
          </View>
        </View>
      );
    }
    // if (ticketData != this.props.route.params && this.props.route.params != undefined ){
    //   this.loadTicketData(); 
    // }
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={'My Tickets'}
            action={() => this.props.navigation.goBack()} />
        </View>

        <View style={styles.ticketContainer}>
          <ImageBackground
            source={{ uri: ticketData?.ticketImage }}
            style={styles.ticketBGImage}
          >
            <LinearGradient colors={[COLORS.OrrangeRGBA0, COLORS.Orange]} style={styles.linearGradient}>
              <View style={[styles.blackCircle,
              { position: 'absolute', bottom: -40, left: -40 }]}></View>
              <View style={[styles.blackCircle,
              { position: 'absolute', bottom: -40, right: -40 }]}></View>
            </LinearGradient>
          </ImageBackground>
          <View style={styles.linear}>
            <DashedLine dashLength={5} />
          </View>

          <View style={styles.ticketFooter}>
            <View style={[styles.blackCircle,
            { position: 'absolute', top: -40, left: -40 }]}></View>
            <View style={[styles.blackCircle,
            { position: 'absolute', top: -40, right: -40 }]}></View>
            <View style={styles.ticketDateContainer}>
              <View>
                <Text style={styles.dateTitle}>{ticketData?.date.date}</Text>
                <Text style={styles.subtitle}>{ticketData?.date.day}</Text>
              </View>
              <View style={styles.Private}>
                <View style={(styles.Icon)}>
                  <IconButton icon="clock-outline"
                    size={20}
                    iconColor={MD3Colors.primary100}
                  />
                </View>
                <Text style={styles.subtitle}>{ticketData?.time}</Text>
              </View>
            </View>

            <View style={styles.ticketSeatContainer}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subheading}>Hall</Text>
                <Text style={styles.subtitle}>02</Text>
              </View>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subheading}>Row</Text>
                <Text style={styles.subtitle}>04</Text>
              </View>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subheading}>Seats</Text>
                <Text style={styles.subtitle}>{
                  ticketData?.seatArray.slice(0, 4).map((item, index, arr) => { return item + (index == arr.lenght - 1 ? '' : ' ') })}
                </Text>
              </View>
            </View>
            <Image source={require('../../assets/barcode.png')}
              style={styles.barcodeImage} />
          </View>
        </View>
        <View style={styles.Button}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('ListTicket')}>
            <Text style={styles.purchasedTicketsText} >
              purchased tickets
            </Text>
          </TouchableOpacity>
        </View>
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
  appHeaderContainer: {

    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  Private: {
    paddingBottom: 10,
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  Icon: {
    marginBottom: 10,
    border: COLORS.Black,
    height: 30,
    width: 30,
  },
  ticketBGImage: {
    alignSelf: 'center',
    width: 300,
    aspectRatio: 200 / 300,
    borderTopLeftRadius: BORDERRADIUS.radius_25,
    borderTopRightRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    height: '70%',
  },
  linear: {
    backgroundColor: COLORS.Orange,
    width: 300,
    alignSelf: 'center',
  },
  ticketFooter: {
    backgroundColor: COLORS.Orange,

    width: 300,
    alignItems: 'center',
    paddingBottom: SPACING.space_36,
    alignSelf: 'center',
    borderBottomLeftRadius: BORDERRADIUS.radius_25,
    borderBottomRightRadius: BORDERRADIUS.radius_25,
  },
  ticketDateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  dateTitle: {

    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  subtitle: {

    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  ticketSeatContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  subheading: {

    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  clockIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    paddingBottom: SPACING.space_10,
  },
  barcodeImage: {
    height: 50,

    aspectRatio: 158 / 52,
  },
  blackCircle: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: COLORS.Black,
  },
  purchasedTicketsText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_20,
    textAlign: 'center',
    backgroundColor:COLORS.WhiteRGBA15,
    paddingVertical:SPACING.space_12,
  },
  
})
