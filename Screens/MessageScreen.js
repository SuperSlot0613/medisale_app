import { useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import Header from "../component/Header";
import useAuth from "../Hooks/useAuth";
import getMathchedUserInfo from "../Component/getMatchesUserInfo";
import { useTailwind } from "tailwind-rn";
import SendMessage from "../Component/SendMessage";
import ReciverMessage from "../Component/ReciverMessage";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../firebase";
import TextInput from "../src/components/TextInput";

const MessageScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const [input, setinput] = useState("");
  const [messages, setmessages] = useState([]);
  const tw = useTailwind();

  const { matchDetails } = params;
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "messaging", matchDetails.id, "message"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setmessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchDetails, db]
  );

  // console.log(messages);

  // console.log(getMathchedUserInfo(matchDetails.users, user.uid).displayName)

  const sendMessage = () => {
    addDoc(collection(db, "messaging", matchDetails.id, "message"), {
      timestamp: serverTimestamp(),
      userId: user.email,
      displayName: user.displayName,
      message: input,
    });
    setinput("");
  };

  return (
    <SafeAreaView style={[tw("flex-1"),{ marginTop: 450 }]}>
      {/* <Header
        title={getMathchedUserInfo(matchDetails?.users, user.uid).displayName}
        callEnabled
      /> */}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[tw("flex-1")]}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            style={[tw("pl-4")]}
            data={messages}
            keyExtractor={(item) => item.id}
            inverted={-1}
            renderItem={({ item: message }) =>
              message.userId === user.email ? (
                <SendMessage key={message.id} message={message} />
              ) : (
                <ReciverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>
        <View
          style={tw(
            "flex-row justify-between bg-white items-center border-t border-gray-200 px-5 py-2"
          )}
        >
          <TextInput
            label="Send Message..."
            style={[tw("h-5 text-lg"),{height:40}]}
            returnKeyType="next"
            onChangeText={setinput}
            value={input}
            onSubmitEditing={sendMessage}
          />
          <Button onPress={sendMessage} title="Send" color="#FF5864" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({});
