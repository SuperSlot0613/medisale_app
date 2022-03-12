import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useNavigation } from "@react-navigation/native";

const OfferCard = ({ name, image, Oty, fills }) => {
  const cardContainer = [styles.card, styles.shadow];
  return (
    <Block card style={cardContainer}>
      <TouchableWithoutFeedback>
        <Block
          style={[
            { width: "100%", backgroundColor: "#fbbbb1", height: 90 },
            styles.horizontalStyles,
            styles.verticalStyles
          ]}
        >
          <Text
            style={{
              marginTop: 15,
              marginLeft: 20,
              fontSize: 34,
              color: "white"
            }}
          >
            8:00 AM
          </Text>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 16,
              color: "white"
            }}
          >
            Daily
          </Text>
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Block flex row={false} style={[styles.cardDescription]}>
          <Block flex>
            <Image
              source={{
                uri: image
              }}
              style={{ width: 40, height: 40, marginLeft: 10 }}
            />
          </Block>
          <Block flex row={false} style={{ marginLeft: 10, height: 40 }}>
            <Text size={20} style={styles.cardTitle}>
              {name}
            </Text>
          </Block>
          <Block flex row style={{ justifyContent: "space-evenly" }}>
            <Block row={false} style={{}}>
              <Text style={{ color: "gray" }}>QTY</Text>
              <Text>
                {Oty} days
              </Text>
            </Block>
            <Block row={false}>
              <Text style={{ color: "gray" }}>Fiils</Text>
              <Text>
                {fills} left
              </Text>
            </Block>
          </Block>
          <Block
            flex
            style={{
              margin: "auto",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity style={styles.takenbutton}>
              <Text
                style={{
                  paddingLeft: 25,
                  paddingRight: 25,
                  paddingTop: 6,
                  paddingBottom: 6,
                  fontSize: 18,
                  color:"#52939a"
                }}
              >
                Marks As Taken
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  );
};

export default OfferCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 240,
    marginRight: 20,
    marginLeft:15,
    width: 220
  },
  cardTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
    fontWeight: "700"
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  horizontalStyles: {
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  verticalStyles: {
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4
  },
  takenbutton: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#eeeff1"
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2
  }
});