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
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "../core/theme";
import { Block } from "galio-framework";
import ArButton from "../../Component/ArButton";
import Icon from "../../Component/Icon";
import Input from "../../Component/Input";
// import Images from "../constants/Images";
import argonTheme from "../../constants/Theme";
import Logo from "../components/Logo";
const { width, height } = Dimensions.get("screen");
import DatePicker from "react-native-datepicker";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { panValidator } from "../helpers/panValidator";
import TextInput from "../components/TextInput";
import { FancyAlert } from "react-native-expo-fancy-alerts";
import { useDispatch } from "react-redux";
import { ADD_TO_SELLER } from "../../feature/SellerSlice";
import * as ImagePicker from "expo-image-picker";

const SellerLogin = () => {
  const navigation = useNavigation();
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [pannumber, setPanNumber] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [date, setDate] = useState({ value: "", error: "" });
  const [phonenumber, setphonenumber] = useState({ value: "", error: "" });
  const [shopImage, setshopImage] = useState(null);

  const [textalert, settextalert] = useState("");
  const [alertcolor, setalertcolor] = useState("");
  const [visible, setVisible] = useState(false);
  const toggleAlert = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  useEffect(() => {
    async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };
  }, []);

  const dispatch = useDispatch();

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

  const onSignUpPressed = () => {
    console.log("Hello world");
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const pannumberError = panValidator(pannumber.value);
    if (emailError || passwordError || nameError || pannumberError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setPanNumber({ ...pannumber, error: pannumberError });
      setalertcolor("red");
      settextalert("Please Fill All Correct Data");
      toggleAlert();
      return;
    } else {
      dispatch(
        ADD_TO_SELLER({
          name,
          email,
          pannumber,
          date,
          phonenumber,
          password,
          shopImage,
        })
      );
      navigation.navigate("Instruction", {
        card: "true",
        val: 1,
      });
    }
  };

  return (
    <SafeAreaProvider >
      <ScrollView>
        <ImageBackground
          source={require("../assets/background_dot.png")}
          resizeMode="repeat"
          style={styles.background}
        >
          <Block
            flex
            center
            style={{ justifyContent: "center", marginTop: 10 }}
          >
            <Logo />
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior="padding"
              enabled
            >
              <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                <TextInput
                  label="Name"
                  returnKeyType="next"
                  value={name.value}
                  onChangeText={(text) => setName({ value: text, error: "" })}
                  error={!!name.error}
                  errorText={name.error}
                />
              </Block>
              <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                <TextInput
                  label="Pan Number"
                  returnKeyType="next"
                  onChangeText={(text) =>
                    setPanNumber({ value: text, error: "" })
                  }
                  value={pannumber.value}
                  error={!!pannumber.error}
                  errorText={pannumber.error}
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
                  value={email.value}
                  onChangeText={(text) => setEmail({ value: text, error: "" })}
                  error={!!email.error}
                  errorText={email.error}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                />
              </Block>
              <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                <TextInput
                  label="Password"
                  returnKeyType="done"
                  value={password.value}
                  onChangeText={(text) =>
                    setPassword({ value: text, error: "" })
                  }
                  error={!!password.error}
                  errorText={password.error}
                  secureTextEntry
                />
              </Block>
              <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                <TextInput
                  label="Phone Number"
                  returnKeyType="next"
                  value={phonenumber.value}
                  onChangeText={(text) =>
                    setphonenumber({ value: text, error: "" })
                  }
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
              >
                <DatePicker
                  style={styles.datePickerStyle}
                  date={date.value}
                  mode="date"
                  placeholder="Select Your Birth Date"
                  format="DD/MM/YYYY"
                  minDate="01-01-1980"
                  maxDate="01-01-2050"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: "absolute",
                      right: -5,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      borderColor: "gray",
                      alignItems: "flex-start",
                      borderWidth: 0,
                      borderBottomWidth: 1,
                    },
                    placeholderText: {
                      fontSize: 17,
                      color: "gray",
                    },
                    dateText: {
                      fontSize: 17,
                    },
                  }}
                  onDateChange={(date) => {
                    setDate({ value: date, error: "" });
                  }}
                />
              </Block>
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
                  onPress={() => onSignUpPressed()}
                >
                  NEXT STEP
                </Button>
              </Block>
            </KeyboardAvoidingView>

            <FancyAlert
              visible={visible}
              icon={
                <TouchableOpacity
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: `${alertcolor}`,
                    borderRadius: 50,
                    width: "100%",
                  }}
                  onPress={() => toggleAlert()}
                >
                  <View
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: `${alertcolor}`,
                      borderRadius: 50,
                      width: "100%",
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://img.icons8.com/pastel-glyph/64/000000/checked--v2.png",
                      }}
                      style={{
                        width: "90%",
                        height: "100%",
                        borderColor: "white",
                        borderRadius: 50,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              }
              style={{ backgroundColor: "white" }}
            >
              <Text style={{ marginTop: -16, marginBottom: 32 }}>
                {textalert}
              </Text>
            </FancyAlert>
          </Block>
        </ImageBackground>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default SellerLogin;

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
