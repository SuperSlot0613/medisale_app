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

const UserOrder = () => {
  const route = useRoute();

  const { basket, usersInfo, prescription } = route?.params;
  const sellerdata = useSelector(selectSellerData);
  const mapRef = useRef();
  const navigation = useNavigation();
  // console.log(usersInfo);

  useEffect(() => {
    console.log("Component is call");
    mapRef.current?.fitToSuppliedMarkers(["Origin", "Destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, []);

  const initialMapState = {
    region: {
      latitude: sellerdata?.location.latitude,
      longitude: sellerdata?.location.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    },
  };
  //   console.log(basket);

  const renderProducts = (data, index) => {
    return (
      <Block
        key={data.id}
        style={{
          width: "100%",
          height: 100,
          marginVertical: 6,
          flexDirection: "row",
          borderRadius: 10,
          alignItems: "center",
          backgroundColor: "#f2e9e9",
        }}
      >
        <View
          style={{
            width: "30%",
            height: 100,
            padding: 14,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: 10,
            marginRight: 22,
          }}
        >
          <Image
            source={{ uri: data.image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
              resizeMode: "cover",
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                maxWidth: "100%",
                color: "black",
                fontWeight: "600",
                letterSpacing: 1,
              }}
            >
              {data.name}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: "row",
                alignItems: "center",
                opacity: 0.6,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  maxWidth: "85%",
                  marginRight: 4,
                }}
              >
                &#8377;{data.price}
              </Text>
              <Text>
                (~&#8377;
                {data.price + data.price / 20})
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text>Quntity : {data.quantity}</Text>
            </View>
          </View>
        </View>
      </Block>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Block style={{ flex: 0.5 }}>
        <ScrollView>
          <View style={{ paddingHorizontal: 16 }}>
            {basket ? basket?.map(renderProducts) : null}
          </View>
        </ScrollView>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Button
            mode="contained"
            style={{ width: "80%" }}
            onPress={() => {
              navigation.navigate("Prescription", {
                Images: prescription,
              });
            }}
          >
            View Prescription
          </Button>
        </View>
      </Block>
      <Block style={{ flex: 0.5 }}>
        <View style={[styles.container, { backgroundColor: "#E0F7FA" }]}>
          <MapView
            ref={mapRef}
            initialRegion={initialMapState?.region}
            style={styles.container}
            provider={PROVIDER_GOOGLE}
            mapType="standard"
          >
            {usersInfo && sellerdata && (
              <MapViewDirections
                origin={sellerdata?.name}
                destination={usersInfo?.name}
                apiKey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="black"
              />
            )}
            {usersInfo && (
              <MapView.Marker
                title={usersInfo?.name}
                description={usersInfo?.email}
                coordinate={{
                  latitude: usersInfo?.userloaction.latitude,
                  longitude: usersInfo?.userloaction.longitude,
                }}
                identifier="Origin"
              >
                <Animated.View style={[styles.markerWrap]}>
                  <Animated.Image
                    source={require("../assets/user_marker.png")}
                    style={[styles.marker]}
                    resizeMode="cover"
                  />
                </Animated.View>
              </MapView.Marker>
            )}

            {sellerdata && (
              <MapView.Marker
                title={sellerdata?.name}
                description={sellerdata?.email}
                coordinate={{
                  latitude: sellerdata?.location.latitude,
                  longitude: sellerdata?.location.longitude,
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
    </View>
  );
};

export default UserOrder;

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
    width: 40,
    height: 45,
  },
  button: {
    alignItems: "center",
    marginTop: 2,
  },
});
