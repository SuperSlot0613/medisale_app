import { useNavigation } from "@react-navigation/native";
import { Block, theme } from "galio-framework";
import React from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import BuyCard from "../Component/BuyCard";
const { width } = Dimensions.get("screen");
import { selectBasket } from "../feature/navSlice";

const BuyScreen = () => {
  const navigation = useNavigation();
  const basket = useSelector(selectBasket);

  return (
    <SafeAreaProvider>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex row={false}>
          <FlatList
            width={Dimensions.get("window").width}
            horizontal={false}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true}
            legacyImplementation={false}
            data={basket}
            renderItem={({ item, index }) =>
              <BuyCard
                key={index}
                meat={item.Meat}
                onion={item.Onion}
                description={item.description}
                extrachess={item.extrachess}
                id={item.id}
                image={item.image}
                itemcount={item.itemcount}
                name={item.name}
                price={item.price}
                veg={item.veg}
                horizontal={true}
              />}
            keyExtractor={item => item.id}
          />
        </Block>
      </ScrollView>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate("MapScreen")}
      >
        <Block
          style={[
            {
              width: 250,
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
              fontSize: 24
            }}
          >
            Buy
          </Text>
        </Block>
      </TouchableOpacity>
    </SafeAreaProvider>
  );
};

export default BuyScreen;

const styles = StyleSheet.create({
  home: {
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
    marginLeft: 8,
    marginTop: 65
  }
});
