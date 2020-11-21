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
      AVG_Rate: 0,
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
  //////for udate state values
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }; //////END of udate state values function

  onSubmit() {
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
          .update({ status: "f" }),
          setTimeout(() => {
            Alert.alert(
              "تنبيه",
              "تمت عملية الدفع بنجاح، شكرًا لاختياركم اِفتن",
              [{ text: "حسنًا" }],
              { cancelable: false }
            ),
              this.updateInputVal(true, "submitted");
          }, 1000);
      } else
        Alert.alert(
          "تنبيه",
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
    AVG_Rate = (AVG_Rate + this.state.AVG_Rate) / raters;
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
        <View style={styles.container}>
          <Svg
            width={416}
            height={144}
            style={{
              alignSelf: "center",
              top: "-8%",
              position: "absolute",
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
              top: "1.5%",
            }}
          >
            الفاتورة
          </Text>

          <View style={{ top: "-3%" }}>
            {this.state.submitted && (
              <View style={styles.done}>
                <Text
                  style={{
                    fontSize: 20,
                    color: "#04BF9D",
                  }}
                >
                  تمت عملية الدفع بنجاح !
                </Text>
              </View>
            )}
            <View style={styles.border}>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: "#fff",
                  top: "-40%",
                  left: "30%",
                  color: "#4f3c75",
                }}
              >
                عنوان الطلب
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: "#fff",
                  top: "-20%",
                  color: "#4f3c75",
                }}
              >
                {this.state.reqTitle}
              </Text>
            </View>
            <View style={styles.border}>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: "#fff",
                  top: "-35%",
                  left: "16%",
                  color: "#4f3c75",
                }}
              >
                المبلغ المستحق للتصميم
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: "#fff",
                  top: "-20%",
                  color: "#4f3c75",
                }}
              >
                {price} ريال سعودي
              </Text>
            </View>

            <View style={styles.border}>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: "#fff",
                  top: "-40%",
                  left: "26%",
                  color: "#4f3c75",
                }}
              >
                من البطاقة رقم:
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: "#fff",
                  top: "-20%",
                  color: "#4f3c75",
                }}
              >
                {this.state.cardNumber}
              </Text>
            </View>

            <View style={styles.border}>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: "#fff",
                  top: "-40%",
                  left: "28%",
                  color: "#4f3c75",
                }}
              >
                إلى المصمم
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: "#fff",
                  top: "-20%",
                  color: "#4f3c75",
                }}
              >
                {designerName}
              </Text>
            </View>
          </View>

          {this.state.submitted && (
            <TouchableOpacity
              style={styles.returnbutton}
              onPress={() => this.popUpWindow()}
            >
              <Text
                style={{
                  color: "#FFEED6",
                  fontSize: 25,
                  fontWeight: "500",
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
                  color: "#FFEED6",
                  fontSize: 25,
                  fontWeight: "500",
                }}
              >
                ادفع الآن
              </Text>
            </TouchableOpacity>
          )}
        </View>
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
