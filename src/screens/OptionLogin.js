import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { useNavigation } from "@react-navigation/native";

const OptionLogin = () => {
  const navigation = useNavigation();
  return (
    <Background>
      <Logo />
      <Header>MediSale</Header>
      <Paragraph>The easiest way to Buy Medicine.</Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("StartScreen")}
      >
        Login as customer
      </Button>
      <Text>or</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("StartScreen2")}
      >
        Login as Seller
      </Button>
    </Background>
  );
};

export default OptionLogin;

const styles = StyleSheet.create({});
