import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from "react-native";
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
import { nameValidator } from "../helpers/nameValidator";
import useAuth from "../../Hooks/useAuth";
import { Block } from "galio-framework";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FancyAlert } from "react-native-expo-fancy-alerts";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const [visible, setVisible] = useState(false);
  const toggleAlert = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const { registerWithEmailId } = useAuth();

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    toggleAlert()
    registerWithEmailId({ name, email, password });
  };

  return (
    <SafeAreaProvider>
      <Background>
        <KeyboardAvoidingView behavior="padding" enabled>
          <BackButton goBack={navigation.goBack} />
          <Block
            style={{ flex: 1, width: 300, alignItems: "center", marginTop: 50 }}
          >
            <Logo />
            <Header>Create Account</Header>
            <TextInput
              label="Name"
              returnKeyType="next"
              value={name.value}
              onChangeText={(text) => setName({ value: text, error: "" })}
              error={!!name.error}
              errorText={name.error}
            />
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
            <Button
              mode="contained"
              onPress={() => onSignUpPressed()}
              style={{ marginTop: 24 }}
            >
              Sign Up
            </Button>
            <Block style={styles.row}>
              <Text>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.replace("LoginScreen")}
              >
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </Block>
          </Block>
          <FancyAlert
            visible={visible}
            icon={
              <TouchableOpacity
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "green",
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
                    backgroundColor: "green",
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
              You Are Login Successfully
            </Text>
          </FancyAlert>
        </KeyboardAvoidingView>
      </Background>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
});
