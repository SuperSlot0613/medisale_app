import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { BottomSheet } from "react-native-btr";
import { Camera } from "expo-camera";
import { Block } from "galio-framework";
import Button from "../src/components/Button";
import { useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setPrescription } from "../feature/navSlice";
import { useNavigation } from "@react-navigation/native";

const UploadImage = () => {
  const cameraRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [showCamera, setshowCamera] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

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
      dispatch(setPrescription(result.uri));
      toggleBottomNavigationView();
    }
  };

  const takePhoto = async () => {
    if (cameraRef) {
      console.log("In take photo");
      try {
        let photo = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          aspects: [4, 3],
          quality: 1,
          base64: true,
        });
        return photo;
      } catch (e) {
        console.log(e);
      }
    }
  };

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {showCamera ? (
          <Camera
            style={styles.camera}
            type={type}
            flashMode={Camera.Constants.FlashMode.on}
            ref={cameraRef}
            autoFocus={Camera.Constants.AutoFocus.on}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <MaterialIcons
                  name="flip-camera-android"
                  size={44}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  const r = await takePhoto();
                  if (!r.cancelled) {
                    setImage(r.uri);
                    dispatch(setPrescription(r.uri));
                  }
                  setshowCamera(false);
                }}
              >
                <MaterialIcons name="camera" size={44} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => setshowCamera(false)}
              >
                <MaterialCommunityIcons
                  name="camera-off"
                  size={44}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <View>
            <Text
              style={{
                fontSize: 20,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Upload Image Of Prescription Of Medicien
            </Text>
            <Button
              onPress={() => {
                if (image === null) {
                  toggleBottomNavigationView();
                } else {
                  navigation.navigate("Payment");
                }
              }}
              style={{ width: 300 }}
              mode="contained"
            >
              {image === null ? "Upload Image" : "Next Step"}
            </Button>
          </View>
        )}
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}
        >
          <Block flex={0.5} row={false} style={styles.bottomNavigationView}>
            <Text style={{ color: "black", fontWeight: "600", fontSize: 22 }}>
              Share Your Prescription
            </Text>
            <Button style={{ width: 300 }} mode="contained" onPress={pickImage}>
              Pick Image
            </Button>
            <Button
              style={{ width: 300 }}
              mode="contained"
              onPress={() => {
                toggleBottomNavigationView();
                setshowCamera(true);
              }}
            >
              Take A Image
            </Button>
            <Button
              onPress={toggleBottomNavigationView}
              style={{ width: 300 }}
              mode="contained"
            >
              Cancel
            </Button>
          </Block>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0F7FA",
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 250,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 15,
    justifyContent: "space-between",
    // alignItems:"center"
  },
  button: {
    flex: 0.4,
    alignSelf: "flex-end",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-evenly",
    paddingBottom: 20,
  },
});
