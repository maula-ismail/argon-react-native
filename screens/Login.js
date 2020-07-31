import React, { useRef } from 'react';

import { 
    ImageBackground
  , Image
  , StyleSheet
  , StatusBar
  , TouchableOpacity
  , AsyncStorage
  , Keyboard
  , Dimensions } from 'react-native';

import { Block, Button, Text, theme } from "galio-framework";

import { Icon, Input } from "../components";

import argonTheme from "../constants/Theme";

import Images from "../constants/Images";

const { height, width } = Dimensions.get("screen");

export default class Login extends React.Component {
  renderLogin = () => {
    const onSignUpPress = () => {
      this.GotoSignUp();
    };
    return (
      <Block>
      <StatusBar hidden />
        <Block flex center>
          <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block style={styles.title}>
            <Block>
              <Text color="white" size={60}>
                PKB
              </Text>
              <Text color="white" size={60}>
                SideKick
              </Text>
            </Block>
            <Block style={styles.subTitle}>
              <Text color="white" size={16}>
                [P]engujian [K]endaraan [B]ermotor
              </Text>
            </Block>
          </Block>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Input  
              style={{ borderColor: theme.COLORS.THEME }}
              placeholder="Email..." 
              placeholderTextColor="#003f5c"
              iconContent={
                <Icon
                  size={11}
                  style={{ marginRight: 10 }}
                  color={argonTheme.COLORS.ICON}
                  name="email"
                  family="ExtraMaterialCommunityIcons"
                />
              }
              onChangeText={text => this.setState({email:text})}
            />
          </Block>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Input  
              style={{ borderColor: theme.COLORS.THEME }} 
              placeholder="Password..." 
              placeholderTextColor="#003f5c"
              viewPass
              password
              iconContent={
                <Icon
                  size={11}
                  style={{ marginRight: 10 }}
                  color={argonTheme.COLORS.ICON}
                  name="lock-outline"
                  family="ExtraMaterialCommunityIcons"
                />
              }
              onChangeText={text => this.setState({password:text})}
            />
          </Block>
          <Block>
            <Button
              round 
              size="small" 
              color="info"
              style={styles.button}
              onPress={() => onLoginPress()}
              tittle= "Screens"
              textStyle={{ color: argonTheme.COLORS.BLACK }}
            > Masuk
            </Button>
          </Block>
          <Block>
            <Button
                 title="SignUp" 
                 color="transparent"
                 shadowless
                 onPress={() => onSignUpPress()}
                 >
                 Don't have an account? Sign Up
            </Button>
          </Block>
        </Block>
      </Block>
    )
  }

  state={
    email: "",
    password: "",
    isLoggedIn: false
  }

  saveData = async()=>{
    const { email, password } = this.state;
    const { title, navigation } = this.props;
    //save data with asyncstorage
    let loginDetails={
        email: email,
        password: password
    }
    try{
        let loginDetails = await AsyncStorage.getItem('loginDetails');
        console.log(loginDetails);
        let ld = JSON.parse(loginDetails);
        console.log("Email: " + email + ' password: ' + password);
        if (ld.email != null && ld.password != null){
            if (ld.email == email && ld.password == password){
                console.log('Go in!');
                navigation.navigate('App');
            }else{
                console.log('Email and Password does not exist!');
            }
        } 
      }catch(error){
          console.log(error);
      }
  }

  GotoSignUp = async()=>{
    const { navigation } = this.props;  
    console.log({navigation});
    try{
        navigation.navigate('SignUp');
      }catch(error)
      {
          console.log(error);
      }
  }
 
  showData = async()=>{
      let loginDetails = await AsyncStorage.getItem('loginDetails');
      let ld = JSON.parse(loginDetails);
      console.log('email: '+ ld.email + ' ' + 'password: ' + ld.password);
  }

  render(){
    const { navigation } = this.props;
    const onLoginPress = () => {
      this.setState({isLoggedIn: true});
      this.saveData();
    };
    return (
      <Block flex center style={styles.container}>
        {this.renderLogin()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop: '-5%'
  },
  subTitle: {
    marginTop: 20
  }
});