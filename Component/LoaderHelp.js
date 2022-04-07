import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
const loaderGif = "../src/assets/Gif/loaderImage.gif";
const loader1 = "../assets/Gif/loading2.gif";

const LoaderHelp = ({ nextScreen }) => {
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate(nextScreen);
    }, 5000);
  }, []);

  return (
    <View style={loaderStyles.mainContainer}>
      <View style={loaderStyles.lowerContainer}>
        <ImageBackground
          source={require(loader1)}
          style={loaderStyles.bakcgroundImage}
        ></ImageBackground>
        <Text style={loaderStyles.loadText}>Please Wait</Text>
      </View>
      <View style={loaderStyles.footerView}>
        <Text style={loaderStyles.footerText}>&#169; Powered by Medisale</Text>
      </View>
    </View>
  );
};

export default LoaderHelp;

const loaderStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  bakcgroundImage: {
    width: widthPercentageToDP("50"),
    height: widthPercentageToDP("50"),
    borderRadius: 100,
  },
  lowerContainer: {
    marginBottom: heightPercentageToDP("10%"),
    alignItems: "center",
    justifyContent: "center",
  },
  loadText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "500",
    color: "#1D2C42",
    textAlign: "center",
  },
  footerView: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#F4F6FA",
    width: widthPercentageToDP("100%"),
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        height: heightPercentageToDP("4%"),
      },
      android: {
        height: heightPercentageToDP("5%"),
      },
    }),
  },
  footerText: {
    color: "#38405F",
    fontSize: 12,
  },
});
