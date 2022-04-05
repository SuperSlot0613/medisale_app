import React,{ useEffect, useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import useAuth from "../Hooks/useAuth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const Orders = () => {

  const {user}= useAuth();

  const [order, setorderdata] = useState([])

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "userInfo", user.email, "orders"),
        orderBy("timestamp", "asc")
      ),
      (snapshot) =>
        setorderdata(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
  }, []);

  console.log(order)

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Your Odrers</Text>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});
