import React, { Component } from 'react';
import { View, Text, StyleSheet,Switch } from 'react-native';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';


export default class SettingApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isSwitchOn:false,
    };
  }
  toggleSwitch = () => {
    this.setState((prevState) => ({
      isSwitchOn: !prevState.isSwitchOn,
    }));
  };

  render() {
    const{isSwitchOn}=this.state
    
    return (
      <View style={styles.container}>
        <View style={styles.switch}>

        <Text style={styles.text}>Switch Theme</Text>
        <Switch
          trackColor={{ false: 'red', true: 'green' }}
          thumbColor={isSwitchOn ? 'blue' : 'gray'}
          onValueChange={this.toggleSwitch}
          value={isSwitchOn}
          style={styles.button}
          />
          </View>
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
    text:{
        color:COLORS.Orange,
        fontSize:FONTSIZE.size_18,
        marginLeft:SPACING.space_20,
        marginRight:SPACING.space_20*10
    },
    switch:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:SPACING.space_36*2,
        marginHorizontal:SPACING.space_4,
    },
    button:{
        
    },
})
