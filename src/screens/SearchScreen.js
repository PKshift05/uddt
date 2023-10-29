import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar,FlatList,TouchableOpacity,TextInput } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import axios from 'axios';
import InputHeader from '../component/inputHeader';
import {Ionicons, AntDesign } from "@expo/vector-icons";
import { useState  , createContext, useContext } from 'react';
import SubMovieCard from '../component/SubMovieCard';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchList:undefined,
    };
  }

  

  searchMoviesFunction = (value) =>{
    axios
    .post('http://192.168.1.8:3000/searchMovie',{
      NameMovie: value
    })
    .then(res => {
      // Handle a successful response
      this.setState({
        searchList: res.data,
      });
    })
    .catch((error) => {
      console.error('Lỗi gọi API: ', error);
    });
  }
  render() {
    const {
      searchList,
    } = this.state;

    return (
    
      <View style={styles.container}> 
        <StatusBar hidden/>
        <FlatList
            data={searchList}
            keyExtractor={(item) => item.MovieID}
            bounces={false}
            numColumns={2}
            showsHorizontalScrollIndicator={false}

            ListHeaderComponent={
              <View style={styles.InputHeaderContainer}>
                <InputHeader searchFunction={this.searchMoviesFunction} />
              </View>
            
            }
            
            contentContainerStyle={styles.centerContainer}
            renderItem={({item,index})=>(
              
              <SubMovieCard 
              shouldMarginatedAtEnd = {false}
              shouldMarginatedAround={true}
              cardFunction ={() =>{
                this.props.navigation.push('MovieDetails',{movieid: item.MovieID})
              }}
              cardWidth={width/2-SPACING.space_12*2}
              
              title={item.NameMovie} 
              imagePath={item.MoviePoster}/>)}
              /> 
      </View>
    );
  }
}


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({

  container: {
    display: 'flex',
    flex:1,
    alignItems:'center',
    backgroundColor: COLORS.Black,
  },
  
  InputHeaderContainer: {
    display:'flex',
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
    marginBottom: SPACING.space_28 -SPACING.space_12,
  },
 
  centerContainer: {
    alignItems:'center',
  }
});
