import axios from 'axios';
import {Ionicons, AntDesign } from "@expo/vector-icons";
import React, { Component } from 'react';
import { Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity, } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING,BORDERRADIUS } from '../theme/theme';
import AppHeader from '../component/AppHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, IconButton, MD3Colors } from 'react-native-paper';


export default class MovieDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: null,
    };
  }

  componentDidMount(){
    this.getMovieDetails();
  }

  getMovieDetails(){
    axios
    .post('http://172.20.10.3:3000/getMovieDetails',{
      movieid: this.props.route.params.movieid
    })
    .then(res => {
      // Handle a successful response
      this.setState({
        movieData: res.data,
      });
      
    })
    .catch((error) => {
      console.error('Lỗi gọi API: ', error);
    });
  }
  render() {
    const { movieData } = this.state;
    console.log(movieData)
    if(
      movieData == undefined &&
    
      movieData == null
    ){
      return(

        <ScrollView style={styles.container}
        contentContainerStyle={styles.scrollViewContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
        >
          <View>
            <AppHeader name="close" header={'Movie Details'} action={()=> this.props.navigation.goBack()}/>
          </View>
          <View style={styles.appHeaderContainer}>
            <AppHeader 
            name="close"  
            header={''} 
            action={()=> this.props.navigation.goBack()}/>
          </View>
        </ScrollView>
      );
      
    }
    return (
      <ScrollView 
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
        >
        <StatusBar  hidden />
        <View>
          <ImageBackground source={{uri:movieData[0]?.MoviePoster}} 
            
            style={styles.imageBG}>
            <LinearGradient
              colors={[COLORS.BlackRGB10,COLORS.Black]}
              style={styles.linearGradient}
            >
              <View style={styles.appHeaderContainer}>
                <AppHeader 
                name="close"  
                header={movieData[0]?.NameMovie} 
                action={()=> this.props.navigation.goBack()}/>
              </View>
            </LinearGradient>
          </ImageBackground>
          <View style={[styles.imageBG]}>
            <Image 
            source={{uri:movieData[0]?.MoviePoster}}
            style={styles.cardImage}
            />
          </View>
          <View style={styles.timeContainer}>
            <IconButton icon="clock-outline" 
            style={styles.clockIcon}/>
            <Text style={styles.runtimeText}>
              {Math.floor(movieData[0]?.runTime /60)}h{' '}
              {Math.floor(movieData[0]?.runTime %60)}m
            </Text>
          </View>
          <View>
            <Text style={styles.title}>
            {movieData[0]?.NameMovie}
            </Text>
            <View style={styles.genreContainer}>
            <View style={styles.GenreBox}>
                  <Text style={styles.textGenre}>{movieData[0]?.Genre}</Text>
                </View>
            </View>
          </View>

          <View style={[styles.timeContainer, {marginVertical:SPACING.space_15}]}>
            
            
            <Text style={styles.runtimeText}>
              {movieData[0]?.Release.substring(0,10)}
              
            </Text>
          </View>
          <View>
            <Text style={styles.descriptionText}>{movieData[0]?.Description}</Text>
          </View >
          {/* <View style={{borderRadius:BORDERRADIUS.radius_25*2, }}>
            <TouchableOpacity style={styles.buttonBG} 
            onPress={()=> this.props.navigation.push('SeatBooking')}>
              <Text style={styles.buttonText}>Select seat</Text>
            </TouchableOpacity>
          </View> */}
          <View style={{width: 150, alignSelf:'center' }} >
          <Button style={styles.buttonBG} mode='contained' onPress={()=> this.props.navigation.push('SeatBooking',{
            BgImage: (movieData[0]?.MoviePoster),
            PosterImage: (movieData[0]?.MoviePoster),
            MovieID: (movieData[0]?.MovieID)
          })}>
            Select seat
          </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex:1,
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text:{
    color:COLORS.White
  },
  appHeaderContainer:{
    marginHorizontal:SPACING.space_36,
    marginTop:SPACING.space_20*2,
  },
  imageBG:{
    width:'100%',
    aspectRatio:3072/1727,
  },
  linearGradient:{
    height:'100%'
  },
  cardImage:{
    width:'60%',
    aspectRatio:200/300,
    position:'absolute',
    bottom:0,
    alignSelf:'center',
  },
  clockIcon:{
    fontSize:FONTSIZE.size_20,
    color: COLORS.WhiteRGBA50,
    marginRight:SPACING.space_4,
  },
  timeContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginRight:SPACING.space_20,
  },
  runtimeText:{
    
    fontSize:FONTSIZE.size_14,
    color:COLORS.White,
  },
  title:{
    
    fontSize: FONTSIZE.size_24,
    marginHorizontal:SPACING.space_36,
    marginVertical:SPACING.space_10,
    textAlign:'center',
    color:COLORS.White,
  },
  genreContainer:{
    flex:1,
    flexDirection:'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent:'center',
},
textGenre:{
    color: COLORS.White,
    textAlign:'center'
},
GenreBox:{ 
    borderColor:COLORS.WhiteRGBA50,
    borderWidth:1,
    paddingVertical:SPACING.space_4,
    paddingHorizontal:SPACING.space_10,
    borderRadius:BORDERRADIUS.radius_20,
},
descriptionText:{
  
  fontSize:FONTSIZE.size_14,
  color:COLORS.White,
},
buttonBG:{
  alignItems:'center',
  marginVertical: SPACING.space_24,
  backgroundColor:COLORS.Orange,
  fontSize:FONTSIZE.size_14,

},
  
})

