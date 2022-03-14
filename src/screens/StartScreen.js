import React, { useEffect } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { Block, Checkbox, Text, theme } from "galio-framework";
import argonTheme from "../../constants/Theme";
import { StyleSheet } from "react-native";
import ArButton from "../../Component/ArButton";
import Icon from "../../Component/Icon";
import useAuth from "../../Hooks/useAuth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export default function StartScreen({ navigation }) {
  const { signWithGoogleId } = useAuth();

  return (
    <Background>
      <Logo />
      <Header>MediSale</Header>
      <Paragraph>The easiest way to Buy Medicine.</Paragraph>
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("LoginScreen", {
            seller: "false",
          })
        }
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Sign Up
      </Button>
      <Block flex={0.25} middle style={styles.socialConnect}>
        <Text color="#8898AA" size={12}>
          Sign up with
        </Text>
        <Block row style={{ marginTop: theme.SIZES.BASE }}>
          <ArButton style={{ ...styles.socialButtons, marginRight: 30 }}>
            <Block row>
              <Icon
                name="logo-github"
                family="Ionicon"
                size={14}
                color={"black"}
                style={{ marginTop: 2, marginRight: 5 }}
              />
              <Text style={styles.socialTextButtons}>GITHUB</Text>
            </Block>
          </ArButton>
          <ArButton
            style={styles.socialButtons}
            onPress={() => signWithGoogleId()}
          >
            <Block row>
              <Icon
                name="logo-google"
                family="Ionicon"
                size={14}
                color={"black"}
                style={{ marginTop: 2, marginRight: 5 }}
              />
              <Text style={styles.socialTextButtons}>GOOGLE</Text>
            </Block>
          </ArButton>
        </Block>
      </Block>
    </Background>
  );
}

const styles = StyleSheet.create({
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderColor: "#8898AA",
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14,
  },
});
