import firebase from "../database/firebase";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
var designGallery = [];
export default class Explore extends Component {
  constructor() {
    super();
    this.state = {
      designTitle: "",
      designDescription: "",
      category: "",
      designFileKey: "",
      isLoading: false,
      localpath: "",
      designUrl: "",
    };
    const user = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("Designs/");
    ref.on("value", (snapshot) => {
      var design = snapshot.val();
      var designKeys = Object.keys(design);

      for (var i = 0; i < designKeys.length; i++) {
        var designInfo = designKeys[i];
        //  designFileKey = this.storageImg();
        // var categ = design[designInfo].category;
        // var desDis = design[designInfo].designDescription;
        // var desFileKey = design[designInfo].designFileKey;
        // var desTitle = design[designInfo].designTitle;
        // var desUploadingdate = design[designInfo].designUploadingdate;
        //var desUrl = "";
        console.log(design[designInfo].designTitle);

        //  console.log(design[designInfo].designFileKey);
        //  var x = "";
        var ref1 = firebase
          .storage()
          .ref("DesignWork/" + design[designInfo].designFileKey)
          .getDownloadURL()
          .then((url) => {
            // x = url;
            this.updateInputVal(url, "designUrl"),
              console.log(this.state.designUrl),
              (designGallery[i] = {
                category: design[designInfo].category,
                designDescription: design[designInfo].designDescription,
                designFileKey: design[designInfo].designFileKey,
                designTitle: design[designInfo].designTitle,
                designUploadingdate: design[designInfo].designUploadingdate,
                designUrl: this.state.designUrl,
              });
            console.log(designGallery[i]);
          });
        console.log(designGallery[i]);

        // console.log(x);
      }
    });
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  // storageImg = () => {
  //   firebase
  //     .storage()
  //     .ref("DesignWork/" + this.state.designFileKey)
  //     .getDownloadURL()
  //     .then((url) => {
  //       this.updateInputVal(url, "designFileKey");
  //     });
  //   return designFileKey;
  // };

  // readData = () => {
  //   var ref = firebase.database().ref("Designs/");
  //   ref.on("value", (snapshot) => {
  //     var design = snapshot.val();
  //     var designKeys = Object.keys(design);

  //     for (var i = 0; i < designKeys.length; i++) {
  //       var designInfo = designKeys[i];
  //       //  designFileKey = this.storageImg();
  //       // var categ = design[designInfo].category;
  //       // var desDis = design[designInfo].designDescription;
  //       // var desFileKey = design[designInfo].designFileKey;
  //       // var desTitle = design[designInfo].designTitle;
  //       // var desUploadingdate = design[designInfo].designUploadingdate;
  //       //var desUrl = "";
  //       //    console.log(designKeys.length);

  //       //  console.log(design[designInfo].designFileKey);
  //       var x = "";
  //       var ref1 = firebase
  //         .storage()
  //         .ref("DesignWork/" + design[designInfo].designFileKey)
  //         .getDownloadURL()
  //         .then((url) => {
  //           x = url;
  //           // this.updateInputVal(url, "designUrl");
  //           console.log(x);
  //         });
  //       //  console.log(this.state.designUrl);
  //       console.log(x);

  //       designGallery[i] = {
  //         category: design[designInfo].category,
  //         designDescription: design[designInfo].designDescription,
  //         designFileKey: design[designInfo].designFileKey,
  //         designTitle: design[designInfo].designTitle,
  //         designUploadingdate: design[designInfo].designUploadingdate,
  //         designUrl: this.state.designUrl,
  //       };
  //     }
  //   });

  //   return designGallery.map((element) => {
  //     return (
  //       <View style={{ marginBottom: 30 }}>
  //         <ScrollView scrollEventThrottle={16}>
  //           <View>
  //             <Image
  //               style={{ height: 180, width: 280 }}
  //               source={{ uri: element.designUrl }}
  //             />
  //             <Text>{"اسم" + element.designTitle}</Text>
  //           </View>
  //         </ScrollView>
  //       </View>
  //     );
  //   });
  // };
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
        {designGallery.map((element) => {
          <View style={{ marginBottom: 30 }}>
            <Image
              style={{ height: 180, width: 280 }}
              source={{ uri: element.designUrl }}
            />
            <Text>{"اسم" + element.designTitle}</Text>
          </View>;
        })}
      </View>
    );
  }
}
