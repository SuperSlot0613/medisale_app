import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Menu from "./Menu";
import { AuthProvider } from "./Hooks/useAuth";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
import { Provider } from "react-redux";
import { store, persistor } from "./Store/store";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <SafeAreaProvider>
            <AuthProvider>
              <Menu />
            </AuthProvider>
          </SafeAreaProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
