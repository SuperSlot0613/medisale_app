import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Block } from "galio-framework";
import { theme } from "../src/core/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("screen");
import TextInput from "../src/components/TextInput";
import Button from "../src/components/Button";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-datepicker";
import argonTheme from "../constants/Theme";
import * as ImagePicker from "expo-image-picker";

const Advertisment = () => {

    const [shopImage, setshopImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(result);
    
        if (!result.cancelled) {
          setshopImage(result.uri);
        }
      };

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <Block flex center style={{ justifyContent: "center", marginTop: 10 }}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
              <TextInput
                label="Disscount Persentage(in %)"
                returnKeyType="next"
                // value={name.value}
                // onChangeText={(text) => setName({ value: text, error: "" })}
              />
            </Block>
            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
              <TextInput
                label="Pan Number"
                returnKeyType="next"
                // onChangeText={(text) =>
                //   setPanNumber({ value: text, error: "" })
                // }
                // value={pannumber.value}
                autoCapitalize="characters"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
            </Block>
            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
              <TextInput
                label="Email"
                returnKeyType="next"
                // value={email.value}
                // onChangeText={(text) => setEmail({ value: text, error: "" })}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
            </Block>
            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
              <TextInput
                label="Number Of Date"
                returnKeyType="next"
                // value={phonenumber.value}
                // onChangeText={(text) =>
                //   setphonenumber({ value: text, error: "" })
                // }
                autoCapitalize="none"
                keyboardType="number-pad"
              />
            </Block>
            <Block
              width={width * 0.8}
              style={{
                marginBottom: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Block>
            <Block middle>
              <Button
                style={{ width: 300, marginTop: 30 }}
                mode="contained"
                onPress={() => pickImage()}
              >
                Upload Your Shop Image
              </Button>
            </Block>
            <Block middle>
              <Button
                style={{ width: 300, marginTop: 30 }}
                mode="contained"
                // onPress={() => onSignUpPressed()}
              >
                NEXT STEP
              </Button>
            </Block>
          </KeyboardAvoidingView>
        </Block>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Advertisment;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
    position: "relative",
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA",
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
  datePickerStyle: {
    width: 280,
  },
  shadow: {
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
  },
});
