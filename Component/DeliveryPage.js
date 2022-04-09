import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Block } from "galio-framework";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "../src/components/Button";
import { selectUserAddress } from "../feature/navSlice";
import { useSelector } from "react-redux";
import useAuth from "../Hooks/useAuth";

const DeliveryPage = () => {
  const address = useSelector(selectUserAddress);
  const { user } = useAuth();
  const [addressdata, setaddressdata] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    for (let item of address) {
      let address = `${item.name}, ${item.street}, ${item.district}, ${item.city},${item.postalCode},${item.region}  `;

      setaddressdata(address);
    }
  }, []);

  return (
    <SafeAreaProvider style={{ backgroundColor: "#E0F7FA" }}>
      <Block flex={1} row={false}>
        <Text
          style={{
            marginLeft: 10,
            marginTop: 15,
            fontSize: 22,
            marginBottom: 8,
            fontWeight: "600",
          }}
        >
          Select Delivery Address
        </Text>
        <Block card flex={0.8} style={{ margin: 10, backgroundColor: "white" }}>
          <Block flex style={{ marginTop: 20, marginLeft: 50, width: "80%" }}>
            <Text style={{ fontSize: 22, color: "gray" }}>YOUR LOCATION </Text>
            <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 5 }}>
              {user.displayName}
            </Text>
            <Text style={{ fontSize: 18, marginTop: 5, fontWeight: "400" }}>
              {addressdata}
            </Text>
            <Text style={{ fontSize: 16, marginTop: 5, fontWeight: "400" }}>
              Phone Number : 9082502271
            </Text>
          </Block>
          <TouchableWithoutFeedback>
            <Block
              flex={1}
              row={false}
              style={{
                alignItems: "center",
                marginBottom: 20,
                marginTop: 30,
                margin: 20,
              }}
            >
              <Button
                style={{ height: 45, width: "100%", borderRadius: 10 }}
                mode="contained"
                onPress={() => navigation.navigate("Image Upload")}
              >
                Deliver To Address
              </Button>
              <Button
                style={{ height: 45, width: "100%", borderRadius: 10 }}
                mode="contained"
                onPress={() => {
                  navigation.navigate("Delivery");
                }}
              >
                Edit Address
              </Button>
              {/* <Button
                style={{ height: 45, width: "100%", borderRadius: 10 }}
                mode="contained"
              >
                Add Delivery Instruction
              </Button> */}
            </Block>
          </TouchableWithoutFeedback>
        </Block>
        <Block
          row={true}
          card
          flex={0.08}
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => navigation.navigate("AddAddress")}
          >
            <Block
              flex
              row={true}
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "500",
                  fontSize: 18,
                }}
              >
                Add a New Address
              </Text>
              <AntDesign
                style={{ marginLeft: 130 }}
                name="right"
                size={22}
                color="black"
              />
            </Block>
          </TouchableOpacity>
        </Block>
        {/* <Block
          row={true}
          card
          flex={0.08}
          style={{
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={{ marginLeft: 10 }}>
            <Block
              flex
              row={true}
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "500",
                  fontSize: 18,
                }}
              >
                Add a Pickup Point
              </Text>
              <AntDesign
                style={{ marginLeft: 130 }}
                name="right"
                size={22}
                color="black"
              />
            </Block>
          </TouchableOpacity>
        </Block> */}
      </Block>
    </SafeAreaProvider>
  );
};

export default DeliveryPage;

const styles = StyleSheet.create({});
