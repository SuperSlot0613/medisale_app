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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOURS, Items } from "../database/Database";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import axios from "axios";
import stripe from "tipsi-stripe";

const MyCart = ({ navigation }) => {
  const [product, setProduct] = useState(Items);
  const [total, setTotal] = useState(null);
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const [token, settoken] = useState();

  useEffect(() => {
    getTotal(product);
  }, []);

  const getTotal = (productData) => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].productPrice;
      total = total + productPrice;
    }
    setTotal(total);
  };

  const checkOut = async () => {
    console.log(cardDetails);
    if (!cardDetails?.complete) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: "saurabh@gmail.com",
    };
    try {
      const response = await axios("http://192.168.1.14:3003/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      const { clientSecret, error } = await response.data;
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          console.log(error.message);
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }

    ToastAndroid.show("Items will be Deliverd SOON!", ToastAndroid.SHORT);

    // navigation.navigate("Home");
  };

  const renderProducts = (data, index) => {
    return (
      <TouchableOpacity
        key={data.id}
        onPress={() =>
          navigation.navigate("ProductInfo", { productID: data.id })
        }
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
            backgroundColor: COLOURS.backgroundLight,
            borderRadius: 10,
            marginRight: 22,
          }}
        >
          <Image
            source={data.productImage}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
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
                color: COLOURS.black,
                fontWeight: "600",
                letterSpacing: 1,
              }}
            >
              {data.productName}
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
                &#8377;{data.productPrice}
              </Text>
              <Text>
                (~&#8377;
                {data.productPrice + data.productPrice / 20})
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
              <View
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}
              >
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </View>
              <Text>1</Text>
              <View
                style={{
                  borderRadius: 100,
                  marginLeft: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}
              >
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroundDark,
                  backgroundColor: COLOURS.backgroundLight,
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: COLOURS.white,
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
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLOURS.backgroundLight,
                  borderRadius: 12,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.black,
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
              color: COLOURS.black,
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
            {product ? product.map(renderProducts) : null}
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
                  color: COLOURS.black,
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
                      color: COLOURS.blue,
                      backgroundColor: COLOURS.backgroundLight,
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
                        color: COLOURS.blue,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: COLOURS.black,
                        fontWeight: "500",
                      }}
                    >
                      2 Petre Melikishvili St.
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: COLOURS.black,
                        fontWeight: "400",
                        lineHeight: 20,
                        opacity: 0.5,
                      }}
                    >
                      0162, Tbilisi
                    </Text>
                  </View>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  style={{ fontSize: 22, color: COLOURS.black }}
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "space-evenly",
                paddingHorizontal: 5,
                marginVertical: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: COLOURS.black,
                  fontWeight: "500",
                  letterSpacing: 1,
                  marginBottom: 20,
                }}
              >
                Payment Method
              </Text>
              <View style={styles.container}>
                <CardField
                  postalCodeEnabled={false}
                  placeholder={{
                    number: "4242 4242 4242 4242",
                  }}
                  cardStyle={styles.card}
                  style={styles.cardContainer}
                  onCardChange={(cardDetails) => {
                    setCardDetails(cardDetails);
                  }}
                />
              </View>
            </View>
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
                  color: COLOURS.black,
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
                    color: COLOURS.black,
                    opacity: 0.5,
                  }}
                >
                  Subtotal
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    color: COLOURS.black,
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
                    color: COLOURS.black,
                    opacity: 0.5,
                  }}
                >
                  Shipping Tax
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    color: COLOURS.black,
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
                    color: COLOURS.black,
                    opacity: 0.5,
                  }}
                >
                  Total
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    color: COLOURS.black,
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
            onPress={() => (total != 0 ? checkOut() : null)}
            style={{
              width: "86%",
              height: "90%",
              backgroundColor: COLOURS.blue,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            disabled={loading}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                letterSpacing: 1,
                color: COLOURS.white,
                textTransform: "uppercase",
              }}
            >
              CHECKOUT (&#8377;{total + total / 20} )
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
