import React from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({
  name,
  description,
  horizontal,
  quantity,
  category,
  count,
  veg,
  price,
  style,
  imageStyle,
  image,
  id,
}) => {
  const navigation = useNavigation();
  const imageStyles = [styles.horizontalImage, imageStyle];
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
          navigation.navigate("ItemDetails", {
            id: id,
            name: name,
            description: description,
            price: price,
            image: image,
            quantity: quantity,
            category:category
          })
        }
      >
        <Block flex style={imgContainer}>
          <Image
            source={{
              uri: image,
            }}
            style={imageStyles}
            resizeMode="stretch"
          />
        </Block>
      </TouchableOpacity>
      <TouchableWithoutFeedback>
        <Block flex space="between" style={[styles.cardDescription]}>
          <Block flex row={false}>
            <Text size={20} style={styles.cardTitle}>
              {name}
            </Text>
            <Text
              size={14}
              style={{ color: "gray", fontWeight: "600", alignItems: "center" }}
            >
              {description}
            </Text>
          </Block>
          <Block
            flex
            row
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Text
              size={16}
              style={{ color: "gray", fontWeight: "600", marginTop: 6 }}
            >
              ₹{price}
            </Text>
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
                marginTop: 5,
              }}
            >
              ⭐4.1
            </Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 250,
    width: "60%",
    margin: 5,
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
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: 3,
    // elevation: 1,
    overflow: "hidden",
    alignItems: "center",
    width: "100%",
  },
  image: {
    borderRadius: 10,
  },
  horizontalImage: {
    marginTop: 15,
    height: 150,
    width: "80%",
  },
  horizontalStyles: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  verticalStyles: {
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
