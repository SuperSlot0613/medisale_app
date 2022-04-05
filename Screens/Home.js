import { Block, theme } from "galio-framework";
import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  Button,
  Alert,
} from "react-native";
import Cards from "../Component/Cards";
import NormalCard from "../Component/NormalCard";
const { width } = Dimensions.get("screen");
import { db } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import { selectValue, setOrigin, ADD_NEW_ADDRESS } from "../feature/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import useAuth from "../Hooks/useAuth";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(async () => {
    Alert.alert(`Welcome back ${user.displayName}`);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.prompt("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      // console.log(location);
      const { coords } = location;
      if (coords) {
        const { latitude, longitude } = coords;
        let addressResponse = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        // console.log(addressResponse[0]);
        dispatch(ADD_NEW_ADDRESS(addressResponse));
        // for (let item of addressResponse) {
        //   let address = `${item.name}, ${item.street}, ${item.district}, ${item.city},${item.postalCode},${item.region}  `;

        //   console.log(address);
        // }
      }
      dispatch(setOrigin(location.coords));
    })();
  }, []);

  const data = [
    {
      id: "1",
      images:
        "https://st.depositphotos.com/3147737/4982/i/950/depositphotos_49827853-stock-photo-medu-vada-a-south-indian.jpg",
      title: "Vada",
    },
    {
      id: "2",
      images:
        "https://st.depositphotos.com/3147737/4982/i/950/depositphotos_49827853-stock-photo-medu-vada-a-south-indian.jpg",
      title: "Vada",
    },
    {
      id: "3",
      images:
        "https://st.depositphotos.com/3147737/4982/i/950/depositphotos_49827853-stock-photo-medu-vada-a-south-indian.jpg",
      title: "Vada",
    },
    {
      id: "4",
      images:
        "https://st.depositphotos.com/3147737/4982/i/950/depositphotos_49827853-stock-photo-medu-vada-a-south-indian.jpg",
      title: "Vada",
    },
    {
      id: "5",
      images:
        "https://st.depositphotos.com/3147737/4982/i/950/depositphotos_49827853-stock-photo-medu-vada-a-south-indian.jpg",
      title: "Vada",
    },
    {
      id: "6",
      images:
        "https://st.depositphotos.com/3147737/4982/i/950/depositphotos_49827853-stock-photo-medu-vada-a-south-indian.jpg",
      title: "Vada",
    },
  ];

  const value = useSelector(selectValue);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.articles}
    >
      <StatusBar translucent={true} />
      <Block flex>
        {/* <Text style={{ fontSize: 22, marginBottom: 6, fontWeight: "700" }}>
          Eat What makes you Happy
        </Text> */}
        <Block flex row style={{ justifyContent: "space-evenly" }}>
          {/* <FlatList
          ItemSeparatorComponent={
            Platform.OS !== "android" &&
            (({ highlighted }) =>
              <View
                style={[style.separator, highlighted && { marginLeft: 0 }]}
              />)
          }
          data={data}
          renderItem={({ item, index }) =>
          <NormalCard
            images={item.images}
            title={item.title}
          />}
          numColumns={4}
        /> */}
          {/* <NormalCard
            images="https://st.depositphotos.com/3147737/4982/i/950/depositphotos_49827853-stock-photo-medu-vada-a-south-indian.jpg"
            title="Vada"
            id="
            WUGzyKlfLcBBJr3ejZ2l"
          /> */}
        </Block>
      </Block>
      <Block flex row={false}>
        <Cards
          id={123}
          title="Antimalarial medication"
          title2="Antimalarial medications or simply antimalarials are a type of antiparasitic chemical agent that can be used to treat or to prevent malaria"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-zS9wMtJg7hQ-zE3NG23opYNS3tgSbRtdPA&usqp=CAU"
          price={250}
          quantity={1}
          category="Antimalaria"
          horizontal={true}
        />
        {/* <FlatList
          ItemSeparatorComponent={
            Platform.OS !== "android" &&
            (({ highlighted }) =>
              <View
                style={[style.separator, highlighted && { marginLeft: 0 }]}
              />)
          }
          data={foodItem}
          renderItem={({ item, index }) =>
            <Cards
              Key={index}
              title={item.name}
              title2={item.description}
              image={item.image}
              price={item.price}
              id={item?.id}
              horizontal={true}
            />}
        /> */}
      </Block>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    width: width,
    backgroundColor: "#E0F7FA",
  },
  articles: {
    width: width - theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
    marginLeft: 8,
    backgroundColor: "#E0F7FA",
  },
  scollcard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ff0000",
  },
});
