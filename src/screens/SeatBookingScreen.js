
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, ImageBackground, TouchableOpacity, FlatList, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from '../component/AppHeader';
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Button, IconButton } from 'react-native-paper';

import axios from 'axios';



export default class SeatBookingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateArray: this.generateDate(),
      selectedDateIndex: null,
      price: 0,
      twoDSeatArray: this.generateSeat(),
      selectedSeatArray: [],
      selectedTimeIndex: null,
      userData: null,
    };



  }
  selectedDateIndex = (index) => {
    this.setState({ selectedDateIndex: index });
  };
  selectedTimeIndex(index) {
    this.setState({ selectedTimeIndex: index });
  }



  timeArray = [
    "10:30",
    "12:30",
    "14:30",
    "15:00",
    "19:30",
    "21:00",
  ]

  generateDate = () => {
    const date = new Date();
    let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let weekdays = [];
    for (let i = 0; i < 7; i++) {
      let tempDate = {
        date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
        day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],

      }
      weekdays.push(tempDate);
      // console.log(tempDate);
    }
    return weekdays;
  }

  generateSeat = () => {
    let numrow = 8;
    let numcolum = 3;
    let rowArray = [];
    let start = 1;
    let reachnine = false;
    for (let i = 0; i < numrow; i++) {
      let columArray = [];
      for (let j = 0; j < numcolum; j++) {
        let seatobject = {
          number: start,
          taken: Boolean(Math.round(Math.random())),
          selected: false,
        };
        columArray.push(seatobject);
        start++;
      }
      if (i == 3) {
        numcolum += 2;
      } if (numcolum < 9 && !reachnine) {
        numcolum += 2;
      } else {
        reachnine = true;
        numcolum -= 2;
      }
      rowArray.push(columArray);

    }
    // console.log(rowArray)
    return rowArray;
  }

  selectSeat(index, subindex, num) {
    const { twoDSeatArray, selectedSeatArray } = this.state;

    if (!twoDSeatArray[index][subindex].taken) {
      let array = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subindex].selected = !temp[index][subindex].selected;
      if (!array.includes(num)) {
        array.push(num);
      } else {
        const tempindex = array.indexOf(num);
        if (tempindex > -1) {
          array.splice(tempindex, 1);
        }
      }
      this.setState({
        selectedSeatArray: array,
        price: array.length * 5.0,
        twoDSeatArray: temp,
      });
    }
  }
  postTicketData(NumberOfSeats, time,userID,showID ) {
    axios
      .post('http://172.20.10.3:3000/postTicketData', {
        NumberOfSeats: NumberOfSeats,
        Timestamp: time,
        UserID: userID,
        ShowID: showID,
      })
      .then(res => {
        // Handle a successful response
        console.log(res.data)
      })
      .catch((error) => {
        console.error('Lỗi gọi API: ', error);
      });
  }
  dateTimeToTimestamp(dateTimeString) {
    // Phân tách ngày và thời gian từ chuỗi đầu vào
    const [dateString, timeString] = dateTimeString.split(' ');
  
    // Tách ngày thành ngày, tháng và năm
    const [day, month, year] = dateString.split('/');
  
    // Tách thời gian thành giờ và phút
    const [hours, minutes] = timeString.split(':');
  
    // Tạo một đối tượng Date với ngày và thời gian cụ thể
    const date = new Date(year, month - 1, day, hours, minutes); // Lưu ý: tháng trong JavaScript bắt đầu từ 0 (0 đến 11).
  
    // Lấy timestamp từ đối tượng Date
    const timestamp = date.getTime();
  
    return timestamp;
  }
  componentDidMount() {
    this.getUserDataFromStorage();
  }
  
  getUserDataFromStorage = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user !== null) {
        this.setState({ userData: JSON.parse(user) });
      }
    } catch (error) {
      console.log('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
    }
  }
  BookSeats = async () => {
    const {
      userData,
      selectedSeatArray,
      selectedTimeIndex,
      dateArray,
      selectedDateIndex,
    } = this.state;
    if (selectedSeatArray.length !== 0 &&
      this.timeArray[selectedTimeIndex] !== undefined &&
      dateArray[selectedDateIndex] !== undefined) {
      try {
        await AsyncStorage.setItem(
          'ticket', JSON.stringify({
            seatArray: selectedSeatArray,
            time: this.timeArray[selectedTimeIndex],
            date: dateArray[selectedDateIndex],
            ticketImage: this.props.route.params.PosterImage,
          }),
        );
      } catch (error) {
        console.log(
          'something went wrong while storing in BookSeats Functions',
          error,
        );
      }
      this.props.navigation.navigate('TicketScreen'
        , {
          seatArray: selectedSeatArray,
          time: this.timeArray[selectedTimeIndex],
          date: dateArray[selectedDateIndex],
          ticketImage: this.props.route.params.PosterImage,
        }
      );
      console.log(`2023-10-${dateArray[selectedDateIndex].date} ${this.timeArray[selectedTimeIndex]}`)
      this.postTicketData(
        selectedSeatArray.length,
          `2023-10-${dateArray[selectedDateIndex].date} ${this.timeArray[selectedTimeIndex]}`,
        userData?.userID,
        this.props.route.params.MovieID
      );
    } else {
      // ToastAndroid.showWithGravity(
      //   'Please select Seat, Date and Time of the Show',
      //   ToastAndroid.SHORT,
      //   ToastAndroid.BOTTOM,
      //);
    }
  };
  render() {
    const { dateArray, selectedDateIndex, price, twoDSeatArray, selectedTimeIndex } = this.state;
    this.generateDate();
    console.log(this.state.twoDSeatArray);
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <StatusBar hidden={true} />

        <View>
          <ImageBackground
            source={{ uri: this.props.route.params?.BgImage }}
            style={styles.ImageBG}
          >
            <LinearGradient
              colors={[COLORS.BlackRGB10, COLORS.Black]}
              style={styles.linearGradient}>
              <View style={styles.appHeaderContainer}>
                <AppHeader
                  name="close"
                  header={''}
                  action={() => this.props.navigation.goBack()} />
              </View>
            </LinearGradient>

          </ImageBackground>
          <Text style={styles.screenText}>Screen this side</Text>
        </View>
        <View style={styles.seatContainer}>
          <View style={styles.containerGap20}>
            {this.state.twoDSeatArray?.map((item, index) => {
              return (
                <View key={index} style={styles.seatRow}>
                  {item?.map((subitem, subindex) => {
                    return (
                      <IconButton
                        icon="seat"
                        key={subitem.number}
                        style={{
                          ...styles.seatIcon,
                          backgroundColor: subitem.taken ? COLORS.Grey : subitem.selected ? COLORS.Orange : COLORS.White,
                        }}

                        size={FONTSIZE.size_24}
                        onPress={(() => {
                          this.selectSeat(index, subindex, subitem.number);
                        })}>
                      </IconButton>
                    );
                  })}

                </View>
              )
            })}

          </View>
        </View>

        <View style={styles.seatRadioContainer}>

          <View style={styles.radioContainer}>
            <Ionicons name='radio-button-on' style={styles.radioIcon} />
            <Text style={styles.radioText}>Available</Text>
          </View>
          <View style={styles.radioContainer}>
            <Ionicons name='radio-button-on' style={[styles.radioIcon, { color: COLORS.Grey }]} />
            <Text style={styles.radioText}>Taken</Text>
          </View>
          <View style={styles.radioContainer}>
            <Ionicons name='radio-button-on' style={[styles.radioIcon, { color: COLORS.Orange }]} />
            <Text style={styles.radioText}>Selected</Text>
          </View>
        </View>

        <View>

          <FlatList data={dateArray}

            keyExtractor={item => item.date}
            horizontal
            bounces={false}
            contentContainerStyle={styles.containerGap24}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => this.selectedDateIndex(index)}>
                  <View style={[styles.dateContainer,
                  index == 0
                    ? { marginLeft: SPACING.space_24 }
                    : index == dateArray.length - 1
                      ? { marginRight: SPACING.space_24 }
                      : {},
                  index == selectedDateIndex
                    ? { backgroundColor: COLORS.Orange }
                    : {},
                  ]}>
                    <Text style={styles.datetext}>{item.date}</Text>
                    <Text style={styles.daytext}>{item.day}</Text>

                  </View>
                </TouchableOpacity>
              )
            }}
          >


          </FlatList>
        </View>

        <View style={styles.OutterContainer}>
          <FlatList data={this.timeArray}

            keyExtractor={item => item}
            horizontal
            bounces={false}
            contentContainerStyle={styles.containerGap24}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => this.selectedTimeIndex(index)}>
                  <View style={[styles.timeContainer,
                  index == 0
                    ? { marginLeft: SPACING.space_24 }
                    : index == dateArray.length - 1
                      ? { marginRight: SPACING.space_24 }
                      : {},
                  index == selectedTimeIndex
                    ? { backgroundColor: COLORS.Orange }
                    : {},
                  ]}>
                    <Text style={styles.timetext}>{item}</Text>


                  </View>
                </TouchableOpacity>
              )
            }}
          >


          </FlatList>
        </View>
        <View style={styles.buttonPriceContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.totalPriceText}>Total Price</Text>
            <Text style={styles.price}>$ {this.state.price}.00</Text>
          </View>
          <Button style={styles.buttonBuy} mode='contained' onPress={() => this.BookSeats()}>
            Buy Tickets
          </Button>
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
  seatContainer: {
    marginVertical: SPACING.space_20,
  },
  ImageBG: {
    width: '100%',
    aspectRatio: 3072 / 1723,
  },
  linearGradient: {
    height: '100%',
  },
  appHeaderContainer: {

    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  screenText: {
    textAlign: 'center',

    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA15,
  },
  containerGap20: {
    gap: SPACING.space_2,
  },
  seatRow: {
    flexDirection: 'row',
    gap: 1,
    justifyContent: 'center',
  },
  seatIcon: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.White,
  },

  seatRadioContainer: {
    flexDirection: 'row',
    marginVertical: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  radioIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  radioText: {

    fontSize: FONTSIZE.size_10,
    color: COLORS.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  dateContainer: {
    width: SPACING.space_10 * 7,
    height: SPACING.space_10 * 10,
    borderRadius: BORDERRADIUS.radius_10 * 8,
    backgroundColor: COLORS.WhiteRGBA15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datetext: {

    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  daytext: {
    marginTop: 10,

    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  OutterContainer: {
    marginVertical: SPACING.space_24,
  },
  timeContainer: {
    paddingVertical: SPACING.space_10,
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA50,
    paddingHorizontal: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.WhiteRGBA15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timetext: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  buttonPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_24,
    paddingBottom: SPACING.space_24,
  },
  priceContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    marginLeft: SPACING.space_20,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  price: {
    marginLeft: SPACING.space_20,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  buttonText: {
    // borderRadius:BORDERRADIUS.radius_25,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    backgroundColor: COLORS.Orange,
  },
  buttonBuy: {
    backgroundColor: COLORS.Orange,

  },
});
