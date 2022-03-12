import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { HeaderHeight } from "../constants/utils";
import ArButton from "../Component/ArButton";

const { width, height } = Dimensions.get("screen");
import argonTheme from "../constants/Theme";
import useAuth from "../Hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const thumbMeasure = (width - 48 - 32) / 3;

const Profile = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={require("../assets/profile-screen-bg.png")}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: "25%" }}
          >
            <Block flex style={styles.profileCard}>
              <Block middle style={styles.avatarContainer}>
                <Image
                  source={{
                    uri: user.photoURL
                  }}
                  style={[styles.avatar]}
                  resizeMode={"cover"}
                />
              </Block>
              <Block style={styles.info}>
                <Block
                  middle
                  row
                  space="evenly"
                  style={{ marginTop: 20, paddingBottom: 24 }}
                >
                  <ArButton
                    small
                    style={{ backgroundColor: argonTheme.COLORS.INFO }}
                    onPress={() => navigation.navigate("BuyAgain")}
                  >
                    Buy Again
                  </ArButton>
                  <ArButton
                    small
                    style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                  >
                    FeedBack
                  </ArButton>
                </Block>
                <Block row space="between">
                  <Block middle>
                    <Text
                      bold
                      size={18}
                      color="#525F7F"
                      style={{ marginBottom: 4 }}
                    >
                      2
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>
                      Orders
                    </Text>
                  </Block>
                  <Block middle>
                    <Text
                      bold
                      color="#525F7F"
                      size={18}
                      style={{ marginBottom: 4 }}
                    >
                      2
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>
                      WhishList
                    </Text>
                  </Block>
                  <Block middle>
                    <Text
                      bold
                      color="#525F7F"
                      size={18}
                      style={{ marginBottom: 4 }}
                    >
                      89
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>
                      Comments
                    </Text>
                  </Block>
                </Block>
              </Block>
              <Block flex>
                <Block middle style={styles.nameInfo}>
                  <Text bold size={28} color="#32325D">
                    {user.displayName}, 20
                  </Text>
                  <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                    Mumbai, India
                  </Text>
                </Block>
                <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                  <Block style={styles.divider} />
                </Block>
                <Block middle>
                  <Text size={16} color="black" style={{ textAlign: "center" }}>
                    LaxmiNager,Thakur Village,Kandivali(E),Mumbai-400101
                  </Text>
                  <ArButton
                    color="transparent"
                    textStyle={{
                      color: "#525F7F",
                      fontWeight: "500",
                      fontSize: 17
                    }}
                  >
                    Change Address
                  </ArButton>
                </Block>
                <Block row space="between">
                  <ArButton
                    small
                    color="transparent"
                    textStyle={{
                      color: "#525F7F",
                      fontSize: 16
                      // marginTop: 12
                    }}
                    onPress={() => navigation.navigate("YourOrders")}
                  >
                    Orders
                  </ArButton>
                  <ArButton
                    small
                    color="transparent"
                    textStyle={{
                      color: "#525F7F",
                      fontSize: 16,
                      marginLeft: 2
                    }}
                    onPress={() => navigation.navigate("YourWishList")}
                  >
                    WishList
                  </ArButton>
                </Block>
              </Block>
            </Block>
          </ScrollView>
        </ImageBackground>
      </Block>
    </Block>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 144,
    height: 154,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});
