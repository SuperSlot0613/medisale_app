import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Block } from "galio-framework";
import ArButton from "../../Component/ArButton";
const { width, height } = Dimensions.get("screen");
import argonTheme from "../../constants/Theme";
import Button from "../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";

const Instruction = () => {
  const route = useRoute();

  const { card,val } = route.params;

  const navigation = useNavigation();
  const data = [
    { text: "Make sure light is not too low or too bright", id: 1 },
    { text: "Remove extra accessories:sunglasses, hat, etc.", id: 2 },
    { text: "Ensure your face is visible to capture", id: 3 },
  ];

  const data1 = [
    { text: "Make sure light is not too low or too bright", id: 1 },
    { text: "Ensure the text is visible(hold document steady)", id: 2 },
    { text: "Ensure your document is visible to capture", id: 3 },
  ];

  return (
    <SafeAreaProvider>
      <Block
        flex
        style={{
          marginTop: 5,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Block style={{ height: 300 }}>
          {card === "true" ? (
            <Image
              source={require("../assets/face1.png")}
              resizeMode="center"
              style={styles.image}
            />
          ) : (
            <Image
              source={require("../assets/face2.png")}
              resizeMode="center"
              style={styles.image}
            />
          )}
        </Block>
        <Block style={{ height: 250 }}>
          <FlatList
            data={card === "true" ? data1 : data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Block flex row={true} style={{ margin: 15 }}>
                <Image
                  style={{ width: 20, height: 20, marginRight: 5 }}
                  source={{
                    uri: "https://img.icons8.com/ios-glyphs/30/000000/info--v2.png",
                  }}
                  resizeMode="stretch"
                />
                <Text style={{ fontSize: 16, fontWeight: "400" }}>
                  {item.text}
                </Text>
              </Block>
            )}
          />
        </Block>
      </Block>
      <Block
        middle
        flex
        center
        style={{ justifyContent: "center", marginTop: 360 }}
      >
        <Button
          style={{ width: 300 }}
          mode="contained"
          onPress={() =>
            navigation.navigate("CameraScan", {
              card: card,
              val:val,
            })
          }
        >
          NEXT STEP
        </Button>
      </Block>
    </SafeAreaProvider>
  );
};

export default Instruction;

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
});
