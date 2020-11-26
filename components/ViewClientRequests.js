import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native";
import * as React from "react";
import Svg, { Path, G, Circle } from "react-native-svg";
import firebase from "../database/firebase";
import Notify from "./sendNotification";
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';

export default class ViewClientRequests extends React.Component {
  constructor(props) {
    super();
    var Requiest = props.navigation.state.params.obj;

    this.state = {
      object:"",
      Imagekey: "",
      CID: "",
      DID:"",
      category: "",
      color1: "",
      color2: "",
      color3: "",
      deadLine: "",
      description: "",
      status: "",
      reference: "",
      title: "",
      clientToken: "",
      accepted:false,
      rejected: false,
      dname: "",
      acceptedMessage: "",
      rejectedMessage: "", 
      price:"",
      loading:false,
    };

    this.updateInputVal(Requiest, "object");
    this.updateInputVal(Requiest.Imagekey, "Imagekey");
    this.updateInputVal(Requiest.category, "category");
    this.updateInputVal(Requiest.CID, "CID");
    this.updateInputVal(Requiest.DID, "DID");
    this.updateInputVal(Requiest.color1, "color1");
    this.updateInputVal(Requiest.color2, "color2");
    this.updateInputVal(Requiest.color3, "color3");
    this.updateInputVal(Requiest.deadLine, "deadLine");
    this.updateInputVal(Requiest.description, "description");
    this.updateInputVal(Requiest.status, "status");
    if(Requiest.reference === "")
    this.updateInputVal(Requiest.submissionUrl, "reference");
    else
    this.updateInputVal(Requiest.reference, "reference");
    this.updateInputVal(Requiest.title, "title");
    this.updateInputVal(Requiest.Price,"price");

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


  }
  //---------------تحديث قيم--------------

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  deleteOrder(){

    Alert.alert(
      "تأكيد اغلاق الطلب",
      "هل انت متأكد من اغلاق الطلب؟ سيتم حذف الطلب ولن تستطيع التراجع لاحقًا",
      [
        {
          text: "الغاء",
        },
        {
          text: "تأكيد",
          onPress: () => {
            
            this.deleteIt()
           },
        },
      ],
      { cancelable: false }
    )

  }

  deleteIt(){
    // 1. Delete from realtime DB
firebase.database().ref('Forms/' + this.state.DID + "/" + this.state.Imagekey ).remove().then(

  firebase.storage().refFromURL(this.state.reference).delete().then(

    Alert.alert("تم الاغلاق", "لقد تم اغلاق الطلب بنجاح ", [{ text: "حسنًا" }], {
      cancelable: false,
    }),
    this.props.navigation.navigate("OrderHistory")

    

  )

)
 
// 2. Delete from Storage by known URL
//   
  }

  onShare = async () => {
    try {
      const downloadPath = FileSystem.cacheDirectory + this.state.Imagekey + '.jpg';
      const localUrl = await FileSystem.downloadAsync(this.state.reference,downloadPath);
      const result = await Share.share({
        message:"لقد حصلت على هذا التصميم من تطبيق اِفتن",
        url:
        localUrl.uri,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

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
            style={{ alignSelf: "center", top: "-2%", position: "absolute",
            shadowColor: "#000",
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
                onPress={() => this.props.navigation.goBack()}
                d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
                fill="#4f3c75"
              />
            </G>
          </Svg>
          {/*------------------------------------اذا الطلب منتهي----------------------------------------- */}
{
  this.state.status == "e" && (
    <View
    style={{
      flexDirection: "row", 
      height:"80%",
      width:"50%",
      left:"7%",
      position:"absolute",
      top:"50%",
      zIndex:2
    }}
    >
<TouchableOpacity
          style={[styles.button,{margin:"2.5%"}]}
          onPress={() => this.deleteOrder()}
        >
          <Text
            style={{
              color: "#FFEED6",
              fontSize: 25,
              
            }}
          >
            اغلاق الطلب
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button,{margin:"2.5%",zIndex:2,}]}
          onPress={() => this.props.navigation.navigate("RerequestForm",{obj: this.state.object})}
        >
          <Text
            style={{
              color: "#FFEED6",
              fontSize: 25,
              
            }}
          >
            اعادةالطلب
          </Text>
        </TouchableOpacity>


    </View>
  )
}


          {/*------------------------------------اذا الطلب منتهي----------------------------------------- */}

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
                top: "1.5%",
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
                top: "-0.5%",
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
                top: "-1%",
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
                top: "-3.5%",
                left: "0%",
                textAlign: "right",
                width: "87%",
                height: "12%",
                fontSize: 15,
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
                top: "-2%",
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
                top: "-4%",
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
            {this.state.deadLine == ""?"مفتوح":this.state.deadLine}
          </Text>
          {/*----------- ----------- ----------- ----------- ----------- ----------- ----------- -----------  */}
{this.state.status != "d" && this.state.status != "f" && <View
style={{
  height:"100%",
  position:"absolute",
  top:"79%",
  width:"100%",
  left:"35%",
}}

>
  
  <Text
            style={[
              styles.inputStyle2,
              {
                color: "#4F3C75",
                top: "%",
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
                top: "0%",
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
            {this.state.color1 == ""?"لايوجد":this.state.color1}
          </Text>
          <Text
            style={[
              {
                color: "#4F3C75",
                top: "-5%",
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
            {this.state.color2 == ""?"لايوجد":this.state.color2}
          </Text>
          <Text
            style={[
              {
                color: "#4F3C75",
                top: "-9.8%",
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
            {this.state.color3 == ""?"لايوجد":this.state.color3}
          </Text>
  </View>}
          {/*----------- ----------- ----------- ----------- ----------- ----------- ----------- -----------  */}

          {this.state.status == "d" && <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Payment",{obj: this.state.object})}
        >
          <Text
            style={{
              color: "#FFEED6",
              fontSize: 25,
              
            }}
          >
            انتقل للدفع
          </Text>
        </TouchableOpacity>}

        {(this.state.status == "d" || this.state.status == "f") &&<View style={{
          position:"absolute",
          flexWrap:"wrap",
          top:"79%",
          height:"100%",
          width:"100%",
          left:"6.5%"
        }}>
          <Text
            style={
              {
                color: "#4F3C75",
                top: "3.5%",
                alignSelf:"flex-end",
                fontWeight: "700",
                fontSize: 15,
                backgroundColor: "#fff",
                height: "2.5%",
                width: "10.5%",
                zIndex: 2,
              }}
          >
            المبلغ{" "}
          </Text>
          <Text
            style={[
              {
                color: "#4F3C75",
                top: "2%",
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
                paddingTop: 15
              },
            ]}
          >
             {this.state.price} ريال سعودي 
          </Text>
          </View>}



        {this.state.status == "f" && <TouchableOpacity
          style={styles.button}
          onPress={() => this.onShare()}
        >
          <Text
            style={{
              color: "#FFEED6",
              fontSize: 25,
              
            }}
          >
            مشاركة العمل
          </Text>
        </TouchableOpacity>
        
        }

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
    top: "3%",
    borderRadius: 35,
    alignSelf: "center",
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
    borderColor: "#4F3C75",
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
    borderColor:"#4F3C75",
    borderWidth:2,
    top: "14%",
    height: "9%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.95,

    elevation: 24,
  }, 
  button: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    borderRadius: 25,
    width: "80%",
    height: "6%",
    alignSelf: "center",
    justifyContent:"center",
    bottom:"-10%",
    zIndex:3,
  },
});
