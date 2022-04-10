import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Alert, AsyncStorage } from "react-native";
import * as Google from "expo-google-app-auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import * as Location from "expo-location";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { ADD_TO_SELLER } from "../feature/SellerSlice";

const config = {
  iosClientId:
    "896596955092-8a0cn9s3ea93ffdtn89180055q2st73a.apps.googleusercontent.com",
  androidClientId:
    "896596955092-qo2rj29lhmj10mn0iieqom4u26006am0.apps.googleusercontent.com",
  scops: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(
    () =>
      AsyncStorage.getItem("alreadyLaunched").then((value) => {
        if (value == null) {
          AsyncStorage.setItem("alreadyLaunched", "true");
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      }),
    []
  );

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, "sellerInfo", user.email);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // console.log("This seller data", docSnap.data());
            dispatch(ADD_TO_SELLER(docSnap.data()));
            navigation.navigate("SellerPages");
          } else {
            const docRef = doc(db, "userInfo", user.email);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              user.displayName = docSnap.data().name;
              user.photoURL = docSnap.data().photourl;
            }
            setuser(user);
            // console.log("This is user auth function", user);
          }
        } else {
          setuser(null);
        }
      }),
    []
  );

  const removeAsyncStorage = () => {
    AsyncStorage.clear();
    // console.log("remove Asyn");
  };

  const registerWithEmailId = ({ name, email, password }) => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        var user = userCredential.user;
        // console.log(user);
        user.displayName = name.value;
        setuser(user);
        setDoc(doc(db, "userInfo", `${email.value}`), {
          name: name.value,
          email: email.value,
          photourl: "",
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  const signWithEmailId = async ({ email, password }) => {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(async (userCredential) => {
        var userinfo = userCredential.user;
        const docRef = doc(db, "userInfo", userinfo.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          userinfo.displayName = docSnap.data().name;
          userinfo.photoURL = docSnap.data().photourl;
        }
        // console.log("This login time data", userinfo.displayName);
        setuser(userinfo);
      })
      .catch((error) => {
        const errorCode = error.code;
        // console.log(errorCode);
        const errorMessage = error.message;
        // console.log(errorMessage);
      });
  };

  const signWithGoogleId = async () => {
    await Google.logInAsync(config)
      .then(async (logInResult) => {
        if (logInResult.type === "success") {
          // console.log(logInResult)
          const { idToken, accessToken } = logInResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credential);
        }

        return Promise.reject();
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("LOgin Finally"));
  };

  const signOutPage = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setuser(null);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const memoValue = useMemo(
    () => ({
      user,
      isFirstLaunch,
      setIsFirstLaunch,
      signWithGoogleId,
      signOutPage,
      signWithEmailId,
      registerWithEmailId,
      removeAsyncStorage,
    }),
    [user, isFirstLaunch]
  );

  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
