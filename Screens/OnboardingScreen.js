import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import useAuth from "../Hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import onboarding1 from "../assets/Gif/DoctorsOnboarding.gif";
import onboarding2 from "../assets/Gif/GSKSickDay.gif";
import onboarding3 from "../assets/Gif/Hospitalmotion.gif";
import onboarding4 from "../assets/Gif/Webdesign.gif";

const OnboardingScreen = () => {
  const { user, isFirstLaunch, setIsFirstLaunch } = useAuth();
  const navigation = useNavigation();

  return (
    <Onboarding
      // SkipButtonComponent={Skip}
      // NextButtonComponent={Next}
      onSkip={() => {
        setIsFirstLaunch(false);
        navigation.replace("Register");
      }}
      onDone={() => {
        setIsFirstLaunch(false);
        console.log("onbordingScreen", isFirstLaunch);
        navigation.replace("Register");
      }}
      pages={[
        {
          backgroundColor: "#a6e4d0",
          image: <Image source={require("../assets/Onboarding1.png")} />,
          title: "Onboarding 1",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fdeb93",
          image: <Image source={require("../assets/Onboarding2.png")} />,
          title: "Onboarding 2",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fff",
          image: <Image source={require("../assets/Onboarding3.png")} />,
          title: "Onboarding 3",
          subtitle: "Done with React Native Onboarding Swiper",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});
