//صفحة الفاتورة
import React from "react";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Text,
  View,
  Button,
  Alert,
} from "react-native";
import Svg, { Path, G } from "react-native-svg";
import firebase from "../database/firebase";
import * as Animatable from "react-native-animatable";
import { AirbnbRating } from "react-native-ratings";
import LottieView from 'lottie-react-native';
var designerName = "";
var price = 0;

export default class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reqTitle: props.navigation.state.params.reqTitle,
      cardNumber: props.navigation.state.params.cardNumber,
      requestKey: props.navigation.state.params.reqKey,
      DID: props.navigation.state.params.DID,
      submitted: false,
      creditCardToken: props.navigation.state.params.creditCardToken,
      popup: false,
      AVG_Rate :0,
      popup2: false,
      

    };

    firebase
      .database()
      .ref("Forms/" + this.state.DID)
      .on("value", (snapshot) => {
        price = snapshot.child(this.state.requestKey).child("Price").val();
      });

    firebase
      .database()
      .ref("GraphicDesigner/" + this.state.DID)
      .on("value", (dataSnapshot) => {
        designerName =
          dataSnapshot.child("DFirstName").val() +
          " " +
          dataSnapshot.child("DLastName").val();
      });
     
  }
  closePopUp2 = () => {
    this.updateInputVal(false, "popup2");
    this.updateInputVal("", "doneText");
    //this.props.navigation.navigate("معرض التصاميم من منظور العميل");
  };
  finish=()=>{
    this.updateInputVal("تمت عملية الدفع بنجاح", "doneText"), 
    this.updateInputVal("شكرًا لاختياركم اِفتن", "doneText2"), 
    this.updateInputVal(true, "submitted");
    setTimeout(() => {
      this.closePopUp2()
    }, 3000)
  }
  //////for udate state values
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }; //////END of udate state values function

  onSubmit() {
    this.updateInputVal(true, "popup2");
    const paymentData = {
      amount: price,
      currency: "SAR",
      metadata: { creditCardToken: this.state.creditCardToken },
    };
    let getPairs = (paymentData, keys = []) =>
      Object.entries(paymentData).reduce((pairs, [key, value]) => {
        if (typeof value === "object")
          pairs.push(...getPairs(value, [...keys, key]));
        else pairs.push([[...keys, key], value]);
        return pairs;
      }, []);

    const response = fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        // Use the correct MIME type for your server
        Accept: "application/json",
        // Use the correct Content Type to send data to Stripe
        "Content-Type": "application/x-www-form-urlencoded",
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${"sk_test_51HiMF9G34qBjP7xlrde6a1DUYACCXTOT484tAdSWZN5Fzd6fuv6im8aoaqpmMrlzNbki2MFUay8iHkwMk0OejH4A00qU2mEWQB"}`,
      },
      body: getPairs(paymentData)
        .map(
          ([[key0, ...keysRest], value]) =>
            `${key0}${keysRest.map((a) => `[${a}]`).join("")}=${value}`
        )
        .join("&"),
    }).then((response) => {
      // ---------**********----------- the line bellow must be >> if (response.status == "200") ******
      if (true) {
        //Update Status

        firebase
          .database()
          .ref("Forms/" + this.state.DID + "/" + this.state.requestKey)
          .update({ status: "f" })
         
      } else
        Alert.alert(
          "للأسف",
          "لم تتم عملية الدفع بشكل صحيح، يرجى المحاولة مرة أخرى",
          [{ text: "حسنًا" }],
          { cancelable: false }
        );
    });
  }
  //---------------*to handle the rate number (clicked star)*----------------------
  ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
    this.updateInputVal(rating, "AVG_Rate");
  };
  //---------------*the pop-up star rate message*----------------------
  popUpWindow = () => {
    this.closePopUp();
    this.updateInputVal(false, "popup");
    this.updateInputVal(true, "popup");
  };
  closePopUp = () => {
    this.updateInputVal(false, "popup");
  };

  //---------------*All the work of the rating :)*----------------------

  sendFunction = () => {
    //---------------*to get the number of raters and add 1*----------------------
    var raters;
    firebase
      .database()
      .ref("GraphicDesigner/" + this.state.DID)
      .on("value", (dataSnapshot) => {
        raters = dataSnapshot.child("raters").val();
      });
    console.log("raters in send: " + raters);
    raters = raters + 1;

    //---------------*to get the average of the rating*----------------------
    var AVG_Rate;
    firebase
      .database()
      .ref("GraphicDesigner/" + this.state.DID)
      .on("value", (dataSnapshot) => {
        AVG_Rate = dataSnapshot.child("AVG_Rate").val();
      });

    AVG_Rate = Number(AVG_Rate.toFixed(1)) + this.state.AVG_Rate / raters;
    console.log("AVGRating in send: " + AVG_Rate);

    //---------------*update the values in the database*----------------------
    firebase
      .database()
      .ref("GraphicDesigner/" + this.state.DID)
      .update({
        AVG_Rate: AVG_Rate,
        raters: raters,
      });
    this.props.navigation.navigate("OrderHistory");
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Animatable.View animation="fadeInUp" style={styles.container}>
          <Svg
            width={416}
            height={144}
            style={{
              alignSelf: "center",
              top: "-8%",
              position: "absolute",
              
            }}
          >
            <G data-name="Group 7">
              <G filter="url(#prefix__a)">
                <Path
                  data-name="Path 117"
                  d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
                  fill="#fff"
                />
              </G>
              <Path
                data-name="Icon ionic-ios-arrow-back"
                onPress={() => this.props.navigation.goBack()}
                d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
                fill="#4f3c75"
              />
              {/* <Path
                data-name="Icon material-menu"
                d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
                fill="#4f3c75"
              /> */}
            </G>
          </Svg>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "700",
              color: "#4f3c75",
              alignSelf: "center",
              position: "absolute",
              zIndex: 2,
              top: "3.5%",
              fontFamily: "Tajawal-Regular",
            }}
          >
            الفاتورة
          </Text>

          <View style={{ top: "-3%" }}>
            {this.state.submitted && (
              <Animatable.View animation="fadeInUp" style={styles.done}>
                <Text
                  style={{
                    fontSize: 20,
                    color: "#04BF9D",
                    fontFamily: "Tajawal-Regular",
                    top:"5%"
                  }}
                >
                  تمت عملية الدفع بنجاح !
                </Text>
              </Animatable.View>
            )}
            <Animatable.View animation="fadeInUp" style={styles.border}>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: "#fff",
                  top: "-30%",
                  left: "30%",
                  color: "#FEB518",
                  fontFamily: "Tajawal-Bold",
                }}
              >
                عنوان الطلب
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: "#fff",
                  top: "-15%",
                  color: "#4f3c75",
                  fontFamily: "Tajawal-Regular",
                }}
              >
                {this.state.reqTitle}
              </Text>
            </Animatable.View>
            <Animatable.View animation="fadeInUp" style={styles.border}>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: "#fff",
                  top: "-29%",
                  left: "13%",
                  color: "#FEB518",
                  fontFamily: "Tajawal-Bold",
                }}
              >
                المبلغ المستحق للتصميم
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: "#fff",
                  top: "-15%",
                  color: "#4f3c75",
                  fontFamily: "Tajawal-Regular",
                }}
              >
                {price} ريال سعودي
              </Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp"  style={styles.border}>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: "#fff",
                  top: "-32%",
                  left: "23%",
                  color: "#FEB518",
                  fontFamily: "Tajawal-Bold",
                }}
              >
                من البطاقة رقم:
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: "#fff",
                  top: "-15%",
                  color: "#4f3c75",
                  fontFamily: "Tajawal-Regular",
                }}
              >
                {this.state.cardNumber}
              </Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.border}>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: "#fff",
                  top: "-30%",
                  left: "28%",
                  color: "#FEB518",
                  fontFamily: "Tajawal-Bold",
                }}
              >
                إلى المصمم
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: "#fff",
                  top: "-15%",
                  color: "#4f3c75",
                  fontFamily: "Tajawal-Regular",
                }}
              >
                {designerName}
              </Text>
            </Animatable.View>
          </View>

          {this.state.submitted && (
            <TouchableOpacity
              style={styles.returnbutton}
              onPress={() => this.popUpWindow()}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 25,
                  fontWeight: "500",
                  marginTop:"2%",
                  fontFamily: "Tajawal-Regular",
                }}
              >
                العودة
              </Text>
            </TouchableOpacity>
          )}

          {this.state.popup && (
            <Animatable.View style={styles.popUp} animation="bounceIn">
              <Text style={{ color: "#4F3C75", fontSize: 16 }}>
                كيف كانت تجربتك ؟
              </Text>

              <AirbnbRating
                count={5}
                reviews={["سيئة", "متوسطة", "جيدة", "ممتازة", "ممتازة جداً"]}
                defaultRating={3}
                size={20}
                onFinishRating={this.ratingCompleted}
              />
              <TouchableOpacity
                style={styles.smallbutton}
                onPress={() => this.sendFunction()}
              >
                <Text
                  style={{
                    color: "#FFEED6",
                    fontSize: 15,
                    fontWeight: "500",
                  }}
                >
                  أرسل
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          )}

          {!this.state.submitted && (
            <TouchableOpacity
              style={styles.returnbutton}
              onPress={() => this.onSubmit()}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 25,
                  fontWeight: "500",
                  marginTop:"2%",
                  fontFamily: "Tajawal-Regular",
                }}
              >
                ادفع الآن
              </Text>
            </TouchableOpacity>
          )}
             {this.state.popup2 && 
        <Animatable.View style={styles.popUp2} animation="bounceIn">
          
        <LottieView
        source={require('../assets/lottie/pay.json')}
        loop={false}
        
        onAnimationFinish={() => this.finish()}
       speed={1}
        autoPlay
     
        style={{ width: "100%", height: "95%" ,alignSelf:"center",justifyContent:"center",right:"1%",top:"-3%"
        
        //margin:"5%"
      }}
      />
      
      <Text style={{ color: "#603F98", fontSize: 18 , fontFamily:"Tajawal-Medium",marginBottom:"3%",top:"-10%"}}>
           { this.state.doneText}
          </Text>
          <Text style={{ color: "#FEB518", fontSize: 18 , fontFamily:"Tajawal-Medium",marginBottom:"5%",top:"-10%"}}>
           { this.state.doneText2}
          </Text>
         
          </Animatable.View>}
        </Animatable.View >
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    top: "5%",
    padding: "1%",
  },popUp2: {
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: "80%",
    height: "37%",
    width: "75%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    borderRadius: 30,
  },
  popUp: {
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: "50%",
    height: "20%",
    width: "75%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    borderRadius: 30,
  },
  returnbutton: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: "1%",
    justifyContent: "center",
    borderRadius: 25,
    width: "80%",
    height: "6%",
    alignSelf: "center",
    bottom: "-5%",
  },
  smallbutton: {
    alignItems: "center",
    backgroundColor: "#4F3C75",
    padding: "1%",
    justifyContent: "center",
    borderRadius: 25,
    width: "20%",
    height: "15%",
    alignSelf: "center",
    bottom: "-15%",
  },
  forText: {
    position: "absolute",
    top: "0%",
    right: "22%",
    color: "#4F3C75",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "600",
  },
  border: {
    marginTop: "12%",
    backgroundColor: "#ffffff",
    fontSize: 24,
    borderRadius: 25,
    borderColor: "#4f3c75",
    borderWidth: 0.5,

    width: 350,
    height: 70,
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
  done: {
    marginTop: "5%",
    backgroundColor: "#d7f0d7",
    fontSize: 24,
    borderRadius: 25,
    borderColor: "#04BF9D",
    borderWidth: 2,

    width: 350,
    height: 70,
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
});
