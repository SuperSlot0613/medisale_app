import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Animated,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Block, theme } from "galio-framework";
import { useDispatch, useSelector } from "react-redux";
import { selectSellerData } from "../feature/SellerSlice";
import { GOOGLE_MAPS_APIKEY } from "@env";
import Button from "../src/components/Button";
import { useNavigation } from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as ImageManipulator from "expo-image-manipulator";
import TextInput from "../src/components/TextInput";
import { auth } from "../firebase";
import { signInWithPhoneNumber } from "firebase/auth";
import CountDown from "react-native-countdown-component";

const DeliverySell = () => {
  const route = useRoute();
  const { usersInfo, paymentInfo } = route.params;
  const sellerdata = useSelector(selectSellerData);
  const mapRef = useRef();
  const navigation = useNavigation();
  const [sendOtp, setsendOtp] = useState(false);
  const [confirm, setconfirm] = useState(null);
  const [otpcode, setotpcode] = useState("");

  // console.log(usersInfo);

  const otpSender = async () => {
    const confirmation = await signInWithPhoneNumber(
      auth,
      "+91" + usersInfo.phone
    );
    console.log("confirmation", confirmation);
    if (confirmation) {
      setconfirm(confirmation);
      ToastAndroid.show("OTP has beem Sended", ToastAndroid.SHORT);
    }
  };

  const OtpVerify = async () => {
    try {
      let data = await confirm.confirm(number);
      console.log("data", data);
      ToastAndroid.show("OTP is Verify", ToastAndroid.SHORT);
    } catch (error) {
      console.log("Invalid code.");
      ToastAndroid.show("Invalid code.", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    console.log("Component is call");
    mapRef.current?.fitToSuppliedMarkers(["Origin", "Destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [usersInfo, sellerdata[0]]);

  const initialMapState = {
    region: {
      latitude: sellerdata[0].location.latitude,
      longitude: sellerdata[0].location.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    },
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Block style={{ flex: 0.7 }}>
        <View style={[styles.container, { backgroundColor: "#E0F7FA" }]}>
          <MapView
            ref={mapRef}
            initialRegion={initialMapState.region}
            style={styles.container}
            provider={PROVIDER_GOOGLE}
            mapType="standard"
          >
            {usersInfo && sellerdata[0] && (
              <MapViewDirections
                origin={sellerdata[0].name}
                destination={usersInfo.name}
                apiKey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="black"
              />
            )}
            {usersInfo && (
              <MapView.Marker
                title={usersInfo.name}
                description={usersInfo.email}
                coordinate={{
                  latitude: usersInfo.userloaction.latitude,
                  longitude: usersInfo.userloaction.longitude,
                }}
                identifier="Origin"
              >
                <Animated.View style={[styles.markerWrap]}>
                  <Animated.Image
                    source={require("../assets/medicine.png")}
                    style={[styles.marker]}
                    resizeMode="cover"
                  />
                </Animated.View>
              </MapView.Marker>
            )}

            {sellerdata[0] && (
              <MapView.Marker
                title={sellerdata[0].name}
                description={sellerdata[0].email}
                coordinate={{
                  latitude: sellerdata[0].location.latitude,
                  longitude: sellerdata[0].location.longitude,
                }}
                identifier="Destination"
              >
                <Animated.View style={[styles.markerWrap]}>
                  <Animated.Image
                    source={require("../assets/vahicale.png")}
                    style={[styles.marker]}
                    resizeMode="cover"
                  />
                </Animated.View>
              </MapView.Marker>
            )}
          </MapView>
        </View>
      </Block>
      <Block
        style={{ flex: 0.4, flexDirection: "column", justifyContent: "center" }}
      >
        <Block
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            marginTop: 10,
            zIndex: 10,
          }}
        >
          <Text style={{ fontSize: 20, marginBottom: 5 }}>
            Name : {usersInfo.name}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Phone No : {usersInfo.phone}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            {usersInfo.address}
          </Text>
          <CountDown
            size={18}
            until={1800}
            onFinish={() => alert("Finished")}
            digitStyle={{
              backgroundColor: "#FFF",
              borderWidth: 2,
              borderColor: "#1CC625",
            }}
            digitTxtStyle={{ color: "#1CC625" }}
            timeLabelStyle={{ color: "red", fontWeight: "bold" }}
            separatorStyle={{ color: "#1CC625" }}
            timeToShow={["H", "M", "S"]}
            timeLabels={{ m: null, s: null }}
            showSeparator
          />
        </Block>
        <Block
          style={{
            flex: 1,
            flexflexDirection: "row",
            alignItems: "center",
            zIndex: 10,
            marginTop:45
          }}
        >
          {sendOtp ? (
            <KeyboardAvoidingView>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Block style={{ margin: 5 }}>
                  <TextInput
                    label="Enter OTP"
                    returnKeyType="next"
                    style={{ width: 100, height: 45 }}
                    value={otpcode}
                    onChangeText={(text) => setotpcode(text)}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                  />
                </Block>
                <Block style={{ margin: 5 }}>
                  <Button
                    mode="contained"
                    style={{ width: 120, height: 50 }}
                    onPress={() => {
                      OtpVerify();
                    }}
                  >
                    Verify
                  </Button>
                </Block>
              </View>
            </KeyboardAvoidingView>
          ) : (
            <Block
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                mode="contained"
                style={{ width: 150 }}
                onPress={() => {
                  setsendOtp(true);
                  otpSender();
                }}
              >
                Send OTP
              </Button>
            </Block>
          )}
        </Block>
      </Block>
    </View>
  );
};

export default DeliverySell;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 50,
    height: 50,
  },
  button: {
    alignItems: "center",
    marginTop: 2,
  },
});
