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

const ProfilePage = () => {
  const [image, setImage] = useState("");

  const navigation = useNavigation();

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
      userImageSet(result.uri);
      setDoc(doc(db, "registerUser", userDetails.id), {
        id: userDetails.id,
        Name: userDetails.Name,
        email: userDetails.email,
        password: userDetails.password,
        mobile: userDetails.mobile,
        image: result.uri,
        timestamp: serverTimestamp(),
      });
    }
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
          {image === "" ? (
            <Avatar
              rounded
              icon={{ name: "adduser", type: "antdesign" }}
              size="xlarge"
              activeOpacity={0.7}
              containerStyle={{ position: "relative", zIndex: 10 }}
              onPress={pickImage}
            />
          ) : (
            <Avatar
              rounded
              source={{
                uri: image,
              }}
              size="xlarge"
              activeOpacity={0.7}
              containerStyle={{ position: "relative", zIndex: 10 }}
              onPress={pickImage}
            />
          )}
        </View>
      </View>
      <View
        style={[
          tw`flex-1 items-center justify-center`,
          { width: "100%", height: "100%", zIndex: 5 },
        ]}
      >
        <View
          style={[
            tw`flex-col bg-gray-100`,
            styles.shadowProp,
            styles.card,
            { width: "100%", height: "100%" },
          ]}
        >
          <View
            style={[
              tw`flex-row m-2 mt-10 justify-between`,
              { alignItems: "center" },
            ]}
          >
            <TouchableOpacity>
              <Text style={{ fontSize: 14, color: "orange" }}>
                view User Info
              </Text>
            </TouchableOpacity>
          </View>
          {/* <FlatList
            data={Data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  tw("flex-row items-center m-2 p-1"),
                  {
                    fontSize: 14,
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                ]}
                Key={item.id}
              >
                <Text>{item.text1} :</Text> */}
          {/* {item.text1 === "Email Id" || item.text1 === "Mobile No" ? (
                  <TextInput value={item.text2} style={tw("text-blue-400")} />
                ) : (
                )} */}
          {/* <Text style={[tw("text-blue-500 "), { width: "50%" }]}>
                  {item.text2}
                </Text>
              </View>
            )}
          /> */}
        </View>
      </View>
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
