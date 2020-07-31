import React, { useState } from "react";

import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";

import { Block, Button, Text, theme } from "galio-framework";

import { Icon, Input } from "../components";

import argonTheme from "../constants/Theme";

import Images from "../constants/Images";

const { height, width } = Dimensions.get("screen");

function MyEmailAndPassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
};

class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;
    const onLoginPress = () => {
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
              <Block>
                      <Input
        // placeholder="Email ..."
        // color={theme.COLORS.THEME} 
        // style={{ borderColor: theme.COLORS.THEME }} 
        // placeholderTextColor={theme.COLORS.THEME}
        // onChangeText={(text) => setEmail(text)}
        // value={email}
        // iconContent={
        //   <Icon
        //     size={11}
        //     style={{ marginRight: 10 }}
        //     color={argonTheme.COLORS.ICON}
        //     name="email"
        //     family="ExtraMaterialCommunityIcons"
        //   />
        // }
      />
      <Input
        // placeholder="Password ..."
        // color={theme.COLORS.THEME} 
        // style={{ borderColor: theme.COLORS.THEME }} 
        // placeholderTextColor={theme.COLORS.THEME}
        // onChangeText={(text) => setPassword(text)}
        // value={password}
        // password 
        // viewPass
        // iconContent={
        //   <Icon
        //     size={11}
        //     style={{ marginRight: 10 }}
        //     color={argonTheme.COLORS.ICON}
        //     name="lastpass"
        //     family="ExtraMaterialCommunityIcons"
        //   />
        // }
      />
              </Block>
              <Block>
                <Button
                  round 
                  size="small" 
                  color="info"
                  style={styles.button}
                  onPress={() => onLoginPress()}
                  textStyle={{ color: argonTheme.COLORS.BLACK }}
                > Masuk
                </Button>
              </Block>
              <Block>
              </Block>
            </Block>
        </Block>
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

export default Onboarding;
