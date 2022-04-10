import { Alert, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import Button from "../src/components/Button";
import {
  PaymentMethodCreateParams,
  useConfirmPayment,
  CardField,
  CardFieldInput,
} from "@stripe/stripe-react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const PaymentCard = ({
  amount,
  onPaymentSuccess,
  onPaymentFailed,
  onPaymentCancel,
}) => {
  const [Name, setName] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  // console.log(amount)

  const { confirmPayment, loading } = useConfirmPayment();
  const navigation = useNavigation();

  const initPayment = async () => {
    const response = await axios.post(
      "https://us-central1-medisale-app.cloudfunctions.net/api/create-payment-intent",
      {
        amount: amount,
        currency: "inr",
        paymentMethod: "card",
      }
    );
    if (response.data) {
      // console.log(response.data);
      const clientSecret = response.data.clientSecret;
      const billingDetails = {
        name: Name,
        phone: phonenumber,
      };
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        type: "Card",
        billingDetails,
      });
      if (error) {
        console.log(error.message);
        onPaymentFailed();
      } else {
        console.log("Payment Successful");
        onPaymentSuccess(paymentIntent, phonenumber);
      }
    } else {
      onPaymentFailed();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <View
          style={{
            display: "flex",
            height: 60,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Make Payment</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              paddingHorizontal: 16,
              marginBottom: 30,
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
                &#8377;{amount}.00
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
                &#8377;{amount / 20}
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
                total
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color: "black",
                }}
              >
                &#8377;{amount + amount / 20}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.creditCard}>
          <TextInput
            autoCapitalize="none"
            placeholder="Name Of Card"
            keyboardType="name-phoen-pad"
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="Phone Number"
            keyboardType="number-pad"
            onChangeText={(text) => setphonenumber(text)}
            style={styles.input}
          />
          <CardField
            placeholder={{ number: "0000 0000 0000 0000" }}
            onCardChange={(cardDetails) => {
              // console.log(cardDetails);
            }}
            onFocus={(focusField) => {
              // console.log("Focus On", focusField);
            }}
            style={styles.CardField}
          />
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Button
            onPress={() => onPaymentCancel()}
            disabled={loading}
            style={{ height: 45, width: "90%" }}
            mode="contained"
          >
            Cancel Payment
          </Button>
          <Button
            disabled={loading}
            onPress={() => initPayment()}
            style={{ height: 45, width: "90%" }}
            mode="contained"
          >
            Pay Now
          </Button>
        </View>
      </View>
      <View></View>
    </View>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  navigation: {
    flex: 1,
  },
  body: {
    flex: 9.5,
  },
  footer: {
    flex: 1.5,
    padding: 10,
  },
  creditCard: {
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    width: "95%",
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 50,
    borderColor: "#D3D3D3",
    borderWidth: 5,
  },
  CardField: {
    width: "100%",
    height: 50,
    marginVertical: 30,
    fontSize: 14,
  },
  input: {
    height: 44,
    fontSize: 17,
    borderBottomColor: "#DEDEDE",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  CardFielddesi: {
    borderWidth: 0,
    backgroundColor: "white",
    borderColor: "#000",
    borderRadius: 8,
    fontSize: 14,
    justifyContent: "space-between",
  },
});
