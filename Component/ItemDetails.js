import { Block, theme } from "galio-framework";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_BASKET, selectBasket } from "../feature/navSlice";
import OfferCard from "./OfferCard";

const ItemDetails = () => {
  const route = useRoute();
  const { name, price, description, image, quantity, id,category } = route.params;
  const [itemcount, setitemcount] = useState(1);
  const [extrachess, setextrachess] = useState(0);
  const [Onion, setOnion] = useState(0);
  const [Meat, setMeat] = useState(0);
  const dispatch = useDispatch();
  const basket = useSelector(selectBasket);
  const navigation = useNavigation();
  // console.log(basket);

  const data = [
    {
      id: 1,
      image:
        "https://img.icons8.com/external-filled-outline-icons-maxicons/85/000000/external-capsule-virus-and-medical-filled-outline-icons-maxicons.png",
      mediname: "Xanax(1mg)",
      Oty: "120",
      Fills: "14",
    },
    {
      id: 2,
      image:
        "https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-capsule-science-and-technology-icongeek26-linear-colour-icongeek26.png",
      mediname: "Desyrel(2mg)",
      Oty: "120",
      Fills: "14",
    },
    {
      id: 3,
      image:
        "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/000000/external-capsule-health-care-and-medical-flatart-icons-lineal-color-flatarticons.png",
      mediname: "Prozak(1mg)",
      Oty: "120",
      Fills: "14",
    },
    {
      id: 4,
      image:
        "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/000000/external-capsule-health-care-and-medical-flatart-icons-lineal-color-flatarticons-3.png",
      mediname: "Abarelix",
      Oty: "120",
      Fills: "14",
    },
  ];

  const data1 = [
    {
      id: 1,
      image: "https://img.icons8.com/color/48/000000/wallet--v2.png",
      title: "Pay On Delivery",
    },
    {
      id: 2,
      image: "https://img.icons8.com/dusk/64/000000/box--v2.png",
      title: "Best Product",
    },
    {
      id: 3,
      image: "https://img.icons8.com/ios/50/000000/in-transit--v2.png",
      title: "MediSale Delivery",
    },
    {
      id: 4,
      image: "https://img.icons8.com/dusk/64/000000/ok-hand--v2.png",
      title: "100% Original",
    },
  ];

  return (
    <SafeAreaProvider style={{ backgroundColor: "#E0F7FA" }}>
      <ScrollView style={{ flex: 1, height: "100%" }}>
        <Block
          flex={1}
          card
          row={false}
          style={[styles.card, styles.shadow, { backgroundColor: "#E0F7FA" }]}
        >
          <TouchableOpacity>
            <Block style={styles.imageContainer}>
              <Image
                source={{
                  uri: image,
                }}
                style={[
                  styles.horizontalImage,
                  styles.verticalStyles,
                  styles.horizontalStyles,
                  { margin: 10 },
                ]}
                resizeMode="stretch"
              />
            </Block>
          </TouchableOpacity>
          <TouchableWithoutFeedback>
            <Block
              flex
              row={false}
              style={[
                styles.cardDescription,
                {
                  marginBottom: 8,
                  borderBottomWidth: 4,
                  borderColor: "#d4cdcd",
                },
              ]}
            >
              <Block flex row={false} style={{ alignItems: "center" }}>
                <Text
                  style={{ color: "black", fontWeight: "600", fontSize: 32 }}
                >
                  {name}
                </Text>
                <Text
                  size={14}
                  style={{
                    flex:1,
                    color: "gray",
                    fontWeight: "600",
                    marginTop: 15,
                    alignItems: "center",
                  }}
                >
                  {description}
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "400",
                    fontSize: 18,
                    marginTop: 8,
                  }}
                >
                  M.R.P : 350
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "400",
                    fontSize: 18,
                    marginTop: 8,
                  }}
                >
                  Deal Of Day : ₹
                  {price * itemcount + 30 * extrachess + 20 * Onion + 50 * Meat}
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "400",
                    fontSize: 18,
                    marginTop: 8,
                  }}
                >
                  You Save : ₹100
                </Text>
              </Block>
            </Block>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Block
              row={false}
              style={[
                {
                  width: "100%",
                  height: 340,
                  marginBottom: 20,
                  borderBottomWidth: 4,
                  borderColor: "#d4cdcd",
                },
              ]}
            >
              <Text style={{ marginLeft: 15, marginTop: 5, fontSize: 18 }}>
                Available Medicine
              </Text>
              <FlatList
                horizontal={true}
                keyExtractor={(item, index) => item.id}
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item, index }) => (
                  <OfferCard
                    Key={index}
                    image={item.image}
                    name={item.mediname}
                    Oty={item.Oty}
                    fills={item.Fills}
                  />
                )}
              />
            </Block>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Block
              flex={1}
              row={false}
              style={{
                alignItems: "center",
                marginBottom: 20,
                borderBottomWidth: 4,
                borderColor: "#d4cdcd",
              }}
            >
              <TouchableOpacity
                style={{ width: "100%", marginBottom: 15 }}
                onPress={() => navigation.navigate("MapScreen")}
              >
                <Block
                  style={[
                    {
                      width: 300,
                      height: 50,
                      backgroundColor: "#0c707d",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                    },
                    styles.shadow,
                  ]}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: 24,
                    }}
                  >
                    BUY
                  </Text>
                </Block>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "100%", marginBottom: 22 }}
                onPress={() =>
                  dispatch(
                    ADD_TO_BASKET({
                      name,
                      price,
                      description,
                      image,
                      quantity,
                      id,
                      category
                    })
                  )
                }
              >
                <Block
                  style={[
                    {
                      width: 300,
                      height: 50,
                      backgroundColor: "#278591",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                    },
                    styles.shadow,
                  ]}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: 24,
                    }}
                  >
                    Add Basket
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Block
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <FlatList
                horizontal={true}
                keyExtractor={(item, index) => item.id}
                showsHorizontalScrollIndicator={false}
                data={data1}
                renderItem={({ item, index }) => (
                  <Block
                    flex
                    row
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                      }}
                    >
                      <Block
                        style={[
                          {
                            width: 60,
                            height: 45,
                            backgroundColor: "#d7dbdb",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 50,
                            margin: 10,
                          },
                          styles.shadow,
                        ]}
                      >
                        <Image
                          source={{
                            uri: item.image,
                          }}
                          style={{ width: 30, height: 30 }}
                          resizeMode="stretch"
                        />
                      </Block>
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "600",
                          fontSize: 12,
                          width: 50,
                          height: 40,
                        }}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  </Block>
                )}
              />
            </Block>
          </TouchableWithoutFeedback>
        </Block>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    // marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    borderRadius: 3,
    // elevation: 1,
    overflow: "hidden",
  },
  image: {
    borderRadius: 3,
  },
  horizontalImage: {
    height: 250,
    width: "auto",
  },
  cardTitle: {
    // flex:1,
    flexWrap: "wrap",
    paddingBottom: 1,
    fontWeight: "700",
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
    alignItems: "center",
  },
  horizontalStyles: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 190,
    borderTopLeftRadius: 190,
    borderBottomLeftRadius: 3,
  },
  verticalStyles: {
    borderBottomRightRadius: 190,
    borderBottomLeftRadius: 210,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
