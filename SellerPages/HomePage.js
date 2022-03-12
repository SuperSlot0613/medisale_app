import { StyleSheet, Text, View } from "react-native";
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

const HomePage = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const sellerdata = useSelector(selectSellerData);
  const document = useSelector(selectDocumentImage);
  const faceImage = useSelector(selectUserImage);
  console.log(sellerdata[0]);
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
    <View>
      <Text>HomePage</Text>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
