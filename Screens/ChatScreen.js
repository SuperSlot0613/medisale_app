import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatList from "../Component/ChatList";

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
