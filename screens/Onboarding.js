import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Icon, Input} from "../components/";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

let state={
    email:"",
    password:""
  }

class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block center>
          <Image source={Images.LogoOnboarding} style={styles.logo} />
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
              <Block center>
                <Input
                  placeholder="Email ..."
                  color={theme.COLORS.THEME} 
                  style={{ borderColor: theme.COLORS.THEME }} 
                  placeholderTextColor={theme.COLORS.THEME}
                  iconContent={
                    <Icon
                      size={11}
                      style={{ marginRight: 10 }}
                      color={argonTheme.COLORS.ICON}
                      name="email"
                      family="ExtraMaterialCommunityIcons"
                    />
                  }
                />
                <Input
                  placeholder="Password ..."
                  color={theme.COLORS.THEME} 
                  style={{ borderColor: theme.COLORS.THEME }} 
                  placeholderTextColor={theme.COLORS.THEME}
                  password 
                  viewPass
                  iconContent={
                    <Icon
                      size={11}
                      style={{ marginRight: 10 }}
                      color={argonTheme.COLORS.ICON}
                      secureTextEntry={true}
                      name="login"
                      family="ExtraMaterialCommunityIcons"
                    />
                  }
                />
                <Button
                  round 
                  size="small" 
                  color="success"
                  style={styles.button}
                  onPress={() => navigation.navigate("App")}
                  textStyle={{ color: argonTheme.COLORS.BLACK }}
                >
                  Masuk
                </Button>
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
    zIndex: 2,
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
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 20
  }
});

export default Onboarding;
