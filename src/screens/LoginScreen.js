import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';

import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { connect } from 'react-redux';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      password: null,
      errorMessage: '',
      userAcc: null,
    };
  }
  handleLogin = async () => {
    const { userName, password, errorMessage, userAcc } = this.state;

    try {
      const response = await axios.post('http://192.168.1.8:3000/login', {
        userName: userName,
        password: password,
      });

      if (response.data.message === 'Đăng nhập thành công') {
        // Xử lý sau khi đăng nhập thành công, ví dụ: chuyển hướng đến trang Tab

        const userAcc = response.data.results; // Lấy kết quả từ response.data
        this.setState({ userAcc }); // Cập nhật giá trị userAcc trong state
        console.log(userAcc);
        
        await AsyncStorage.setItem(
          'user', JSON.stringify({
            userName: userName,
            password: password,
            userID: userAcc[0]?.UserID,
          }),
        );
        console.log(userAcc[0]?.UserID);
        this.props.dispatch({ type: 'LOGIN' });
        this.props.navigation.navigate('Tab');

      } else {
        // Xử lý sau khi đăng nhập thất bại
        console.log('Đăng nhập thất bại');
        if (response.data.message === 'Đăng nhập thất bại') {
          this.setState({ errorMessage: 'Sai thông tin đăng nhập. Vui lòng thử lại.' });
        }
        console.log(errorMessage);
      }
    } catch (error) {
      // Xử lý lỗi
      console.error(error);
    }
  };
  handleTextInputFocus = () => {
    // Ẩn thông báo lỗi khi người dùng tương tác với TextInput
    this.setState({ errorMessage: '' });
  };

  render() {
    const { userName, password, errorMessage } = this.state;
    return (
      <View
        style={styles.container}>
        <View style={styles.Logo}>
          <Text style={styles.logoText}>
            Welcome to
          </Text>
          <Text style={styles.logoText}>
            CINEMA
          </Text>
        </View>
        <View style={styles.Logo}>
          <Text style={{

            fontSize: 28,
            fontWeight: '500',
            color: COLORS.Orange,
            marginBottom: 30,
            textAlign: 'center',
          }}>Login</Text>
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
            onFocus={this.handleTextInputFocus}
          />
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Password"
            placeholder="Type something"
            textColor='white'
            outlineColor={COLORS.WhiteRGBA50}
            activeOutlineColor={COLORS.WhiteRGBA50}
            secureTextEntry
            right={<TextInput.Icon icon="eye" />}
            left={<TextInput.Icon icon="lock" />}
            onChangeText={(text) => this.setState({ password: text })}
            onFocus={this.handleTextInputFocus}
          />
          <View>
            <Text style={styles.textFP} onPress={() => { }}>forgot Password?</Text>
          </View>
          {errorMessage !== '' && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
        </View>
        <View style={styles.Logo}>
          <Button
            style={styles.buttonLogin}
            mode='contained'
            buttonColor={COLORS.Orange}
            onPress={() => this.handleLogin()}
          >
            <Text style={{
              marginTop: 15,
              fontSize: 20,
              color: COLORS.White,

            }}>
              Login
            </Text>
          </Button>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: SPACING.space_15,
            }}>
            <Text style={{ color: COLORS.White }}>New to the app?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
              <Text style={{ color: COLORS.Orange, fontWeight: '700' }}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  Logo: {
    justifyContent: 'center',
    flex: 2,
    backgroundColor: COLORS.Black,
  },
  logoText: {
    alignSelf: 'center',
    fontSize: FONTSIZE.size_30,
    color: COLORS.White,
    fontWeight: '700',
  },
  buttonLogin: {
    borderRadius: SPACING.space_20 + 5,
    marginHorizontal: SPACING.space_20,
    height: 50,
  },
  textInput: {
    marginVertical: SPACING.space_10,
    backgroundColor: COLORS.DarkGrey,
    width: '90%',
    alignSelf: 'center',
  },
  textFP: {
    textAlign: "right",
    color: COLORS.White,
    marginHorizontal: SPACING.space_20,
    textDecorationLine: "underline",
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },

})
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(LoginScreen);