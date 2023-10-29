import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import axios from 'axios';
import InputHeader from '../component/inputHeader';
import CategoryHeader from '../component/categoryHeader';
import SubMovieCard from '../component/SubMovieCard';
import { ListItem } from '@rneui/base';
import baseImagePath from '@react-navigation/native'
import MovieCard from '../component/MovieCard';


const { width, height } = Dimensions.get('window');

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowPlayingMoviesList:undefined,
      popularMoviesList: undefined,
      upcomingMoviesList: undefined,
    };
  }

  
  componentDidMount(){
    this.getNowPlayingMoviesList();
    this.getUpcomingMoviesList();
    this.getPopularMoviesList();
  }
  getNowPlayingMoviesList() {
    axios
    .get('http://192.168.1.8:3000/getMovie')
    .then((res) => {
      // Handle a successful response
      this.setState({
        nowPlayingMoviesList: res.data,
      });
    })
  }
  getUpcomingMoviesList() {
    axios
    .get('http://192.168.1.8:3000/getMovie')
    .then((res) => {
      // Handle a successful response
      this.setState({
        upcomingMoviesList: res.data,
      });
    })
  }
  getPopularMoviesList() {
    axios
    .get('http://192.168.1.8:3000/getMovie')
    .then((res) => {
      // Handle a successful response
      this.setState({
        popularMoviesList: res.data,
      });
    })
  }

  searchMoviesFunction() {
    this.props.navigation.navigate('SearchScreen');
  }
  render() {
    
    const {
      nowPlayingMoviesList,
      popularMoviesList,
      upcomingMoviesList,
    } = this.state;
    
    if (
      nowPlayingMoviesList == undefined &&
      nowPlayingMoviesList == null &&
      popularMoviesList == undefined &&
      popularMoviesList == null &&
      upcomingMoviesList == undefined &&
      upcomingMoviesList == null
      ) {
        return (
          <ScrollView
          style={styles.container}
          bounces={false}
          contentContainerStyle={styles.scrollViewContainer}

          >
          <StatusBar hidden />

          <View style={styles.InputHeaderContainer}>
            <InputHeader searchFunction={() => this.searchMoviesFunction()} />
          </View>

          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={COLORS.Orange} />
          </View>
        </ScrollView>
      );
    }
    // console.log(this.state.nowPlayingMoviesList)
    return (
      <ScrollView style={styles.container} bounces={false}>
        <StatusBar hidden />

        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={() => this.searchMoviesFunction()} />
        </View>
        
        <CategoryHeader title={'Now Playing'} />
        <FlatList
            data={this.state.nowPlayingMoviesList}
            keyExtractor={(item) => item.MovieID}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.7 + SPACING.space_36}
            horizontal
            decelerationRate={0}
            contentContainerStyle={styles.containerGap36}
            renderItem={({item,index})=>{

              if(!item.NameMovie){
                return(
                  <View style={{width:(width - (width * 0.7 + SPACING.space_36 * 2))/2
                }}></View>
                );
              }
              return(
                <MovieCard 
                  shouldMarginatedAtEnd = {true}
                  cardFunction ={() =>{
                    this.props.navigation.push('MovieDetails',{movieid: item.MovieID})
                  }}
                  cardWidth={width*0.74 }
                  isFirst={index == 0 ? true:false}
                  isLast={index == nowPlayingMoviesList?.length - 1? true:false}
                  title={item.NameMovie} 
                  imagePath={item.MoviePoster}
                  genre={item.Genre}
                  />
                  );
                  
                }}
                
            />
                
        <CategoryHeader title={'Popular'} />
        <FlatList
            data={this.state.popularMoviesList}
            keyExtractor={(item) => item.MovieID}
            bounces={false}
            showsHorizontalScrollIndicator={false}

            horizontal
            contentContainerStyle={styles.containerGap36}
            renderItem={({item,index})=>(
            
              <SubMovieCard 
                shouldMarginatedAtEnd = {true}
                cardFunction ={() =>{
                  this.props.navigation.push('MovieDetails',{movieid: item.MovieID})
                }}
                cardWidth={width/3}
                isFirst={index == 0 ? true:false}
                isLast={index == popularMoviesList?.length - 1? true:false}
                title={item.NameMovie} 
                imagePath={item.MoviePoster}/>)}
          />
      

        <CategoryHeader title={'Upcoming'} />
        
          <FlatList
            data={this.state.upcomingMoviesList}
            keyExtractor={(item) => item.MovieID}
            bounces={false}
            horizontal
            showsHorizontalScrollIndicator={false}

            contentContainerStyle={styles.containerGap36}
            renderItem={({item,index})=>(
            
              <SubMovieCard 
                shouldMarginatedAtEnd = {true}
                cardFunction ={() =>{
                  this.props.navigation.push('MovieDetails',{movieid: item.MovieID})
                }}
                cardWidth={width/3}
                isFirst={index == 0 ? true:false}
                isLast={index == upcomingMoviesList?.length - 1? true:false}
                title={item.NameMovie} 
                imagePath={item.MoviePoster}/>)}
          />
      
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});


export default HomeScreen;