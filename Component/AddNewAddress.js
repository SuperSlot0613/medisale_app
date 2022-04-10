import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Block } from "galio-framework";
import TextInput from "../src/components/TextInput";
import { useNavigation } from "@react-navigation/native";
import Button from "../src/components/Button";
const { width, height } = Dimensions.get("screen");
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserdata,
  ADD_TO_BASKET,
  ADD_TO_USERDATA,
  ADD_NEW_ADDRESS,
} from "../feature/navSlice";

const AddNewAddress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserdata);
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    phoneno: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });

  const handleData = () => {
    // console.log(userData);
    dispatch(ADD_NEW_ADDRESS(userData));
    navigation.goBack();
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: "#E0F7FA" }}>
      <ScrollView style={{ height: 200 }}>
        <Block flex center style={{ justifyContent: "center", marginTop: 10 }}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
              <TextInput
                label="Enter Your Name"
                returnKeyType="next"
                value={userData.name}
                onChangeText={(text) =>
                  setuserData({ ...userData, name: text })
                }
              />
            </Block>
            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
              <TextInput
                type="number"
                label="Enter Your Phone Number"
                returnKeyType="next"
                onChangeText={(text) =>
                  setuserData({ ...userData, phoneno: text })
                }
                value={userData.phoneno}
                dataDetectorTypes="phoneNumber"
                textContentType="Number"
                keyboardType="number-pad"
              />
            </Block>
            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
              <TextInput
                label="Email"
                returnKeyType="next"
                value={userData.value}
                onChangeText={(text) =>
                  setuserData({ ...userData, email: text })
                }
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
            </Block>
            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
              <TextInput
                label="Address"
                returnKeyType="next"
                value={userData.address}
                onChangeText={(text) =>
                  setuserData({ ...userData, address: text })
                }
              />
            </Block>
            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
              <TextInput
                type="pincode"
                label="Enter Your Pine Code"
                returnKeyType="next"
                onChangeText={(text) =>
                  setuserData({ ...userData, pincode: text })
                }
                value={userData.pincode}
                dataDetectorTypes="phoneNumber"
                textContentType="Number"
                keyboardType="number-pad"
              />
            </Block>
            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
              <TextInput
                type="city"
                label="Enter Your City Name"
                returnKeyType="next"
                onChangeText={(text) =>
                  setuserData({ ...userData, city: text })
                }
                value={userData.city}
              />
            </Block>
            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
              <TextInput
                type="state"
                label="Enter Your State Name"
                returnKeyType="next"
                onChangeText={(text) =>
                  setuserData({ ...userData, state: text })
                }
                value={userData.state}
              />
            </Block>
            <Block middle>
              <Button
                style={{ width: 290, marginTop: 10 }}
                mode="contained"
                onPress={() => handleData()}
              >
                Add Address
              </Button>
            </Block>
          </KeyboardAvoidingView>
        </Block>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default AddNewAddress;

const styles = StyleSheet.create({});
