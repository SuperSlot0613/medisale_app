import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatForSeller = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* <ChatList /> */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "400" }}>Comming Soon</Text>
      </View>
    </SafeAreaView>
  );
};

export default ChatForSeller;

const styles = StyleSheet.create({});
