import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Animated,
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

const DeliverySell = () => {
  const route = useRoute();
  const { usersInfo, paymentInfo } = route.params;
  const sellerdata = useSelector(selectSellerData);
  const mapRef = useRef();
  const navigation = useNavigation();
  const [sendOtp, setsendOtp] = useState(true);

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
      <Block style={{ flex: 0.4 }}>
        <Block style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
          <Text style={{ fontSize: 16 }}>{usersInfo.address}</Text>
        </Block>
        <Block>
          {sendOtp ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput
                label="Enter OTP"
                returnKeyType="next"
                // value={email.value}
                // onChangeText={(text) => setEmail({ value: text, error: "" })}
                keyboardType="number-pad"
                style={{ width: 100, height: 50 }}
              />
              <Button
                mode="contained"
                style={{ width: 100, flex: 1 }}
                // onPress={() => {
                //   navigation.navigate("DeliverySell", {
                //     usersInfo: item.usersInfo,
                //     paymentInfo: item.payment,
                //   });
                // }}
              >
                Verify
              </Button>
            </View>
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
                // onPress={() => {
                //   navigation.navigate("DeliverySell", {
                //     usersInfo: item.usersInfo,
                //     paymentInfo: item.payment,
                //   });
                // }}
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
