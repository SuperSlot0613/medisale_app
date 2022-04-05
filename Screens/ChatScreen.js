import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatList from "../Component/ChatList";

const ChatScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:"white" }}>
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

export default ChatScreen;

const styles = StyleSheet.create({});
