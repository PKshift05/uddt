import React, { Component } from 'react';
import { View, Text,StyleSheet,ScrollView } from 'react-native';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';

export default class SettingAbout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
        style={styles.containerSV}>
            <Text style={styles.Header}># About App</Text>
            <Text style={styles.textTitle}>Cinema Booking App is a convenient way to find and book tickets to movies. With the app, you can:</Text>
            <View style={{marginVertical: SPACING.space_10}}>
                <Text style={styles.textContent}>- View a list of movies currently playing at nearby theaters</Text>
                <Text style={styles.textContent}>- Read information about each movie, such as the cast, plot, and rating</Text>
                <Text style={styles.textContent}>- Search for movies by title, genre, or actor</Text>
                <Text style={styles.textContent}>- Filter movies by date, time, and theater</Text>
                <Text style={styles.textContent}>- Book tickets</Text>
            </View>
            
            <Text style={styles.Header}># Features</Text>
            <Text style={styles.textTitle}>Movie list: The movie list is the most important feature of the app. It is easy to navigate and provides users with all the information they need to make a decision. The list includes the following information:</Text>
            <View style={{marginVertical: SPACING.space_10}}>
                <Text style={styles.textContent}>- Movie title</Text>
                <Text style={styles.textContent}>- Movie poster</Text>
                <Text style={styles.textContent}>- Movie release date</Text>
                <Text style={styles.textContent}>- Movie genre</Text>
                <Text style={styles.textContent}>- Movie description</Text>
            </View>
            <Text style={styles.textTitle}>Movie information: The movie information page provides users with more details about each movie. This information includes:</Text>
            <View style={{marginVertical: SPACING.space_10}}>
                <Text style={styles.textContent}>- Cast</Text>
                <Text style={styles.textContent}>- Plot</Text>
                <Text style={styles.textContent}>- Running time</Text>
                <Text style={styles.textContent}>- Trailer</Text>
            </View>
            <Text style={styles.textTitle}>Search: The search feature allows users to find movies by title, genre, or actor. This can be a helpful feature for users who are looking for a specific movie or who are not sure what they want to see.</Text>
            <Text style={styles.textTitle}>Filters: The filters feature can be used to narrow down the list of movies. This can be helpful for users who are looking for a specific movie time, date, or theater.</Text>
            <Text style={styles.textTitle}>Ticket booking: The ticket booking feature is the most important feature of the app. It is easy to use and allows users to book tickets quickly and easily.</Text>


            <Text style={styles.Header}># Benefits</Text>
            <Text style={styles.textTitle}>Convenience: </Text>
            <Text style={styles.textContent}>The app makes it easy to find and book tickets to movies.</Text>
            <Text style={styles.textTitle}>Variety: </Text>
            <Text style={styles.textContent}>The app offers a variety of features to meet the needs of different users.</Text>
            <Text style={styles.textTitle}>Accuracy: </Text>
            <Text style={styles.textContent}>The app provides accurate information about movies and showtimes.</Text>


            <Text style={styles.Header}># Download</Text>
            <Text style={styles.textTitle}>The app is available for free download on the App Store and Google Play.</Text>

            <Text style={styles.Header}># Contact us</Text>
            <Text style={styles.textTitle}>If you have any questions or feedback, please contact us at quang05012003@gmail.com</Text>


        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flex: 1,
        backgroundColor: COLORS.Black,
    },
    containerSV:{
        marginVertical:SPACING.space_36,
    },
    Header:{
        color:COLORS.White,
        fontWeight:"500",
        fontSize:FONTSIZE.size_24
        
    },
    textTitle:{
        color:COLORS.WhiteRGBA75,
        fontSize:FONTSIZE.size_18,
        marginVertical:SPACING.space_12,
        marginHorizontal:SPACING.space_4,
    },
    textContent:{
        color:COLORS.WhiteRGBA50,
        marginVertical:SPACING.space_4,
        marginHorizontal:SPACING.space_8,
    },
})