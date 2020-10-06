import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Dimensions } from "react-native";

class GalleryImage extends Component {
  render() {
    return (
      <View
        style={{
          width: this.props.width / 2 - 40,
          height: this.props.width / 2 - 20,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "contain",
            }}
            source={ this.props.imageUri }
          />
        </View>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            paddingLeft: 10,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "bold", color: "#4f3c75" }}>
            {this.props.name}
          </Text>
        </View>
      </View>
    );
  }
}
export default GalleryImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
