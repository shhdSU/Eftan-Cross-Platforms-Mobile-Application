/*
هذي الصفحة خاصة باستعراض طلبات المصمم 
ينقص هذي الصفحة للآن 
الرفرش
تمييز الطلبات المنتهية واستعراضها مع امكانية رؤية الطلب 
*/

import firebase from "../database/firebase";
import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import Svg, { Defs, G, Path } from "react-native-svg";
import EmptyList from "./emptylist";

var forms = []; // To retrive all forms here
var waitingForms = [];
var inProgressForms = [];
var doneForms = [];
var expiredForms = [];
export default class DisplayRequest extends React.Component {
  constructor(props) {
    super();
    this.state = {
      watingList: true,
      currentList: false,
      doneList: false,
      expiredList: false,
      displayedWatingForms: [],
      displayedCurrentForms: [],
      displayedDoneForms: [],
      displayedExpiredForms: [],
      watingtoggle: true,
      currenttoggle: false,
      donetoggle: false,
      expiretoggle: false,
    }; //End of status

    var status = props.navigation.state.params;
    if (status != null) {
      switch (status.status) {
        case "p":
          this.updateInputVal(false, "watingList");
          this.updateInputVal(false, "watingtoggle");
          this.updateInputVal(true, "currentList");
          this.updateInputVal(true, "currenttoggle");
          break;

        case "d":
          this.updateInputVal(false, "watingList");
          this.updateInputVal(false, "watingtoggle");
          this.updateInputVal(true, "doneList");
          this.updateInputVal(true, "donetoggle");
          break;
        case "e":
          this.updateInputVal(false, "watingList");
          this.updateInputVal(false, "watingtoggle");
          this.updateInputVal(false, "doneList");
          this.updateInputVal(false, "donetoggle");
          this.updateInputVal(true, "expiredList");
          this.updateInputVal(true, "expiretoggle");
          break;
        default:
          this.updateInputVal(true, "watingList");
          this.updateInputVal(true, "watingtoggle");
          break;
      };

      var status = props.navigation.state.params;
      if (status != null) {
        switch (status.status) {
          case "p":
            this.updateInputVal(false, "watingList");
            this.updateInputVal(false, "watingtoggle");
            this.updateInputVal(true, "currentList");
            this.updateInputVal(true, "currenttoggle");
            break;

          case "d":
            this.updateInputVal(false, "watingList");
            this.updateInputVal(false, "watingtoggle");
            this.updateInputVal(true, "doneList");
            this.updateInputVal(true, "donetoggle");
            break;

          default:
            this.updateInputVal(true, "watingList");
            this.updateInputVal(true, "watingtoggle");
            break;

        }
      } else {
        this.updateInputVal(true, "watingList");
        this.updateInputVal(true, "watingtoggle");
      }
      //START RETURN ALL FORMS
      const DID = "2Uf1Wj14icbxngiiJbjklDDwiZb2";
      //firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref("Forms/" + DID)
        .on("value", (snapshot) => {
          //put DID after Path
          forms = snapshot.val();
          if (forms != null) {
            var formsKeys = Object.keys(forms);
            var waitingLoop = 0;
            var inProgressLoop = 0;
            var doneLoop = 0;
            var expiredLoop = 0;

            ///--------لوب لاسترجاع باقي معلومات الطلب العملاء----------
            for (var i = 0; i < formsKeys.length; i++) {
              console.log("loop2   " + i + "  ")
              if (forms[formsKeys[i]].status === "w") {
                waitingForms[waitingLoop] = forms[formsKeys[i]];
                waitingLoop++;
              } else if (forms[formsKeys[i]].status === "p") {
                inProgressForms[inProgressLoop] = forms[formsKeys[i]];
                inProgressLoop++;
              } else if (forms[formsKeys[i]].status === "d" || forms[formsKeys[i]].status === "f") {
                doneForms[doneLoop] = forms[formsKeys[i]];
                doneLoop++;
              }
              else if (forms[formsKeys[i]].status === "e") {
                expiredForms[expiredLoop] = forms[formsKeys[i]];
                expiredLoop++;
              }
            } //End of for loop
            if (this.state.displayedWatingForms.length != waitingForms.length)
              this.updateInputVal(waitingForms, "displayedWatingForms");
            if (this.state.displayedCurrentForms.length != inProgressForms.length)
              this.updateInputVal(inProgressForms, "displayedCurrentForms");
            if (this.state.displayedDoneForms.length != doneForms.length)
              this.updateInputVal(doneForms, "displayedDoneForms");
            if (this.state.displayedExpiredForms.length != expiredForms.length)
              this.updateInputVal(expiredForms, "displayedExpiredForms");
          }

          //move above later
          //expired 
          this.state.displayedWatingForms.forEach((element, index) => {
            var currentDate = new Date();
            var form = element.deadLine.split('-');
            var formDate = new Date(form[0], form[1] - 1, form[2]);
            if (currentDate > formDate) {
              console.log("bigger");
              this.state.displayedWatingForms.splice(index);
              //change status to e
              this.updateStatusToExpired(element);
              this.state.displayedExpiredForms.push(element);
            }
          })
          this.state.displayedCurrentForms.forEach((element, index) => {
            var currentDate = new Date();
            var formDate = new Date(element.deadLine);
            console.log("current" + currentDate);
            console.log(formDate);
            if (currentDate > formDate) {
              console.log("current" + currentDate);
              console.log(formDate);
              this.state.displayedCurrentForms.splice(index);
              this.updateStatusToExpired(element);
              this.state.displayedExpiredForms.push(element);

            }
          })
          // this.state.displayedDoneForms.forEach((element, index)=> {
          //   var currentDate = new Date();
          //   var formDate = new Date(element.deadLine);
          //   if(currentDate > formDate){
          //     this.state.displayedDoneForms.splice(index);
          //     this.updateStatusToExpired(element);
          //     this.state.displayedExpiredForms.push(element);

          //   }
          // })

        }); //End of on method

      //START sepreate them based on their status
      if (forms != null) {
        var formsKeys = Object.keys(forms);
        var waitingLoop = 0;
        var inProgressLoop = 0;
        var doneLoop = 0;


        ///--------لوب لاسترجاع باقي معلومات الطلب العملاء----------
        for (var i = 0; i < formsKeys.length; i++) {
          console.log("loop2   " + i + "  ")
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

    UpdateStatusAfterAccepted = () => {
      const DID = "2Uf1Wj14icbxngiiJbjklDDwiZb2";
      //firebase.auth().currentUser.uid;
      var key = this.state.Imagekey;
      this.updateInputVal("p", "status");
      firebase
        .database()
        .ref("Forms/" + DID + "/" + key)
        .update({ status: this.state.status });
      this.updateInputVal(true, "accepted");
      this.props.navigation.navigate("DisplayRequest", { status: "p" });
    };

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
      this.updateInputVal(false, "expiredList");
      this.updateInputVal(true, val);
      switch (val) {
        case "watingList":
          this.updateInputVal(true, "watingtoggle");
          this.updateInputVal(false, "currenttoggle");
          this.updateInputVal(false, "donetoggle");
          this.updateInputVal(false, "expiretoggle");
          break;
        case "currentList":
          this.updateInputVal(true, "currenttoggle");
          this.updateInputVal(false, "watingtoggle");
          this.updateInputVal(false, "donetoggle");
          this.updateInputVal(false, "expiretoggle");

          break;
        case "doneList":

          this.updateInputVal(true, "donetoggle");
          this.updateInputVal(false, "watingtoggle");
          this.updateInputVal(false, "currenttoggle");
          this.updateInputVal(false, "expiretoggle");

          break;
        case "expiredList":

          this.updateInputVal(false, "donetoggle");
          this.updateInputVal(false, "watingtoggle");
          this.updateInputVal(false, "currenttoggle");
          this.updateInputVal(true, "expiretoggle");

          break;
      }
    };
  }
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
            <Image
              style={styles.profileImage}
              source={{ uri: element.reference }}
            />
            <Text style={[styles.orderText, { fontWeight: "700" }]}>عنوان الطلب: </Text>
            <Text style={styles.orderText}>{element.title}</Text>
            <Text style={[styles.orderText, { fontWeight: "700" }]}>اسم العميل: </Text>
            <Text style={styles.orderText}>{ClientName}</Text>

          </View>
        </TouchableOpacity>
      );
    });
  }

  updateStatusToExpired = (element) => {
    const DID = firebase.auth().currentUser.uid;
    var key = element.Imagekey;
    firebase
      .database()
      .ref("Forms/" + DID + "/" + key)
      .update({ status: "e" });
  };

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
            <Image
              style={styles.currentprofileImage}
              source={{ uri: element.reference }}
            />

            <Text style={styles.currentorderText}>{ClientName}</Text>
            <Text style={[styles.currentorderText, { fontWeight: "700" }]}>اسم العميل: </Text>
            <Text style={styles.currentorderText}>{element.title}</Text>
            <Text style={[styles.currentorderText, { fontWeight: "700" }]}>عنوان الطلب: </Text>
            <View
              style={{
                height: 50,
                width: 110,
                marginTop: "5%",
                borderRightWidth: 2,
                borderRightColor: "#4f3c75",
                left: "-10%"
              }}
            >
              <Text style={[styles.deaslineStyle, { fontWeight: "700" }]}>التسليم </Text>
              <Text style={styles.deaslineStyle}>{element.deadLine == "" ? "مفتوح" : element.deadLine}</Text>
            </View>
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
            <Image
              style={styles.currentprofileImage}
              source={{ uri: element.submissionUrl }}
            />
            <Text style={styles.currentorderText}>{ClientName}</Text>
            <Text style={[styles.currentorderText, { fontWeight: "700" }]}>اسم المصمم: </Text>
            <Text style={styles.currentorderText}>{element.title}</Text>
            <Text style={[styles.currentorderText, { fontWeight: "700" }]}>عنوان الطلب: </Text>

            <View
              style={{
                height: 50,
                width: 110,
                marginTop: "5%",
                borderRightWidth: 2,
                borderRightColor: "#4f3c75",
                left: "-10%"
              }}
            >
              <Text style={[styles.deaslineStyle, { fontWeight: "700" }]}>الحالة </Text>
              <Text style={styles.deaslineStyle}>{element.status == "f" ? "مدفوع" : "غير مدفوع"}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  }

  //DISPLAY EXPIRED LIST
  readExpiredList() {
    return this.state.displayedExpiredForms.map((element) => {
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
            this.props.navigation.navigate("ERequestDet", { obj: element })
          }
          style={styles.listStyle}
        >
          <View key={Math.random()}>
            <Image
              style={styles.profileImage}
              source={{ uri: element.submissionUrl }}
            />
            <Text style={[styles.orderText, { fontWeight: "700" }]}>عنوان الطلب: </Text>
            <Text style={styles.orderText}>{element.title}</Text>
            <Text style={[styles.orderText, { fontWeight: "700" }]}>اسم العميل: </Text>
            <Text style={styles.orderText}>{ClientName}</Text>
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
    const Ebottombordercolor = this.state.expiretoggle ? "#4f3c75" : "#ccc";

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
          style={{
            alignSelf: "center", top: "-3%", position: "relative", shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}
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
            style={[styles.tabbtns, { borderBottomColor: Ebottombordercolor }]}
            onPress={() => this.btnPress("expiredList")}
          >
            <Text style={styles.tabtext}>المنتهية</Text>
          </TouchableOpacity>
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

        {this.state.watingList && this.state.displayedWatingForms.length != 0 && (
          <ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            {this.readWaitingList()}
          </ScrollView>
        )}

        {this.state.watingList && this.state.displayedWatingForms.length == 0 && (
          <View style={{ marginTop: "50%" }}>
            <EmptyList style={styles.emptyImage}></EmptyList>
            <Text style={styles.emptyText}>نأسف لا يوجد لديك طلبات في قائمة الانتظار</Text>
          </View>
        )}


        {this.state.currentList && this.state.displayedCurrentForms.length != 0 && (
          <ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            {this.readCurrentList()}
          </ScrollView>
        )}

        {this.state.currentList && this.state.displayedCurrentForms.length == 0 && (
          <View style={{ marginTop: "50%" }}>
            <EmptyList style={styles.emptyImage}></EmptyList>
            <Text style={styles.emptyText}>نأسف لا يوجد لديك طلبات حالية</Text>
          </View>
        )}

        {this.state.doneList && this.state.displayedDoneForms != 0 && (
          <ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            {this.readDoneList()}
          </ScrollView>
        )}

        {this.state.doneList && this.state.displayedDoneForms == 0 && (
          <View style={{ marginTop: "50%" }}>
            <EmptyList style={styles.emptyImage}></EmptyList>
            <Text style={styles.emptyText}>نأسف لا يوجد لديك طلبات منجزة</Text>
          </View>
        )}

        {this.state.expiredList && this.state.displayedExpiredForms != 0 && (
          <ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            {this.readExpiredList()}
          </ScrollView>
        )}

        {this.state.expiredList && this.state.displayedExpiredForms == 0 && (
          <View style={{ marginTop: "50%" }}>
            <EmptyList style={styles.emptyImage}></EmptyList>
            <Text style={styles.emptyText}> لا يوجد لديك طلبات منتهية</Text>
          </View>
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
    margin: "3%",
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  },
  tabtext: {
    fontSize: 20,
    color: "#4f3c75",
    fontWeight: "600",
  },
  listStyle: {
    marginTop: "5%",
    backgroundColor: "#EFEEFF",
    fontSize: 24,
    borderRadius: 35,
    borderColor: "#4f3c75",
    borderWidth: 2,

    width: 350,
    height: 90,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.95,

    elevation: 24,
  },
  orderText: {
    color: "#4f3c75",
    fontSize: 15,
    textAlign: "right",
    top: "-34%",
    paddingLeft: "5%",
    paddingRight: "23%",
  },
  profileImage: {
    width: 70,
    height: 70,
    marginTop: "23%",
    marginLeft: "70%",
    borderColor: "#4f3c75",
    borderWidth: 2,
    backgroundColor: "#fff",
  },

  currentorderText: {
    color: "#4f3c75",
    fontSize: 15,
    textAlign: "right",
    top: "46%",
    marginTop: "-11.5%",
    paddingLeft: "5%",
    paddingRight: "23%",
    zIndex: 10,
  },
  currentprofileImage: {
    width: 70,
    height: 70,
    marginTop: "-3%",
    marginLeft: "70%",
    borderColor: "#4f3c75",
    borderWidth: 2,
    backgroundColor: "#fff",
  },


  emptyText: {
    color: "#4f3c75",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "200"
  },
  emptyImage: {
    alignSelf: "center",
    justifyContent: "center",
  },
  deaslineStyle: {
    color: "#4f3c75",
    fontSize: 15,
    textAlign: "center",
    marginLeft: "13%",
    top: "15%"

  }

});
