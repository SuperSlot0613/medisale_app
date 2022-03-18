import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useSelector } from "react-redux";
import { selectOrigin, selectDestination } from "../feature/navSlice";
import useAuth from "../Hooks/useAuth";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import Button from "../src/components/Button";
import { useNavigation } from "@react-navigation/native";

const MapViewDirection = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const { user } = useAuth();
  const mapRef = useRef();
  const navigation = useNavigation();
  console.log(destination);
  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current?.fitToSuppliedMarkers(["Origin", "Destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  const initialMapState = {
    region: {
      latitude: origin.latitude,
      longitude: origin.longitude,
      altitude: origin.altitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    },
  };

  return (
    <View style={[styles.container,{backgroundColor:"#E0F7FA"}]}>
      <MapView
        ref={mapRef}
        initialRegion={initialMapState.region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        mapType="hybrid"
        // customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
      >
        {origin && destination && (
          <MapViewDirections
            origin={user.displayName}
            destination={destination.name}
            apiKey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="black"
          />
        )}
        {origin && (
          <MapView.Marker
            title={user.displayName}
            description={user.email}
            coordinate={{
              latitude: origin.latitude,
              longitude: origin.longitude,
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

        {destination && (
          <MapView.Marker
            title={destination.data.name}
            description={destination.data.email}
            coordinate={{
              latitude: destination.data.location.latitude,
              longitude: destination.data.location.longitude,
            }}
            identifier="Destination"
          >
            <Animated.View style={[styles.markerWrap]}>
              <Animated.Image
                source={require("../assets/map_marker.png")}
                style={[styles.marker]}
                resizeMode="cover"
              />
            </Animated.View>
          </MapView.Marker>
        )}
      </MapView>
      <View style={styles.button}>
        <Button
          style={{ height: 45, width: "90%" }}
          mode="contained"
          onPress={() => {
            navigation.navigate("Delivery");
          }}
        >
          Order
        </Button>
      </View>
    </View>
  );
};

export default MapViewDirection;

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
