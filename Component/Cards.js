import React from "react";
import { StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Cards = ({
  title,
  title2,
  horizontal,
  price,
  full,
  id,
  quantity,
  category,
  style,
  imageStyle,
  image,
}) => {
  const navigation = useNavigation();
  const imageStyles = [
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle,
  ];
  const cardContainer = [styles.card, styles.shadow, style];
  const imgContainer = [
    styles.imageContainer,
    horizontal ? styles.horizontalStyles : styles.verticalStyles,
    styles.shadow,
  ];
  return (
    <Block row={horizontal} card flex style={cardContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductScreen", {
            id: id,
            title: title,
            description: title2,
            quantity: quantity,
            image: image,
            price: price,
            category: category,
          })
        }
      >
        <Block flex style={imgContainer}>
          <Image
            source={{ uri: image }}
            style={imageStyles}
            resizeMode="stretch"
          />
        </Block>
      </TouchableOpacity>
      <TouchableWithoutFeedback>
        <Block flex row space="between" style={[styles.cardDescription]}>
          <Block flex row={false}>
            <Text size={20} style={styles.cardTitle}>
              {title}
            </Text>
            <Text size={14} style={{ color: "gray", fontWeight: "600" }}>
              {title2}
            </Text>
          </Block>
          <Block>
            <Text
              size={14}
              style={{
                color: "white",
                fontWeight: "400",
                backgroundColor: "green",
                width: 45,
                height: 22,
                borderRadius: 2,
                marginLeft: 50,
                textAlign: "center",
                marginBottom: 5,
              }}
            >
              ⭐4.1
            </Text>
            <Text
              size={16}
              style={{ color: "gray", fontWeight: "600", marginTop: 6 }}
            >
              ₹{price} for one
            </Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Block
          style={{
            borderTopWidth: 1,
            borderTopColor: "gray",
            width: 300,
            marginLeft: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "gray",
              fontWeight: "600",
              fontSize: 14,
              margin: 8,
            }}
          >
            ✨🎉6050+ orders from here recently
          </Text>
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  );
};

export default Cards;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 240,
    margin: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
    fontWeight: "700",
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
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
    height: 170,
    width: "auto",
  },
  horizontalStyles: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  verticalStyles: {
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
  },
  fullImage: {
    height: 150,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
