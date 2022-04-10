import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import useAuth from "../Hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {
  const { user, isFirstLaunch, setIsFirstLaunch } = useAuth();
  const navigation = useNavigation();

  return (
    <Onboarding
      // SkipButtonComponent={Skip}
      // NextButtonComponent={Next}
      onSkip={() => {
        setIsFirstLaunch(false);
        // navigation.navigate("OptionLogin");
      }}
      onDone={() => {
        setIsFirstLaunch(false);
        // console.log("onbordingScreen", isFirstLaunch);
        // navigation.navigate("OptionLogin");
      }}
      pages={[
        {
          backgroundColor: "#a6e4d0",
          image: (
            <Image
              style={{ width: "90%", height: 300, borderRadius: 10 }}
              source={require("../assets/board1.png")}
            />
          ),
          title: "Trusted Medical Shop",
          subtitle: "Buy Now",
        },
        {
          backgroundColor: "#fdeb93",
          image: (
            <Image
              style={{ width: "90%", height: 300, borderRadius: 10 }}
              source={require("../assets/board2.png")}
            />
          ),
          title: "24/7 Availability",
          subtitle: "You Can Order Medicine Any Time",
        },
        {
          backgroundColor: "#a6e4d0",
          image: (
            <Image
              style={{ width: "90%", height: 300, borderRadius: 10 }}
              source={require("../assets/board4.png")}
            />
          ),
          title: "Best Quality Medicine",
          subtitle: "ISO certify Medicine Brand",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={{ width: "90%", height: 300, borderRadius: 10 }}
              source={require("../assets/deliveryboy.png")}
            />
          ),
          title: "Fastest Delivery",
          subtitle: "Get Your Medicine Within 30 Minutes",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});
