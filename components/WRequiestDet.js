import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as React from "react";
import Svg, { Path, G, Circle } from "react-native-svg";
import firebase from "../database/firebase";
import Notify from "./sendNotification";
export default class WRequiestDet extends React.Component {
  constructor(props) {
    super();
    var Requiest = props.navigation.state.params.obj;

    this.state = {
      Imagekey: "",
      CID: "",
      category: "",
      color1: "",
      color2: "",
      color3: "",
      deadLine: "",
      description: "",
      status: "",
      reference: "",
      title: "",
      ClientProfileImage: "",
      name: "",
      clientToken: "",
      accepted:false,
      rejected: false,
      dname: "",
      acceptedMessage: "",
      rejectedMessage: "",      
    };

    this.updateInputVal(Requiest.Imagekey, "Imagekey");
    this.updateInputVal(Requiest.category, "category");
    this.updateInputVal(Requiest.CID, "CID");
    this.updateInputVal(Requiest.color1, "color1");
    this.updateInputVal(Requiest.color2, "color2");
    this.updateInputVal(Requiest.color3, "color3");
    this.updateInputVal(Requiest.deadLine, "deadLine");
    this.updateInputVal(Requiest.description, "description");
    this.updateInputVal(Requiest.status, "status");
    this.updateInputVal(Requiest.reference, "reference");
    this.updateInputVal(Requiest.title, "title");

    //---------------صورة العميل--------------
    firebase
      .storage()
      .ref("ProfilePictures/" + this.state.CID)
      .getDownloadURL()
      .then((url) => {
        this.updateInputVal(url, "ClientProfileImage");
      })
      .catch((error) => {
        console.log("can not retreive profile img url");
      });

    //---------------اسم العميل--------------
    var Cname = "";
    firebase
      .database()
      .ref("Client/" + this.state.CID)
      .on("value", (dataSnapshot) => {
        Cname =
          dataSnapshot.child("CFirstName").val() +
          " " +
          dataSnapshot.child("CLastName").val();
        this.updateInputVal(Cname, "name");
      });
    //---------------clientToken-------------------
      firebase.database().ref("Client/"+this.state.CID).child("notificationsKey").on("value",(dataSnapshot) => {
          if(dataSnapshot.exists()){
            firebase.database().ref("Client/"+this.state.CID).child("notificationsKey").on("value",(dataSnapshot) => {
              this.updateInputVal(dataSnapshot.val(),"clientToken");
          })
      }
    })
    var designerName;
    firebase
    .database()
    .ref("GraphicDesigner/" + firebase.auth().currentUser.uid)
    .on("value", (dataSnapshot) => {
      designerName =
        dataSnapshot.child("DFirstName").val() +
        " " +
        dataSnapshot.child("DLastName").val();
      this.updateInputVal(designerName, "dname");
    });
    var acceptedmessage = "لقد تم قبول طلبك من قبل المصمم" + this.state.dname;
    var rejectedmessage = "لم يتمكن المصمم "+ this.state.dname + " من قبول طلبك";
    this.updateInputVal(acceptedmessage,"acceptedMessage");
    this.updateInputVal(rejectedmessage,"rejectedMessage");

    console.log(acceptedmessage);
    console.log(rejectedmessage);

  }
  //---------------تحديث قيم--------------

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  //---------------(تحديث حالة الطلب من (تحت الانتظار) الى (قيد العمل--------------
  UpdateStatusAfterAccepted = () => {
    const DID = firebase.auth().currentUser.uid;
    var key = this.state.Imagekey;
    this.updateInputVal("p", "status");
    firebase
      .database()
      .ref("Forms/" + DID + "/" + key)
      .update({ status: this.state.status });
      this.updateInputVal(true,"accepted");
    this.props.navigation.navigate("DisplayRequest");
  };

  //---------------حذف طلب--------------
  RemoveRequest = () => {
    firebase
      .database()
      .ref("/Forms/" + this.state.Imagekey)
      .remove();
      this.updateInputVal(true,"rejected");
    this.props.navigation.navigate("DisplayRequest");
  };
  //------------------------------------

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text
            style={{
              color: "#4F3C75",
              top: "7.5%",
              fontWeight: "700",
              position: "absolute",
              fontSize: 25,
              textAlign: "center",
              alignSelf: "center",
              zIndex: 1,
            }}
          >
            {this.state.title}
          </Text>
          {this.state.accepted &&  <Notify token = {this.state.clientToken} myTitle= "تهانينا" myMessage = {this.state.acceptedMessage}/>}
          {this.state.rejected &&  <Notify token = {this.state.clientToken} myTitle= "يا للأسف" myMessage = {this.state.rejectedMessage}/>}

          <Svg
            width={416}
            height={144}
            style={{ alignSelf: "center", top: "-2%", position: "absolute" }}
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
                onPress={() => this.props.navigation.goBack()}
                d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
                fill="#4f3c75"
              />
            </G>
          </Svg>

          <View style={styles.infoCont}>
            <Image
              style={styles.profileImage}
              source={{ uri: this.state.ClientProfileImage }}
            />

            <Text
              style={[
                {
                  color: "#4F3C75",
                  top: "-50%",
                  left: "42%",
                  fontWeight: "300",
                  fontSize: 20,
                },
              ]}
            >
              {this.state.name}
            </Text>
            <View
              style={{
                marginTop: 10,
                marginBottom: 50,
                paddingLeft: 30,
                paddingRight: 30,

                justifyContent: "space-between",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <TouchableOpacity
                // اذا ضغط المصمم زر قبول الطلب يصل للعميل اشعار >> تم قبول الطلب  

                onPress={() =>
                  Alert.alert(
                    "تنبيه",
                    "تمت عملية قبول الطلب بنجاح",
                    [
                      {
                        text: "حسناً",
                        onPress: () => {
                          this.UpdateStatusAfterAccepted();
                        },
                      },
                    ],
                    { cancelable: false }
                  )
                }

              >
                <Image
                  style={styles.accject}
                  source={require("../assets/accept.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "تنبيه",
                    "هل انت متأكد من رفض الطلب ؟",
                    [
                      {
                        text: "الغاء",
                        onPress: () => {
                          this.props.navigation.navigate("WRequiestDet");
                        },
                      },
                      {
                        // اذا ضغط المصمم زر رفض الطلب يصل للعميل اشعار >> تم رفض الطلب  
                        text: "تأكيد",
                        onPress: () => {
                          this.RemoveRequest();
                        },
                      },
                    ],
                    { cancelable: false }
                  )
                }
              >
                <Image
                  style={(styles.accject, { left: -240, top: -76 })}
                  source={require("../assets/reject.png")}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/*----------- ----------- ----------- ----------- ----------- ----------- ----------- -----------  */}
          <Image
            style={styles.preview}
            source={{
              uri: this.state.reference,
            }}
          />
          {/*----------- ----------- ----------- ----------- ----------- ----------- ----------- -----------  */}

          <Text
            style={[
              styles.inputStyle2,
              {
                color: "#4F3C75",
                top: "13%",
                right: "-23.5%",
                fontWeight: "700",
                backgroundColor: "#fff",
                height: "2.5%",
                width: "27%",
                zIndex: 2,
              },
            ]}
          >
            صنف التصميم
          </Text>
          <Text
            style={[
              {
                color: "#4F3C75",
                top: "11%",
                textAlign: "right",
                fontWeight: "700",
                width: "87%",
                height: "6%",
                fontSize: 15,
                borderWidth: 2,
                borderColor: "#ccc",
                borderRadius: 25,
                fontWeight: "400",
                paddingRight: 25,
                paddingTop: 15,
              },
            ]}
          >
            {this.state.category}
          </Text>
          {/*----------- ----------- ----------- ----------- ----------- ----------- ----------- -----------  */}

          <Text
            style={[
              styles.inputStyle2,
              {
                flexShrink: 1,
                color: "#4F3C75",
                top: "10%",
                right: "-23.5%",
                fontWeight: "700",
                backgroundColor: "#fff",
                height: "2.5%",
                width: "23%",
                zIndex: 2,
              },
            ]}
          >
            وصف العمل
          </Text>

          <Text
            style={[
              {
                color: "#4F3C75",
                top: "8%",
                left: "0%",
                textAlign: "right",
                width: "87%",
                height: "12%",
                fontSize: 12,
                borderWidth: 2,
                borderColor: "#ccc",
                borderRadius: 25,
                padding: "7%",
                minHeight: 50,
                paddingLeft: 5,
                paddingTop: 10,
                paddingBottom: 5,
                fontWeight: "400",
              },
            ]}
          >
            {this.state.description}
          </Text>

          {/*----------- ----------- ----------- ----------- ----------- ----------- ----------- -----------  */}

          <Text
            style={[
              styles.inputStyle2,
              {
                color: "#4F3C75",
                top: "7%",
                right: "-23.5%",
                fontWeight: "700",
                backgroundColor: "#fff",
                height: "2.5%",
                width: "27%",
                zIndex: 2,
              },
            ]}
          >
            موعد التسليم{" "}
          </Text>
          <Text
            style={[
              {
                color: "#4F3C75",
                top: "5%",
                textAlign: "right",
                fontWeight: "700",
                width: "87%",
                height: "6%",
                fontSize: 15,
                borderWidth: 2,
                borderColor: "#ccc",
                borderRadius: 25,
                fontWeight: "400",
                paddingRight: 25,
                paddingTop: 15,
              },
            ]}
          >
            {this.state.deadLine}
          </Text>
          {/*----------- ----------- ----------- ----------- ----------- ----------- ----------- -----------  */}

          <Text
            style={[
              styles.inputStyle2,
              {
                color: "#4F3C75",
                top: "4%",
                right: "-23.5%",
                fontWeight: "700",
                backgroundColor: "#fff",
                height: "2.5%",
                width: "27%",
                zIndex: 2,
              },
            ]}
          >
            ألوان التصميم{" "}
          </Text>
          <Text
            style={[
              {
                color: "#4F3C75",
                top: "4%",
                right: "14%",
                textAlign: "right",
                fontWeight: "700",
                width: "21%",
                height: "5%",
                fontSize: 13,
                borderWidth: 2,
                borderColor: "#ccc",
                borderRadius: 20,
                paddingTop: 10,
                paddingRight: 9,
                backgroundColor: this.state.color1,
                overflow: "hidden",
              },
            ]}
          >
            {this.state.color1}
          </Text>
          <Text
            style={[
              {
                color: "#4F3C75",
                top: "-.8%",
                right: "-8%",
                textAlign: "right",
                fontWeight: "700",
                width: "21%",
                height: "5%",
                fontSize: 13,
                borderWidth: 2,
                borderColor: "#ccc",
                borderRadius: 20,
                paddingTop: 10,
                paddingRight: 9,
                backgroundColor: this.state.color2,
                overflow: "hidden",
              },
            ]}
          >
            {this.state.color2}
          </Text>
          <Text
            style={[
              {
                color: "#4F3C75",
                top: "-5.8%",
                right: "-30%",
                textAlign: "right",
                fontWeight: "700",
                width: "21%",
                height: "5%",
                fontSize: 13,
                borderWidth: 2,
                borderColor: "#ccc",
                borderRadius: 20,
                paddingTop: 10,
                paddingRight: 9,
                backgroundColor: this.state.color3,
                overflow: "hidden",
              },
            ]}
          >
            {this.state.color3}
          </Text>
          {/*----------- ----------- ----------- ----------- ----------- ----------- ----------- -----------  */}
        </View>
      </View>
    );
  }
}
//Style sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  preview: {
    width: 300,
    height: 235,
    borderColor: "#ccc",
    borderWidth: 2,
    top: "15%",
    borderRadius: 35,
    alignSelf: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: "1%",
    justifyContent: "center",
    borderRadius: 25,
    width: "60%",
    height: "3.5%",
    alignSelf: "center",
    bottom: "15%",
  },
  inputStyle2: {
    fontSize: 16,
    marginTop: "4%",
    width: "100%",
    marginBottom: "2%",
    paddingBottom: "2%",
    textAlign: "right",
    top: "0%",
  },
  profileImage: {
    width: 60,
    height: 60,
    top: "9%",
    left: "76%",
    borderRadius: 35,
    borderColor: "#ffeed6",
    borderWidth: 2,
    backgroundColor: "#fff",
  },

  accject: {
    width: 34,
    height: 35,
    right: 20,
    top: -75,
    paddingRight: 35,
    backgroundColor: "#fff",
  },
  infoCont: {
    backgroundColor: "#EFEEFF",
    width: "96%",
    borderRadius: 25,
    top: "14%",
    height: "9%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1.48,
    shadowRadius: 2.95,

    elevation: 19,
  },
});
