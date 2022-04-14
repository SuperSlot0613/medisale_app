import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { selectSellerData } from "../feature/SellerSlice";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const ChatScreenSell = () => {
  const sellerdata = useSelector(selectSellerData);
  // const [messages, setMessages] = useState([]);
  const { params } = useRoute();
  const [input, setinput] = useState("");
  const [messages, setmessages] = useState([]);
  const { matchDetails } = params;

  console.log("",matchDetails);
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "messaging", matchDetails.id, "message"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          // if (snapshot) {
          setmessages(
            snapshot.docs.map((doc) => ({
              _id: doc.id,
              ...doc.data(),
            }))
          );
          // }
        }
      ),
    [matchDetails, db]
  );
  console.log(messages);

  const sendMessage = (messages) => {
    addDoc(collection(db, "messaging", matchDetails.id, "message"), {
      _id: 2,
      text: messages[0].text,
      createdAt: serverTimestamp(),
      // name: sellerdata.name,
      user: {
        _id: 1,
        name: "React Native",
      },
    });
    setinput("");
  };

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //     {
  //       _id: 2,
  //       text: "Hello world",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //   ]);
  // }, []);

  const onSend = useCallback((messages = []) => {
    setmessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2e64e5",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        sendMessage(messages);
      }}
      user={{
        _id: 2,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreenSell;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
