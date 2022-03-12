import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Block } from "galio-framework";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const DeliveryPage = () => {
  const navigation = useNavigation();

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
            <Text style={{ fontSize: 22, color: "gray" }}>RECENTLY USED</Text>
            <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 5 }}>
              Saurabh Yadav
            </Text>
            <Text style={{ fontSize: 18, marginTop: 5, fontWeight: "400" }}>
              room no:2, Subhash Chawl, Laxminagar Akurli Road, Damunagar,
              Kandivali East Mumbai, Maharashtra,400101, India
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
              <TouchableOpacity
                style={{ width: "100%", marginBottom: 15 }}
                onPress={() => navigation.navigate("Image Upload")}
              >
                <Block
                  style={[
                    {
                      width: 300,
                      height: 50,
                      backgroundColor: "#0c707d",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                    },
                    styles.shadow,
                  ]}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: 22,
                    }}
                  >
                    Deliver to this address
                  </Text>
                </Block>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "100%", marginBottom: 15 }}>
                <Block
                  card
                  style={[
                    {
                      width: 300,
                      height: 40,
                      backgroundColor: "white",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                    },
                    styles.shadow,
                  ]}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "500",
                      fontSize: 18,
                    }}
                  >
                    Edit Address
                  </Text>
                </Block>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "100%", marginBottom: 22 }}>
                <Block
                  card
                  style={[
                    {
                      width: 300,
                      height: 40,
                      backgroundColor: "white",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                    },
                    styles.shadow,
                  ]}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "500",
                      fontSize: 18,
                    }}
                  >
                    Add Delivery Instruction
                  </Text>
                </Block>
              </TouchableOpacity>
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
        <Block
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
        </Block>
      </Block>
    </SafeAreaProvider>
  );
};

export default DeliveryPage;

const styles = StyleSheet.create({});
