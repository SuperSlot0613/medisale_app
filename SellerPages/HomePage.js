import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
} from "react-native";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { Block, theme } from "galio-framework";
import Button from "../src/components/Button";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const HomePage = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const sellerdata = useSelector(selectSellerData);
  const document = useSelector(selectDocumentImage);
  const faceImage = useSelector(selectUserImage);
  const navigation = useNavigation();
  // console.log(sellerdata);
  // console.log(faceImage);
  const [orderdata, setorderdata] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       Alert.alert("Permission to access location was denied");
  //       return;
  //     }
  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //     dispatch(ADD_LOCATION(location.coords));
  //     setDoc(doc(db, "sellerInfo", sellerdata.email.value), {
  //       name: sellerdata.name.value,
  //       email: sellerdata.email.value,
  //       PanCard: sellerdata.pannumber.value,
  //       PhoneNumber: sellerdata.phonenumber.value,
  //       Dateofbirth: sellerdata.date.value,
  //       DocumentImage: document,
  //       userImage: faceImage,
  //       location: location.coords,
  //       photourl: sellerdata.shopImage,
  //     });
  //   })();
  // }, []);

  // console.log(sellerdata);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "sellerInfo", sellerdata?.email, "orders"),
        orderBy("timestamp", "asc")
      ),
      (snapshot) => {
        if (snapshot) {
          setorderdata(
            snapshot?.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }
      }
    );
  }, []);

  console.log(orderdata);

  return (
    <SafeAreaView>
      <ScrollView>
        {orderdata.length === 0 ? null : (
          <FlatList
            data={orderdata !== null ? orderdata : null}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Block key={index} flex={1} row={false}>
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
                  <Block
                    style={{ flex: 0.7, alignItems: "center", marginTop: 10 }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        marginBottom: 5,
                      }}
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
                      <Text style={{ fontSize: 16 }}>
                        {item?.usersInfo.name}
                      </Text>
                      <Text style={{ fontSize: 12, fontWeight: "400" }}>
                        Order_Id:{item?.payment.paymentId}
                      </Text>
                      <Text style={{ fontSize: 16, fontWeight: "400" }}>
                        {" "}
                        Number Of Items : {item?.basket.length}
                      </Text>
                      <Text style={{ fontSize: 16, fontWeight: "400" }}>
                        {" "}
                        Amount : {item?.payment.amount}
                      </Text>
                      <Text style={{ fontSize: 14, fontWeight: "400" }}>
                        {new Date(
                          item?.timestamp.seconds * 1000 +
                            item?.timestamp.nanoseconds / 1000000
                        ).toDateString() +
                          " " +
                          new Date(
                            item?.timestamp.seconds * 1000 +
                              item?.timestamp.nanoseconds / 1000000
                          ).toLocaleTimeString()}
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
                        navigation.navigate("DeliverySell", {
                          usersInfo: item?.usersInfo,
                          paymentInfo: item?.payment,
                        });
                      }}
                    >
                      Dispatch
                    </Button>
                    <Button
                      onPress={() => {
                        navigation.navigate("OrderInfo", {
                          basket: item?.basket,
                          usersInfo: item?.usersInfo,
                          prescription: item?.prescription,
                        });
                      }}
                      mode="contained"
                      style={{ width: 120 }}
                    >
                      View
                    </Button>
                  </Block>
                </Block>
              </Block>
            )}
          />
        )}
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
