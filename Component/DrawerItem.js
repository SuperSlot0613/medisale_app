import React from "react";
import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Block, Text, theme } from "galio-framework";

// import Icon from "./Icon";
import argonTheme from "../constants/Theme";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  AntDesign,
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import useAuth from "../Hooks/useAuth";

const DrawerItem = (props) => {
  const renderIcon = () => {
    const { title, focused } = props;

    switch (title) {
      case "Home":
        return (
          <Ionicons
            name="home-outline"
            size={24}
            color={focused ? "white" : argonTheme.COLORS.PRIMARY}
          />
        );
      // case "Recommended":
      //   return (
      //     <FontAwesome5
      //       name="elementor"
      //       size={24}
      //       color={focused ? "white" : argonTheme.COLORS.ERROR}
      //     />
      //   );
      case "Your Account":
        return (
          <AntDesign
            name="user"
            size={24}
            color={focused ? "white" : argonTheme.COLORS.INFO}
          />
        );
      case "Your Orders":
        return (
          <SimpleLineIcons
            name="basket-loaded"
            size={24}
            color={focused ? "white" : argonTheme.COLORS.HEADER}
          />
        );
      case "Your Wish List":
        return (
          <Fontisto
            name="shopping-basket-add"
            size={24}
            color={focused ? "white" : argonTheme.COLORS.WARNING}
          />
        );
      case "Buy Again":
        return (
          <MaterialCommunityIcons
            name="purse-outline"
            size={24}
            color={focused ? "white" : argonTheme.COLORS.LABEL}
          />
        );
      case "Chat":
        return (
          <AntDesign
            name="message1"
            size={24}
            color={focused ? "white" : argonTheme.COLORS.WARNING}
          />
        );
      case "Log Out":
        return <AntDesign name="logout" size={24} color="black" />;
      default:
        return null;
    }
  };

  const { focused, title, navigation } = props;
  const { signOutPage } = useAuth();

  const containerStyles = [
    styles.defaultStyle,
    focused ? [styles.activeStyle, styles.shadow] : null,
  ];

  return (
    <TouchableOpacity
      style={{ height: 60 }}
      onPress={() => {
        if (title === "Log Out") {
          signOutPage();
        } else {
          navigation.navigate(title.replace(/ /g, ""));
        }
      }}
    >
      <Block flex row style={containerStyles}>
        <Block middle flex={0.2} style={{ marginRight: 5 }}>
          {renderIcon()}
        </Block>
        <Block row center flex={0.8}>
          <Text
            size={15}
            bold={focused ? true : false}
            color={focused ? "white" : "rgba(0,0,0,0.5)"}
          >
            {title}
          </Text>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: argonTheme.COLORS.ACTIVE,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
});

export default DrawerItem;
