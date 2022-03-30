import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { Avatar } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { EMPTY_SELLER, selectSellerData } from "../feature/SellerSlice";
import { Block } from "galio-framework";
import Button from "../src/components/Button";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { AsyncStorage } from "react-native";

const ProfilePage = () => {
  const [image, setImage] = useState("");
  const sellerInfo = useSelector(selectSellerData);
  const [data, setdata] = useState(sellerInfo[0]);
  const navigation = useNavigation();
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
      setImage(result.uri);
      const imageupdate = doc(db, "sellerInfo", data.email);
      await updateDoc(imageupdate, {
        userImage: result.uri,
      });
    }
  };

  const signOutPage = async () => {
    signOut(auth)
      .then(() => {
        dispatch(EMPTY_SELLER());
        navigation.replace("OptionLogin");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <View style={tw`flex-1 items-center justify-between`}>
      <View
        style={[
          tw`items-center justify-center flex-col bg-blue-300`,
          { width: "100%", height: "20%", margin: "auto", zIndex: 10 },
        ]}
      >
        <View
          style={[
            tw`items-center mt-20 bg-gray-400 rounded-full`,
            { zIndex: 10 },
          ]}
        >
          <Avatar
            rounded
            source={{
              uri: data?.userImage,
            }}
            size="xlarge"
            activeOpacity={0.7}
            containerStyle={{ position: "relative", zIndex: 10 }}
            onPress={pickImage}
          />
        </View>
      </View>
      <Block
        card
        style={[
          tw`flex-1`,
          {
            width: "100%",
            height: "100%",
            zIndex: 5,
            justifyContent: "space-between",
          },
        ]}
      >
        <Block row={false} style={[tw`mt-10 ml-2 justify-between`]}>
          <TouchableOpacity>
            <Text style={{ fontSize: 14, color: "orange" }}>
              view User Info
            </Text>
          </TouchableOpacity>
          <Block
            row
            style={{
              marginTop: 15,
              marginLeft: 10,
              marginRight: 10,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "400" }}>Name : </Text>
            <Text style={{ fontSize: 16, fontWeight: "400" }}>{data.name}</Text>
          </Block>
          <Block
            row
            style={{
              marginTop: 15,
              marginLeft: 10,
              marginRight: 10,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "400" }}>Email : </Text>
            <Text style={{ fontSize: 16, fontWeight: "400" }}>
              {data.email}
            </Text>
          </Block>
          <Block
            row
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 15,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "400" }}>
              Phone No. :{" "}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "400" }}>
              {data.PhoneNumber}
            </Text>
          </Block>
          <Block
            row
            style={{
              marginTop: 15,
              marginLeft: 10,
              marginRight: 10,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "400" }}>Name : </Text>
            <Text style={{ fontSize: 16, fontWeight: "400" }}>
              {data.PanCard}
            </Text>
          </Block>
          <Block
            row
            style={{
              marginTop: 15,
              marginLeft: 10,
              marginRight: 10,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "400" }}>
              Date Of Birth :{" "}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "400" }}>
              {data.Dateofbirth}
            </Text>
          </Block>
          <Button
            style={{ width: 300, marginTop: 60, marginLeft: 22 }}
            mode="contained"
            onPress={() => signOutPage()}
          >
            LOG OUT
          </Button>
        </Block>
      </Block>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 14,
    marginVertical: 2,
  },
  shadowProp: {
    // borderColor:'yourchoice', // if you need
    borderWidth: 0.5,
    overflow: "hidden",
    shadowColor: "white",
    // shadowRadius: 10,
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.8,
  },
});
