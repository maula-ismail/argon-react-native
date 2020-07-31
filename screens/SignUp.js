import React, { useRef } from 'react';

import { 
   StyleSheet
  , ImageBackground
  , Image
  , Dimensions
  , StatusBar
  , AsyncStorage
  , Keyboard
  , TouchableOpacity } from 'react-native';

  import { Block, Button, Text, theme } from "galio-framework";

  import { Icon, Input } from "../components";

  import argonTheme from "../constants/Theme";

  import Images from "../constants/Images";

  const { height, width } = Dimensions.get("screen");

export default class SignUp extends React.Component {
    state = { email: '', password: '', errorMessage: null };

  saveData = async()=>{

        const {email,password} = this.state;
        const { title,navigation } = this.props;

        //save data with asyncstorage
        let loginDetails={
            email: email,
            password: password
        }
            try{
                AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));
                console.log("You successfully registered. Email: " + email + ' password: ' + password);
              }catch(error)
              {
                  console.log('Error nya ' + error);
              }
  }

    render() {
  // const ref_input2 = useRef();
  // const ref_input3 = useRef();

      const onSimpanPress = () => {
          this.saveData();
      }

        return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
                <Block>
                  <Text color="white" size={60}>
                    SignUp
                  </Text>
                  <Text color="white" size={60}>
                    PKB
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
              autoFocus={true}
              returnKeyType="next"
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
              />}
              onChangeText={text => this.setState({email:text})}
              onSubmitEditing={() => ref_input2.current.focus()}
            />
          </Block>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Input  
              // ref={ref_input2}
              returnKeyType="next"
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
                />}
              onChangeText={text => this.setState({password:text})}
              onSubmitEditing={() => ref_input3.current.focus()}
            />
          </Block>
          <Block>
                <Button
                  round 
                  // ref={ref_input3}
                  size = "small" 
                  color = "info"
                  style = {styles.button}
                  onPress = {() => onSimpanPress()}
                  tittle = "Screens"
                  textStyle = {{ color: argonTheme.COLORS.BLACK }}
                > Simpan
                </Button>
          </Block>
            </Block>
        </Block>
      </Block>
        )
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