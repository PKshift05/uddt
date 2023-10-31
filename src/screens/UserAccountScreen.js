import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../component/AppHeader';
import { Avatar, Button } from 'react-native-paper';
import SettingComponent from '../component/SettingComponent';
import { connect } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

class UserAccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
    };
  }
  async removeAllAsyncStorageItems() {
    try {

      await AsyncStorage.removeItem('ticket');
      await AsyncStorage.removeItem('user');
      console.log('Removed all AsyncStorage items');
      this.props.dispatch({ type: 'LOGOUT' });
      this.props.navigation.replace('LoginScreen');
    } catch (error) {
      console.error('Failed to remove AsyncStorage items:', error);
    }
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



  render() {
    const { userData } = this.state;
    console.log(userData);
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={'My Profile'}
            action={() => this.props.navigation.goBack()} />
        </View>
        <View style={styles.profileContainer}>
          <Avatar.Image size={100} source={require('../../assets/avatar.jpg')} />
          <Text style={styles.avatarText}>{userData?.userName}</Text>
        </View>
        <View style={{ marginHorizontal: 10, alignItems: 'center', paddingTop: SPACING.space_36 + 10 }}>
          <TouchableOpacity style={styles.touchSetting} onPress={()=>this.props.navigation.navigate("SettingAccount")}>

            <SettingComponent
              nameSetting="SettingAccount"
              icon="account"
              heading="Account"
              subheading="Edit Profile"
              subtitle="Change Password" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchSetting} onPress={()=>this.props.navigation.navigate("SettingApp")}>

            <SettingComponent
              
              icon="cog"
              heading="Settings"
              subheading="Theme"
              subtitle="Permissions" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchSetting} onPress={()=>this.props.navigation.navigate("SettingOffer")}>

            <SettingComponent
              
              icon="currency-usd"
              heading="Offers & Referrals"
              subheading="Offers"
              subtitle="Referrals" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchSetting} onPress={()=>this.props.navigation.navigate("SettingAbout")}>

            <SettingComponent
             
              icon="information"
              heading="About"
              subheading="About Movies"
              subtitle="More" />
          </TouchableOpacity>
        </View>

        <Button
          style={styles.buttonLogout}
          mode='contained'
          buttonColor={COLORS.Orange}
          onPress={() => this.removeAllAsyncStorageItems()}
        >
          <Text style={{
            marginTop: 15,
            fontSize: 20,
            color: COLORS.White,

          }}>
            Log out
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
  appHeaderContainer: {

    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  profileContainer: {
    marginHorizontal: SPACING.space_10,
    alignItems: 'center',
    padding: SPACING.space_36,
  },
  avatarText: {
    fontSize: FONTSIZE.size_16,
    marginTop: SPACING.space_16,
    color: COLORS.White,
  },
  buttonLogout: {
    marginVertical: SPACING.space_20 * 2,
    borderRadius: SPACING.space_20 + 5,
    marginHorizontal: SPACING.space_20,
    height: 50,
  },
  touchSetting: {
    width: 400,
  },
})
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps)(UserAccountScreen);