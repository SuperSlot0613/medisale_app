import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_BASKET,
  selectBasket,
  DECREASE_ITEM_QUANTITY,
  INCREASE_ITEM_QUANTITY,
  REMOVE_FROM_BASKET,
  selectUserAddress,
} from "../feature/navSlice";
import { Block, theme } from "galio-framework";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

const MyCart = ({ navigation }) => {
  const basket = useSelector(selectBasket);
  const [total, setTotal] = useState(null);
  const dispatch = useDispatch();
  const [markers, setmarkers] = useState([]);
  const [advertisment, setadvertisment] = useState([]);
  const [addressdata, setaddressdata] = useState("");
  const userAddress = useSelector(selectUserAddress);

  // console.log("Basket value", basket);

  useEffect(() => {
    for (let item of userAddress) {
      let address = `${item.name}, ${item.street}, ${item.district}, ${item.city},${item.postalCode},${item.region}`;
      setaddressdata(address);
    }
    getTotal(basket);
  }, [basket]);

  useEffect(async () => {
    const sellerInfo = await getDocs(collection(db, "sellerInfo"));
    if (sellerInfo !== null) {
      setmarkers(
        sellerInfo.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    }

    const advertisInfo = await getDocs(collection(db, "Advertisment"));
    if (advertisInfo !== null) {
      setadvertisment(
        advertisInfo.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    }
  }, []);

  // console.log(advertisment);

  const getTotal = (productData) => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].price;
      let quantity = productData[index].quantity;
      total = total + productPrice * quantity;
    }
    setTotal(total);
  };

  const renderProducts = (data, index) => {
    return (
      <Block
        key={data.id}
        style={{
          width: "100%",
          height: 100,
          marginVertical: 6,
          flexDirection: "row",
          alignItems: "center",
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
              <TouchableOpacity
                onPress={() => dispatch(DECREASE_ITEM_QUANTITY())}
              >
                <View
                  style={{
                    borderRadius: 100,
                    marginRight: 20,
                    padding: 4,
                    borderWidth: 1,
                    borderColor: "gray",
                    opacity: 0.5,
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <MaterialCommunityIcons
                    name="minus"
                    style={{
                      fontSize: 16,
                      color: "black",
                    }}
                  />
                </View>
              </TouchableOpacity>
              <Text>{data.quantity}</Text>
              <TouchableOpacity
                onPress={() => dispatch(INCREASE_ITEM_QUANTITY())}
              >
                <View
                  style={{
                    borderRadius: 100,
                    marginLeft: 20,
                    padding: 4,
                    borderWidth: 1,
                    borderColor: "gray",
                    opacity: 0.5,
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    style={{
                      fontSize: 16,
                      color: "black",
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                dispatch(REMOVE_FROM_BASKET(data.id));
                ToastAndroid.show(
                  "Items Deleted From Basket",
                  ToastAndroid.SHORT
                );
              }}
            >
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: "black",
                  backgroundColor: "#f5f5f5",
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Block>
    );
  };

  return (
    <SafeAreaProvider>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          position: "relative",
          marginTop: 20,
        }}
      >
        <ScrollView>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              paddingTop: 16,
              paddingHorizontal: 16,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: "black",
                  padding: 12,
                  backgroundColor: "whitesmoke",
                  borderRadius: 12,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                color: "black",
                fontWeight: "400",
              }}
            >
              Order Details
            </Text>
            <View></View>
          </View>
          <Text
            style={{
              fontSize: 20,
              color: "black",
              fontWeight: "500",
              letterSpacing: 1,
              paddingTop: 20,
              paddingLeft: 16,
              marginBottom: 10,
            }}
          >
            My Cart
          </Text>
          <View style={{ paddingHorizontal: 16 }}>
            {basket ? basket.map(renderProducts) : null}
          </View>
          <View>
            <View
              style={{
                paddingHorizontal: 16,
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                  fontWeight: "500",
                  letterSpacing: 1,
                  marginBottom: 20,
                }}
              >
                Delivery Location
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "80%",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      color: "blue",
                      backgroundColor: "#f5f5f5",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 12,
                      borderRadius: 10,
                      marginRight: 18,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="truck-delivery-outline"
                      style={{
                        fontSize: 18,
                        color: "blue",
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {addressdata}
                    </Text>
                  </View>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  style={{ fontSize: 22, color: "black" }}
                />
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                paddingHorizontal: 16,
                marginTop: 40,
                marginBottom: 80,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                  fontWeight: "500",
                  letterSpacing: 1,
                  marginBottom: 20,
                }}
              >
                Order Info
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    maxWidth: "80%",
                    color: "black",
                    opacity: 0.5,
                  }}
                >
                  Subtotal
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    color: "black",
                    opacity: 0.8,
                  }}
                >
                  &#8377;{total}.00
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 22,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    maxWidth: "80%",
                    color: "black",
                    opacity: 0.5,
                  }}
                >
                  Shipping Tax
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    color: "black",
                    opacity: 0.8,
                  }}
                >
                  &#8377;{total / 20}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    maxWidth: "80%",
                    color: "black",
                    opacity: 0.5,
                  }}
                >
                  Total
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    color: "black",
                  }}
                >
                  &#8377;{total + total / 20}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            position: "absolute",
            bottom: 20,
            height: "8%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (basket.length > 0) {
                navigation.navigate("LoaderScreen", {
                  markers: markers,
                  advertisInfo: advertisment,
                });
              }
            }}
            style={{
              width: "86%",
              height: "90%",
              backgroundColor: "blue",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                letterSpacing: 1,
                color: "white",
                textTransform: "uppercase",
              }}
            >
              Next Step (&#8377;{total + total / 20} )
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default MyCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
    fontSize: 14,
  },
  cardContainer: {
    height: 50,
  },
});
