import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/theme';

export default class SettingOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        
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
})