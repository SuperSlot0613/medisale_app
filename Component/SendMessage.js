import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {useTailwind} from 'tailwind-rn';


const SendMessage = ({ message }) => {
  const tw = useTailwind();
  return (
    <View
      style={[
        tw("bg-purple-600 rounded-lg rounded-te-none px-5 py-3 mx-3 my-2"),
        { alignSelf: "flex-start", marginLeft: "auto" },
      ]}
    >
      <Text style={tw("text-white")}>{message.message}</Text>
    </View>
  );
};

export default SendMessage;

const styles = StyleSheet.create({});
