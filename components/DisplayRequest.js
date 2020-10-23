import firebase from "../database/firebase";
import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Svg, { Defs, G, Path } from "react-native-svg";

var forms = []; // To retrive all forms here
var waitingForms = [];
var inProgressForms = [];
var doneForms = [];

export default class DisplayRequest extends React.Component {
  constructor() {
    super();
    this.state = {
      watingList: true,
      currentList: false,
      doneList: false,
      displayedWatingForms: [],
      displayedCurrentForms: [],
      displayedDoneForms: [],
      watingtoggle: true,
      currenttoggle: false,
      donetoggle: false,
      profileImg: "",
    }; //End of status

    //START RETURN ALL FORMS
    const DID = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("Forms/" + DID)
      .on("value", (snapshot) => {
        //put DID after Path
        forms = snapshot.val();
      }); //End of on method

    //START sepreate them based on their status
    if (forms != null) {
      var formsKeys = Object.keys(forms);
      var waitingLoop = 0;
      var inProgressLoop = 0;
      var doneLoop = 0;
      for (var i = 0; i < formsKeys.length; i++) {
        if (forms[formsKeys[i]].status === "w") {
          waitingForms[waitingLoop] = forms[formsKeys[i]];
          waitingLoop++;
        } else if (forms[formsKeys[i]].status === "p") {
          inProgressForms[inProgressLoop] = forms[formsKeys[i]];
          inProgressLoop++;
        } else {
          doneForms[doneLoop] = forms[formsKeys[i]];
          doneLoop++;
        }
      } //End of for loop

      this.updateInputVal(waitingForms, "displayedWatingForms");
      this.updateInputVal(inProgressForms, "displayedCurrentForms");
      this.updateInputVal(doneForms, "displayedDoneForms");
    }
  } //End of constructor

  //////for udate state values @#$%^Y$#$%^&*&^%$#@#$%^&*(*&^%$#@$%^&*(*&^%$#$%^&*()))
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }; //////END of udate state values function

  //METHOD FOR TOGGLE
  btnPress = (val) => {
    this.updateInputVal(false, "watingList");
    this.updateInputVal(false, "currentList");
    this.updateInputVal(false, "doneList");
    this.updateInputVal(true, val);
    switch (val) {
      case "watingList":
        this.updateInputVal(true, "watingtoggle");
        this.updateInputVal(false, "currenttoggle");
        this.updateInputVal(false, "donetoggle");
        break;
      case "currentList":
        this.updateInputVal(true, "currenttoggle");
        this.updateInputVal(false, "watingtoggle");
        this.updateInputVal(false, "donetoggle");
        break;
      case "doneList":
        this.updateInputVal(true, "donetoggle");
        this.updateInputVal(false, "watingtoggle");
        this.updateInputVal(false, "currenttoggle");
        break;
    }
  };

  /*
   waitingForms = [];
var inProgressForms = []; 
var doneForms = [];
  */

  //DISPLAY WAITING LIST

  readWaitingList() {
    return this.state.displayedWatingForms.map((element) => {
      var CID = element.CID;
      var ClientName = "";
      firebase
        .database()
        .ref("Client/" + CID)
        .on("value", (dataSnapshot) => {
          ClientName =
            dataSnapshot.child("CFirstName").val() +
            " " +
            dataSnapshot.child("CLastName").val();
        });
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("WRequiestDet", { obj: element })
          }
          style={styles.listStyle}
        >
          <View key={Math.random()}>
            <Text style={styles.orderText}>عنوان الطلب: {element.title}</Text>
            <Text style={styles.orderText}>اسم العميل: {ClientName}</Text>

            {console.log("LOOP")}
          </View>
        </TouchableOpacity>
      );
    });
  }

  //DISPLAY CURRENT LIST
  readCurrentList() {
    return this.state.displayedCurrentForms.map((element) => {
      var CID = element.CID;
      var ClientName = "";
      firebase
        .database()
        .ref("Client/" + CID)
        .on("value", (dataSnapshot) => {
          ClientName =
            dataSnapshot.child("CFirstName").val() +
            " " +
            dataSnapshot.child("CLastName").val();
        });
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("PRequiestDet", { obj: element })
          }
          style={styles.listStyle}
        >
          <View key={Math.random()}>
            <Text style={styles.orderText}>عنوان الطلب: {element.title}</Text>
            <Text style={styles.orderText}>اسم العميل: {ClientName}</Text>
            {console.log("LOOP")}
          </View>
        </TouchableOpacity>
      );
    });
  }

  //DISPLAY DONE LIST
  readDoneList() {
    return this.state.displayedDoneForms.map((element) => {
      var CID = element.CID;
      var ClientName = "";
      firebase
        .database()
        .ref("Client/" + CID)
        .on("value", (dataSnapshot) => {
          ClientName =
            dataSnapshot.child("CFirstName").val() +
            " " +
            dataSnapshot.child("CLastName").val();
        });
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("DRequiestDet", { obj: element })
          }
          style={styles.listStyle}
        >
          <View key={Math.random()}>
            <Text style={styles.orderText}>عنوان الطلب: {element.title}</Text>
            <Text style={styles.orderText}>اسم العميل: {ClientName}</Text>
            {console.log("LOOP")}
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    const Wbottombordercolor = this.state.watingtoggle ? "#4f3c75" : "#ccc";
    const Cbottombordercolor = this.state.currenttoggle ? "#4f3c75" : "#ccc";
    const Dbottombordercolor = this.state.donetoggle ? "#4f3c75" : "#ccc";

    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "700",
            color: "#4f3c75",
            alignSelf: "center",
            position: "absolute",
            zIndex: 2,
            top: "6.5%",
          }}
        >
          سجل الطلبات
        </Text>
        <Svg
          width={416}
          height={144}
          style={{ alignSelf: "center", top: "-3%", position: "relative" }}
        >
          <G data-name="Group 7">
            <G filter="url(#prefix__a)">
              <Path
                data-name="Path 117"
                d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
                fill="#ffeed6"
              />
            </G>
            <Path
              data-name="Icon ionic-ios-arrow-back"
              d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
              fill="#4f3c75"
              onPress={() => this.props.navigation.goBack()}
            />
            <Path
              data-name="Icon material-menu"
              onPress={() => this.props.navigation.toggleDrawer()}
              d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
              fill="#4f3c75"
            />
          </G>
        </Svg>

        <View style={styles.tabView}>
          <TouchableOpacity
            style={[styles.tabbtns, { borderBottomColor: Dbottombordercolor }]}
            onPress={() => this.btnPress("doneList")}
          >
            <Text style={styles.tabtext}>المنجزة</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabbtns, { borderBottomColor: Cbottombordercolor }]}
            onPress={() => this.btnPress("currentList")}
          >
            <Text style={styles.tabtext}>الحالية</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabbtns, { borderBottomColor: Wbottombordercolor }]}
            onPress={() => this.btnPress("watingList")}
          >
            <Text style={styles.tabtext}>الانتظار</Text>
          </TouchableOpacity>
        </View>

        {this.state.watingList && (
          <ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            {this.readWaitingList()}
          </ScrollView>
        )}

        {this.state.currentList && (
          <ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            {this.readCurrentList()}
          </ScrollView>
        )}

        {this.state.doneList && (
          <ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            {this.readDoneList()}
          </ScrollView>
        )}
      </View>
    ); // End of render return
  } //End of render
} //End of Class

///STYLE SHEET START
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },

  tabView: {
    flexDirection: "row",
    marginTop: "-5%",
  },

  tabbtns: {
    margin: "5%",
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  },
  tabtext: {
    fontSize: 25,
    color: "#4f3c75",
    fontWeight: "600",
  },
  listStyle: {
    marginTop: "5%",
    backgroundColor: "#ffeed6",
    fontSize: 24,
    borderRadius: 35,
    borderColor: "#4f3c75",
    borderWidth: 2,
    // paddingLeft:"10%",
    // paddingRight:"10%",
    //padding:"10%",
    width: 350,
    height: 90,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  orderText: {
    color: "#4f3c75",
    fontSize: 20,
    textAlign: "center",
  },
});
