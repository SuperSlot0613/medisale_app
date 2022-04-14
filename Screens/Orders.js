import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useAuth from "../Hooks/useAuth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { Block, theme } from "galio-framework";
const { width } = Dimensions.get("screen");

const Orders = () => {
  const { user } = useAuth();

  var today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const [order, setorderdata] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "userInfo", user.email, "orders"),
        orderBy("timestamp", "asc")
      ),
      (snapshot) => {
        if (snapshot) {
          setorderdata(
            snapshot?.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }
      }
    );
  }, []);

  // console.log(order);

  const renderProducts = (data, index) => {
    return (
      <Block
        key={data.id}
        style={{
          width: "100%",
          height: 100,
          marginVertical: 6,
          flexDirection: "row",
          borderRadius: 10,
          alignItems: "center",
          backgroundColor: "#f2e9e9",
        }}
      >
        <View
          style={{
            width: "30%",
            height: 100,
            padding: 14,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: 10,
            marginRight: 22,
          }}
        >
          <Image
            source={{ uri: data.image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
              resizeMode: "cover",
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                maxWidth: "100%",
                color: "black",
                fontWeight: "600",
                letterSpacing: 1,
              }}
            >
              {data.name}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: "row",
                alignItems: "center",
                opacity: 0.6,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  maxWidth: "85%",
                  marginRight: 4,
                }}
              >
                &#8377;{data.price}
              </Text>
              <Text>
                (~&#8377;
                {data.price + data.price / 20})
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text>Quntity : {data.quantity}</Text>
            </View>
          </View>
        </View>
      </Block>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScrollView style={{ flex: 1, marginTop: 50, width: "100%" }}>
        <FlatList
          ItemSeparatorComponent={
            Platform.OS !== "android" &&
            (({ highlighted }) => (
              <View
                style={[styles.separator, highlighted && { marginLeft: 0 }]}
              />
            ))
          }
          keyExtractor={(item) => item.id}
          data={order}
          renderItem={({ item, index }) => (
            <Block
              key={index}
              card={true}
              flex={1}
              style={[
                {
                  flex: 1,
                  marginTop: 50,
                  marginLeft: 8,
                  width: "95%",
                  height: 300,
                },
                styles.shadow,
              ]}
            >
              <Block style={{ flex: 0.5 }}>
                <ScrollView style={{ flex: 1 }}>
                  <Block row={true}>
                    <View style={{ flex: 1, width: "90%" }}>
                      {item ? item.basket.map(renderProducts) : null}
                    </View>
                  </Block>
                </ScrollView>
              </Block>
              <Block row={false} style={{ flex: 0.5 }}>
                <Block
                  row={true}
                  style={{
                    flex: 1,
                    marginLeft: 20,
                    marginRight: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    amount
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>:</Text>
                  <Text style={{ fontSize: 16, fontWeight: "400" }}>
                    {item.payment.amount}
                  </Text>
                </Block>
                <Block
                  row={true}
                  style={{
                    flex: 1,
                    marginLeft: 20,
                    marginRight: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    Seller Name
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>:</Text>
                  <Text style={{ fontSize: 14, fontWeight: "400" }}>
                    {item.sellerInfo.name}
                  </Text>
                </Block>
                <Block
                  row={true}
                  style={{
                    flex: 1,
                    marginLeft: 20,
                    marginRight: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    Phone No
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>:</Text>
                  <Text style={{ fontSize: 14, fontWeight: "400" }}>
                    {item.sellerInfo.phone}
                  </Text>
                </Block>
                <Block
                  row={true}
                  style={{
                    flex: 1,
                    marginLeft: 20,
                    marginRight: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    delivery Time
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>:</Text>
                  <Text style={{ fontSize: 14, fontWeight: "400" }}>
                    20 Minutes
                  </Text>
                </Block>
                <Block
                  row={true}
                  style={{
                    flex: 1,
                    marginLeft: 20,
                    marginRight: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    Order Time
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>:</Text>
                  <Text style={{ fontSize: 14, fontWeight: "400" }}>
                    {new Date(
                      item.timestamp.seconds * 1000 +
                        item.timestamp.nanoseconds / 1000000
                    ).toDateString() +
                      " " +
                      new Date(
                        item.timestamp.seconds * 1000 +
                          item.timestamp.nanoseconds / 1000000
                      ).toLocaleTimeString()}
                  </Text>
                </Block>
              </Block>
            </Block>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  // home: {
  //   width: width,
  //   backgroundColor: "#E0F7FA",
  // },
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
    width: "90%",
    backgroundColor: "#ff0000",
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
