import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
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
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { selectSellerData } from "../../feature/SellerSlice";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";

const loadingGif = "../assets/Gif/upload_ie_new.gif";
const loaderGif = "../assets/Gif/loaderImage.gif";
const LogoMini = "../assets/Gif/logo_mini.png";
import { AsyncStorage } from "react-native";

const Loader = () => {
  const route = useRoute();
  const { jsobject } = route.params;
  const [result, setresult] = useState(false);
  const navigation = useNavigation();
  const sellerdata = useSelector(selectSellerData);

  const registerWithEmailId = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log(user)
        AsyncStorage.getItem("loginInfo").then((value) => {
          if (value == null) {
            AsyncStorage.setItem("loginInfo", "sellerlogin");
          }
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  const verifyMethode = async () => {
    console.log("This is verfy method");
    await axios
      .post("https://us-central1-medisale-app.cloudfunctions.net/api/facevalidation", jsobject)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          registerWithEmailId(
            sellerdata[0].email.value,
            sellerdata[0].password.value
          );
          navigation.navigate("SellerPages");
        }
        navigation.navigate("LoginPage")
      });
    console.log("Hello world");
  };

  useEffect(() => {
    console.log("This is loader componenet");
    // await axios
    //   .post("http://192.168.1.14:3003/facevalidation", jsobject)
    //   .then((res) => {
    //     console.log(res.data);
    //   });
    verifyMethode();
    console.log("Hello world");
    // console.log("The response from Api is", result);
    // if (result == "true") {
    //   navigation.navigate("SellerPages");
    // }
  }, []);

  return (
    <View style={loaderStyles.mainContainer}>
      <View style={loaderStyles.lowerContainer}>
        {/* {(loaderIcon === "uploading" && (
          <ImageBackground
            source={require(loadingGif)}
            style={loaderStyles.bakcgroundImage}
          ></ImageBackground>
        )) ||
          (loaderIcon === "verifying" && ( */}
        <ImageBackground
          source={require(loaderGif)}
          style={loaderStyles.bakcgroundImage}
        ></ImageBackground>
        {/* ))} */}
        <Text style={loaderStyles.loadText}>
          Please Wait Your Face is verifying
        </Text>
      </View>
      <View style={loaderStyles.footerView}>
        <Text style={loaderStyles.footerText}>&#169; Powered by Medisale</Text>
        {/* <Image
          source={require(LogoMini)}
          style={{
            width: widthPercentageToDP("15"),
            resizeMode: "contain",
          }}
        /> */}
      </View>
    </View>
  );
};

export default Loader;

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
