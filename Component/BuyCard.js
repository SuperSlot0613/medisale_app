import { Block, theme } from "galio-framework";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
const { width } = Dimensions.get("screen");

const BuyCard = ({
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
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.articles}
    >
      {/* <View style={{ flex: 1, height: 1, backgroundColor: "black" }} /> */}
      <Block flex row space="between">
        <Block
          flex={1}
          row
          space="between"
          style={{ margin: 18, alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, fontWeight: "00" }}>
            {name}
          </Text>
          <View style={{ flex: 0.1, height: 1, backgroundColor: "black" }} />
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            ₹{price}
          </Text>
        </Block>
      </Block>
      <View style={{ flex: 1, height: 0.5, backgroundColor: "black" }} />
    </ScrollView>
  );
};

export default BuyCard;

const styles = StyleSheet.create({
  home: {
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE - 5,
    marginLeft: 8
  },
  scollcard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
