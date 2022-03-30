import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Menu from "./Menu";
import { AuthProvider } from "./Hooks/useAuth";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { store, persistor } from "./Store/store";
import { PersistGate } from "redux-persist/integration/react";
import { StripeProvider } from "@stripe/stripe-react-native";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StripeProvider
          publishableKey="pk_test_51J1XdTSDeAiXyTkgBNUMtGq6tvOz0yxAUMjoYKr0CXfSmzZjrUm1eA77irtXUpldQcor1V6k39PCVcj0hMJdU2IJ00mmMY9knC"
          // merchantIdentifier="expo.host.medisale"
          // threeDSecureParams={{
          //   backgroundColor: "#fff",
          //   timeout: 3,
          // }}
        >
          <NavigationContainer>
            <SafeAreaProvider>
              <AuthProvider>
                <Menu />
              </AuthProvider>
            </SafeAreaProvider>
          </NavigationContainer>
        </StripeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
