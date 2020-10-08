import firebase from "../database/firebase";
import React, { Component } from "react";
import { View, Text, Image } from "react-native";
var designGallery = [];

export default class Explore extends Component {
  constructor() {
    super();
    this.state = {
      designTitle: "",
      designDescription: "",
      category: "",
      designFileKey: "",
      designUrl: "",
      designUploadingdate: "",
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  readData = () => {
    var i = 0;
    var ref = firebase.database().ref("Designs/");
    ref.on("value", (snapshot) => {
      var design = snapshot.val();
      var designKeys = Object.keys(design);
      for (i = 0; i < designKeys.length; ++i) {
        var designInfo = designKeys[i];
        var categ = design[designInfo].category;
        var desDis = design[designInfo].designDescription;
        var desFileKey = design[designInfo].designFileKey;
        var desTitle = design[designInfo].designTitle;
        var desUploadingdate = design[designInfo].designUploadingdate;

        var ref1 = firebase
          .storage()
          .ref("DesignWork/" + design[designInfo].designFileKey)
          .getDownloadURL()
          .then((url) => {
            this.updateInputVal(url, "designUrl");
          });

        designGallery[i] = {
          category: categ,
          designDescription: desDis,
          designFileKey: desFileKey,
          designTitle: desTitle,
          designUploadingdate: desUploadingdate,
          designUrl: this.state.designUrl,
        };
        // console.log(designGallery.length);
      }
      // console.log(designGallery.length);
    });
    return designGallery.map((element) => {
      return (
        <View style={{ marginBottom: 30 }}>
          <View>
            <Image
              style={{ height: 180, width: 280 }}
              source={{ uri: element.designUrl }}
            />
            <Text>{"اسم" + element.designTitle}</Text>
          </View>
        </View>
      );
    });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "#4f3c75",
            alignSelf: "center",
            top: "8%",
            position: "absolute",
            zIndex: 2,
          }}
        >
          معرض التصاميم
        </Text>
        <View>{this.readData()}</View>
      </View>
    );
  }
}
