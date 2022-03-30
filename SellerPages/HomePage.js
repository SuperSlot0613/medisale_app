import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_LOCATION,
  selectDocument,
  selectDocumentImage,
  selectFaceImage,
  selectSellerData,
  selectUserImage,
} from "../feature/SellerSlice";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Block, theme } from "galio-framework";
import Button from "../src/components/Button";

const HomePage = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const sellerdata = useSelector(selectSellerData);
  const document = useSelector(selectDocumentImage);
  const faceImage = useSelector(selectUserImage);
  // console.log(document);
  // console.log(faceImage);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      dispatch(ADD_LOCATION(location.coords));
      setDoc(doc(db, "sellerInfo", sellerdata[0].email.value), {
        name: sellerdata[0].name.value,
        email: sellerdata[0].email.value,
        PanCard: sellerdata[0].pannumber.value,
        PhoneNumber: sellerdata[0].phonenumber.value,
        Dateofbirth: sellerdata[0].date.value,
        DocumentImage: document,
        userImage: faceImage,
        location: location.coords,
        photourl: sellerdata[0].shopImage,
      });
    })();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Block flex={1} row={false}>
          <Block
            row={true}
            card
            style={[
              {
                width: "95%",
                height: 200,
                margin: 8,
                backgroundColor: "white",
                justifyContent: "space-evenly",
              },
              styles.shadow,
            ]}
          >
            <Block style={{ flex: 0.7, alignItems: "center", marginTop: 10 }}>
              <Text
                style={{ fontSize: 20, fontWeight: "600", marginBottom: 5 }}
              >
                Coustmore Details
              </Text>
              <View
                style={{
                  flex: 1,
                  margin: 5,
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ fontSize: 16 }}>Saurabh Yadav</Text>
                <Text style={{ fontSize: 12, fontWeight: "400" }}>
                  Order_Id:jasbchbdhsdcsdcjsi
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "400" }}>
                  {" "}
                  Number Of Items : 2
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "400" }}>
                  {" "}
                  Amount : 399
                </Text>
              </View>
            </Block>
            <Block
              style={{
                flex: 0.5,
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                mode="contained"
                style={{ width: 120 }}
                onPress={() => {
                  console.log("Hello user");
                }}
              >
                Dispatch
              </Button>
              <Button mode="contained" style={{ width: 120 }}>
                View
              </Button>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
