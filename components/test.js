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
var gall = [];
var gall1 = [];

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
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  readData = () => {
    //  console.log("wow");
    // var desurl = "";

    // var ref1 = firebase
    //   .storage()
    //   .ref("DesignWork/" + design[designInfo].designFileKey)
    //   .getDownloadURL()
    //   .then((url) => {
    //     this.state.designUrl = url;
    //   });
    var ref = firebase.database().ref("Designs/");
    ref.on("value", (snapshot) => {
      var design = snapshot.val();
      var designKeys = Object.keys(design);

      for (var i = 0; i < designKeys.length; i++) {
        var designInfo = designKeys[i];
        // var categ = design[designInfo].category;
        // var desDis = design[designInfo].designDescription;
        // var desFileKey = design[designInfo].designFileKey;
        // var desTitle = design[designInfo].designTitle;
        // var desUploadingdate = design[designInfo].designUploadingdate;
        // var desUrl = "";

        var ref1 = firebase
          .storage()
          .ref("DesignWork/" + design[designInfo].designFileKey)
          .getDownloadURL()
          .then((url) => {
            //   x = url;
            this.updateInputVal(url, "designUrl");
          });

        designGallery[i] = {
          category: design[designInfo].category,
          designDescription: design[designInfo].designDescription,
          designFileKey: design[designInfo].designFileKey,
          designTitle: design[designInfo].designTitle,
          designUploadingdate: design[designInfo].designUploadingdate,
          designUrl: this.state.designUrl,

          // designUrl: firebase
          //   .storage()
          //   .ref("DesignWork/" + design[designInfo].designFileKey)
          //   .getDownloadURL(),
        };
      }
    });
    return designGallery;
    // return designGallery.map((element) => {
    //   return (
    //     <View style={{ marginBottom: 30 }}>
    //       <ScrollView scrollEventThrottle={16}>
    //         <View>
    //           <Image
    //             style={{ height: 180, width: 280 }}
    //             source={{ uri: element.designUrl }}
    //           />
    //           <Text>{"اسم" + element.designTitle}</Text>
    //         </View>
    //       </ScrollView>
    //     </View>
    //   );
    // });
  };

  render() {
    gall = this.readData();
    // gall1 = gall;
    console.log(gall);
    return (
      // <View style={{ flex: 1, backgroundColor: "#fff" }}>
      //   <Text
      //     style={{
      //       fontSize: 24,
      //       fontWeight: "700",
      //       color: "#4f3c75",
      //       alignSelf: "center",
      //       top: "8%",
      //       position: "absolute",
      //       zIndex: 2,
      //     }}
      //   >
      //     معرض التصاميم
      //   </Text>
      //   {designGallery.map((element) => {
      //     <View style={{ marginBottom: 30 }}>
      //       <Image
      //         style={{ height: 180, width: 280 }}
      //         source={{ uri: element.designUrl }}
      //       />
      //       <Text>{"اسم" + element.designTitle}</Text>
      //     </View>;
      //   })}
      //  </View>
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
      </View>
    );
  }
}

//     return (
//       // <View style={{ flex: 1, backgroundColor: "#fff" }}>
//       //   <Text
//       //     style={{
//       //       fontSize: 24,
//       //       fontWeight: "700",
//       //       color: "#4f3c75",
//       //       alignSelf: "center",
//       //       top: "8%",
//       //       position: "absolute",
//       //       zIndex: 2,
//       //     }}
//       //   >
//       //     معرض التصاميم
//       //   </Text>
//       //   {designGallery.map((element) => {
//       //     <View style={{ marginBottom: 30 }}>
//       //       <Image
//       //         style={{ height: 180, width: 280 }}
//       //         source={{ uri: element.designUrl }}
//       //       />
//       //       <Text>{"اسم" + element.designTitle}</Text>
//       //     </View>;
//       //   })}
//       // </View>
//     );
//   }
// }
