import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NormalCard = ({ images, title, id }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductScreen", {
          id: id
        })}
    >
      <View style={styles.itemcard}>
        <Image
          style={{ width: 70, height: 70, borderRadius: 70 }}
          source={{
            uri: images
          }}
        />
        <Text style={{ fontSize: 12, marginTop: 4, color: "gray" }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NormalCard;

const styles = StyleSheet.create({
  itemcard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: 75,
    height: 100,
    margin: 5,
    padding: 10
  }
});
