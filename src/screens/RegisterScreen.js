import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button, TextInput } from 'react-native-paper';

import axios from 'axios';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userName:null,
        email:null,
        phoneNumber:null,
        passWord:null,

    };
  }

  register(){
    const {
      userName,
      email,
      phoneNumber,
      passWord,
    } = this.state;
    axios
    .post('http://172.20.10.3:3000/register',{
      userName: userName,
      email:email,
      phone:phoneNumber,
      password:passWord,
    })
    .then(res => {
      // Handle a successful response
      console.log(res.data)  
      this.props.navigation.navigate('Tab')  
    })
    .catch((error) => {
      console.error('Lỗi gọi API: ', error);
    });
  }

  render() {
    const {
      userName,
      email,
      phoneNumber,
      passWord,
    } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>


          <View style={styles.Logo}>
            <Text style={styles.logoText}>
              Welcome to
            </Text>
            <Text style={styles.logoText}>
              CINEMA
            </Text>
          </View>
          <Text
            style={{
              
              fontSize: 28,
              fontWeight: '500',
              color: COLORS.Orange,
              marginBottom: 30,
              textAlign: 'center',
            }}>
            Register
          </Text>



          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="User Name"
            placeholder="Type something"
            outlineColor={COLORS.WhiteRGBA50}
            activeOutlineColor={COLORS.WhiteRGBA50}
            textColor='white'
            left={<TextInput.Icon icon="account" />}
            onChangeText={(text) => this.setState({ userName: text })}
          />
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Email"
            placeholder="Type something"
            outlineColor={COLORS.WhiteRGBA50}
            activeOutlineColor={COLORS.WhiteRGBA50}
            textColor='white'
            left={<TextInput.Icon icon="email" />}
            keyboardType='email-address'
            onChangeText={(text) => this.setState({ email: text })}

          />
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Phone number"
            placeholder="Type something"
            outlineColor={COLORS.WhiteRGBA50}
            activeOutlineColor={COLORS.WhiteRGBA50}
            textColor='white'
            left={<TextInput.Icon icon="phone" />}
            keyboardType='name-phone-pad'
            onChangeText={(text) => this.setState({ phoneNumber: text })}

          />
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Password"
            placeholder="Type something"
            outlineColor={COLORS.WhiteRGBA50}
            activeOutlineColor={COLORS.WhiteRGBA50}
            textColor='white'
            left={<TextInput.Icon icon="lock" />}
          />
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Confirm Password"
            placeholder="Type something"
            outlineColor={COLORS.WhiteRGBA50}
            activeOutlineColor={COLORS.WhiteRGBA50}
            textColor='white'
            left={<TextInput.Icon icon="lock" />}
            onChangeText={(text) => this.setState({ passWord: text })}

          />
          <Button
            style={styles.buttonRegis}
            mode='contained'
            buttonColor={COLORS.Orange}
            onPress={() => this.register()}
          >
            <Text style={{
              marginTop: 15,
              fontSize: 20,
              color: COLORS.White,

            }}>
              Register
            </Text>
          </Button>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: SPACING.space_15,
            }}>
            <Text style={{ color: COLORS.White }}>If you already have an account?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Text style={{ color: COLORS.Orange, fontWeight: '700' }}> Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
  textInput: {
    marginVertical: SPACING.space_10,
    backgroundColor: COLORS.DarkGrey,
    width: '90%',
    alignSelf: 'center',
  },
  buttonRegis: {
    borderRadius: SPACING.space_20 + 5,
    marginTop: SPACING.space_36,
    marginHorizontal: SPACING.space_20,
    height: 50,
  },
  Logo: {
    justifyContent: 'center',
    marginVertical: SPACING.space_20 * 2,
  },
  logoText: {
    alignSelf: 'center',
    fontSize: FONTSIZE.size_30,
    color: COLORS.White,
    fontWeight: '700',
  },
})
