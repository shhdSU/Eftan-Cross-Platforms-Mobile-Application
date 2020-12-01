import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class Category extends Component {
  render() {
    return (
      <View
        style={{
          height: 70,
          width: 110,
          marginLeft: 10,

          //  borderWidth: 0.5,
          //borderColor: "#dddddd",
        }}
      >
        <View style={{ flex: 2 }}>
          <Image
            source={this.props.imageUri}
            style={
              styles.imageStyly
              // flex: 1,
              // width: null,
              // height: null,
              // resizeMode: "cover",
            }
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text>{this.props.name}</Text>
        </View>
      </View>
    );
  }
} //comment
export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyly: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 50,
  },
});
