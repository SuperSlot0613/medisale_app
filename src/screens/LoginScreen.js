import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import useAuth from "../../Hooks/useAuth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { ADD_TO_SELLER } from "../../feature/SellerSlice";
import { AsyncStorage } from "react-native";

export default function LoginScreen() {
  const route = useRoute();
  const { seller } = route.params;
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { signWithEmailId } = useAuth();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "Dashboard" }],
    });
  };

  const signWithEmailIdSeller = async ({ email, password }) => {
    console.log("This is seller login method");
    await AsyncStorage.getItem("loginInfo").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("loginInfo", "sellerlogin");
      }
    });
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(async (userCredential) => {
        var userinfo = userCredential.user;
        const docRef = doc(db, "userInfo", email);
        const docSnap = await getDoc(docRef);
        console.log("This is login screen data", docSnap.data());
        dispatch(ADD_TO_SELLER(docSnap.data()));
        navigation.navigate("SellerPages");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
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
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          if (seller === "true") {
            console.log("Login screen", seller);
            signWithEmailIdSeller({ email, password });
          } else {
            signWithEmailId({ email, password });
          }
        }}
      >
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
