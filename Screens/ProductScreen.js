import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import { db } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import { Block, theme } from "galio-framework";
import ProductCard from "../Component/ProductCard";
import { StatusBar } from "expo-status-bar";
const { width } = Dimensions.get("screen");

const ProductScreen = () => {
  const route = useRoute();
  const {title,title1,image,price } = route.params;
  const [productList, setproductList] = useState([{
    image:image,
    price:price,
    name:title,
    description:title1,
  }]);

  // useEffect(async () => {
  //   const passes = await getDocs(collection(db, "filteritems")).then(snapshot =>
  //     snapshot.docs
  //       .filter(doc => doc.id === id)
  //       .map(doc => setproductList(doc.data().Burger))
  //   );
  // }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.articles}
    >
      <StatusBar translucent={true} />
      <Block flex>
        <FlatList
          numColumns={2}
          ItemSeparatorComponent={
            Platform.OS !== "android" &&
            (({ highlighted }) =>
              <View
                style={[style.separator, highlighted && { marginLeft: 0 }]}
              />)
          }
          data={productList}
          renderItem={({ item, index }) =>
            <ProductCard
              Key={index}
              // id={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
              price={item.price}
              // count={item.count}
              // veg={item.veg}
              horizontal={true}
            />}
        />
      </Block>
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  articles: {
    width: width - theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
    marginLeft: 8,
    backgroundColor:"#E0F7FA"
  }
});
