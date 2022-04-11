import React, { useEffect, useState } from "react";
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
import MapView, { Circle, PROVIDER_GOOGLE } from "react-native-maps";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import StarRating from "../Component/StarRating";

import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, setDestination } from "../feature/navSlice";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import useAuth from "../Hooks/useAuth";
import Button from "../src/components/Button";
import { Block } from "galio-framework";
import { BottomSheet } from "react-native-btr";
import CountDown from "react-native-countdown-component";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 230;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const MapScreen = () => {
  const theme = useTheme();
  const route = useRoute();
  const { distancedata, advertisInfo } = route.params;
  const [markers, setmarkers] = useState(distancedata);
  const [advertisment, setadvertisment] = useState(advertisInfo);
  const userloc = useSelector(selectOrigin);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  // console.log(visible);
  // console.log(userloc);
  // console.log("Map Screen Advertisment",advertisment);

  // useEffect(async () => {
  //   const sellerInfo = await getDocs(collection(db, "sellerInfo"));
  //   setmarkers(
  //     sellerInfo.docs.map((doc) => ({
  //       id: doc.id,
  //       data: doc.data(),
  //     }))
  //   );
  // }, []);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    toggleBottomNavigationView();
  }, []);

  const initialMapState = {
    region: {
      latitude: userloc.latitude,
      longitude: userloc.longitude,
      altitude: userloc.altitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    },
  };

  const [state, setState] = useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const location = markers[index].data.location;
          // console.log("UseEffect value", location);
          _map.current.animateToRegion(
            {
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        mapType="standard"
        // customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
      >
        {markers?.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker
              key={index}
              coordinate={marker.data.location}
              onPress={(e) => onMarkerPress(e)}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require("../assets/map_marker.png")}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
        <MapView.Marker
          title={user.displayName}
          description={user.email}
          coordinate={userloc}
          identifier="Origin"
        >
          <Animated.View style={[styles.markerWrap]}>
            <Animated.Image
              source={require("../assets/user_marker.png")}
              style={[styles.marker, { height: 45, width: 40 }]}
              resizeMode="cover"
            />
          </Animated.View>
        </MapView.Marker>
        <Circle
          center={{
            latitude: userloc.latitude,
            longitude: userloc.longitude,
          }}
          radius={600}
          strokeWidth={1}
          strokeColor={"#1a66ff"}
          fillColor={"rgba(230,238,255,0.5)"}
        />
      </MapView>
      <View style={styles.searchBox}>
        <GooglePlacesAutocomplete
          placeholder="Search Your Location"
          nearbyPlacesAPI="GooglePlacesSearch"
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          enableHighAccuracyLocation={true}
          minLength={2}
          enablePoweredByContainer={false}
          style={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            // console.log(data, details);
          }}
          fetchDetails={true}
          debounce={400}
        />
      </View>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={{ uri: marker.data.photourl }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.data.name}
              </Text>
              {/* <StarRating ratings={marker.rating} reviews={marker.reviews} /> */}
              <Block row={true} style={{ justifyContent: "space-between" }}>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.data.email}
                </Text>
                <StarRating props={4} />
              </Block>
              <View style={styles.button}>
                <Button
                  style={{ height: 45 }}
                  mode="contained"
                  onPress={() => {
                    dispatch(setDestination(marker));
                    navigation.navigate("MapViwDirection");
                  }}
                >
                  Order
                </Button>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
      <BottomSheet
        visible={visible}
        // onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
      >
        <Block flex={0.6} row={false} style={styles.bottomNavigationView}>
          <Text style={{ color: "black", fontWeight: "600", fontSize: 20 }}>
            Advertisment
          </Text>
          <CountDown
            size={14}
            until={10}
            onFinish={() => toggleBottomNavigationView()}
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
          <Image
            style={{ width: "95%", height: 250, borderRadius: 10 }}
            source={{ uri: advertisment[0]?.data.shopImage }}
            resizeMode="cover"
          />
          <Block row={true}>
            <Text style={{ fontSize: 18, fontWeight: "400", color: "crimson" }}>
              Discount Offer=
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "400", color: "crimson" }}>
              {advertisment[0]?.data.discount}%
            </Text>
          </Block>
          <Block row={true}>
            <Text style={{ fontSize: 18, fontWeight: "400", color: "crimson" }}>
              Shop Name =
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "400", color: "crimson" }}>
              {" "}
              {advertisment[0]?.data.ShopName}
            </Text>
          </Block>
        </Block>
      </BottomSheet>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 30,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 2,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 250,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
