import { Block, theme } from "galio-framework";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  selectBasket
} from "../feature/navSlice";

const WishListCard = ({
  Meat,
  Onion,
  description,
  extrachess,
  id,
  image,
  itemcount,
  name,
  price,
  veg
}) => {
  const route = useRoute();
  // const { name, price, description, image, veg, count } = route.params;
  const [count, setitemcount] = useState(itemcount);
  const [chess, setextrachess] = useState(0);
  const [onion, setOnion] = useState(0);
  const [meat, setMeat] = useState(0);
  const dispatch = useDispatch();
  // console.log(basket);

  return (
    <SafeAreaProvider
      containerStyles={{
        width: Dimensions.get("window").width
      }}
    >
      <Block flex row={false} style={[styles.card, styles.shadow]}>
        <TouchableOpacity>
          <Block style={styles.imageContainer}>
            <Image
              source={{
                uri: image
              }}
              style={[
                styles.horizontalImage,
                styles.verticalStyles,
                styles.horizontalStyles
              ]}
              resizeMode="stretch"
            />
          </Block>
        </TouchableOpacity>
        <TouchableWithoutFeedback>
          <Block flex row={false} style={[styles.cardDescription]}>
            <Block flex row={false} style={{ alignItems: "center" }}>
              <Text style={{ color: "black", fontWeight: "600", fontSize: 30 }}>
                {name}
              </Text>
              <Text
                size={18}
                style={{ color: "gray", fontWeight: "600", marginTop: 6 }}
              >
                {description}
              </Text>
              <Text
                style={{ color: "crimson", fontWeight: "700", fontSize: 22 }}
              >
                ₹{price * count + 40 * chess + 60 * meat + 10 * onion}
              </Text>
              <Block
                flex
                row
                style={[
                  styles.cardDescription,
                  { justifyContent: "space-between", marginTop: 4 }
                ]}
              >
                <TouchableOpacity
                  style={{
                    marginRight: 10,
                    alignItems: "center",
                    marginTop: 2
                  }}
                  onPress={() => setitemcount(count - 1)}
                >
                  <AntDesign
                    name="minus"
                    color="black"
                    style={{
                      color: "black",
                      fontWeight: "600",
                      fontSize: 34
                    }}
                  />
                </TouchableOpacity>
                <Block
                  style={[
                    {
                      width: 60,
                      height: 42,
                      backgroundColor: "crimson",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10
                    },
                    styles.shadow
                  ]}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: 32
                    }}
                  >
                    {count}
                  </Text>
                </Block>
                <TouchableOpacity
                  style={{
                    marginLeft: 10,
                    alignItems: "center",
                    marginTop: 2
                  }}
                  onPress={() => setitemcount(count + 1)}
                >
                  <AntDesign
                    name="plus"
                    color="black"
                    style={{
                      color: "black",
                      fontWeight: "600",
                      fontSize: 34
                    }}
                  />
                </TouchableOpacity>
              </Block>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Block flex row={false} style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{ marginTop: 4 }}
              onPress={() => dispatch(REMOVE_FROM_BASKET(id))}
            >
              <Block
                style={[
                  {
                    width: 120,
                    height: 42,
                    backgroundColor: "crimson",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    marginTop: 4
                  },
                  styles.shadow
                ]}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 24
                  }}
                >
                  Remove
                </Text>
              </Block>
            </TouchableOpacity>
            <Block
              flex
              row
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 5
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center"
                }}
                onPress={() => setextrachess(chess + 1)}
              >
                <Block
                  style={[
                    {
                      width: 70,
                      height: 45,
                      backgroundColor: "crimson",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      margin: 10
                    },
                    styles.shadow
                  ]}
                >
                  <Image
                    source={{
                      uri:
                        "https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-cheese-netherlands-icongeek26-linear-colour-icongeek26.png"
                    }}
                    style={{ width: 40, height: 40 }}
                    resizeMode="stretch"
                  />
                </Block>
                <Text
                  style={{ color: "black", fontWeight: "600", fontSize: 18 }}
                >
                  Cheese
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: "center"
                }}
                onPress={() => setOnion(onion + 1)}
              >
                <Block
                  style={[
                    {
                      width: 70,
                      height: 45,
                      backgroundColor: "crimson",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      margin: 10
                    },
                    styles.shadow
                  ]}
                >
                  <Image
                    source={{
                      uri:
                        "https://img.icons8.com/external-soft-fill-juicy-fish/60/000000/external-onion-plant-based-diet-soft-fill-soft-fill-juicy-fish.png"
                    }}
                    style={{ width: 40, height: 40 }}
                    resizeMode="stretch"
                  />
                </Block>
                <Text
                  style={{ color: "black", fontWeight: "600", fontSize: 18 }}
                >
                  Onion
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: "center"
                }}
                onPress={() => setMeat(meat + 1)}
              >
                <Block
                  style={[
                    {
                      width: 70,
                      height: 45,
                      backgroundColor: "crimson",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      margin: 10
                    },
                    styles.shadow
                  ]}
                >
                  <Image
                    source={{
                      uri:
                        "https://img.icons8.com/office/80/000000/steak-rare.png"
                    }}
                    style={{ width: 40, height: 40 }}
                    resizeMode="stretch"
                  />
                </Block>
                <Text
                  style={{ color: "black", fontWeight: "600", fontSize: 18 }}
                >
                  Meat
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    </SafeAreaProvider>
  );
};

export default WishListCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 380,
    margin: 5
  },
  imageContainer: {
    borderRadius: 3,
    // elevation: 1,
    overflow: "hidden"
  },
  image: {
    borderRadius: 3
  },
  horizontalImage: {
    height: 250,
    width: "auto"
  },
  cardTitle: {
    // flex:1,
    flexWrap: "wrap",
    paddingBottom: 1,
    fontWeight: "700"
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
    alignItems: "center"
  },
  horizontalStyles: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 150,
    borderTopLeftRadius: 150,
    borderBottomLeftRadius: 3
  },
  verticalStyles: {
    borderBottomRightRadius: 190,
    borderBottomLeftRadius: 210
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2
  }
});
