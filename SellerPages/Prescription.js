import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import * as ImageManipulator from "expo-image-manipulator";
import { SafeAreaView } from "react-native-safe-area-context";

const Prescription = () => {
  const route = useRoute();
  const { Images } = route.params;
  console.log(Images);

  return (
    <SafeAreaView>
      <View style={{ flex: 1,alignItems: "center"}}>
        <Image
          style={{ width: 350, height: 400 }}
          source={{ uri: Images }}
          resizeMode="center"
        />
        <Text>Hello</Text>
      </View>
    </SafeAreaView>
  );
};

export default Prescription;

const styles = StyleSheet.create({});
