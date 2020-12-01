//For payment
import React from 'react';
import AddSubscriptionView from './AddSubscriptionView';
import { StyleSheet, Alert, Text,TouchableWithoutFeedback, Keyboard } from "react-native";
import Svg, { Defs, G, Path } from "react-native-svg";
import {View } from 'native-base';
import firebase from "../database/firebase";


const STRIPE_ERROR = 'حدث خطأ في خدمة الدفع لدينا، يرجى المحاولة مجددًا';
const SERVER_ERROR = 'هناك مشكلة في خادم الدفع، يرجى المحاولة مجددًا';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51HiMF9G34qBjP7xldEHn8YE1AHhdKfrGBrAO9Y6CUhdkg46TFU6ctgoIkzhkyUMq0NUthM9LPjHCMXUbDhKJllPk00JRFM30PX';

//get card token from Stripe API
const getCreditCardToken = (creditCardData) => {
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).then(response => 
    response.json());
};
/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
const subscribeUser = (creditCardToken) => {
  return new Promise((resolve) => {
    
    setTimeout(() => {
      resolve({ status: true });
    }, 1000)
  });
};

export default class AddSubscription extends React.Component {
  
  constructor(props) {
    var Request = props.navigation.state.params.obj;
    
    super(props);
    this.state = {
      Imagekey:Request.Imagekey,
      DID:Request.DID,
      reqTitle:Request.title,
      submitted: false,
      error: null
    }
    
  }
   //////for udate state values 
   updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }; //////END of udate state values function

  // Handles submitting the payment request
  onSubmit = async (creditCardInput) => {
    const { navigation } = this.props;
    // Disable the Submit button after the request is sent
    this.setState({ submitted: true });
    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(creditCardInput);
      if (creditCardToken.error) {
        // Reset the state if Stripe responds with an error
        // Set submitted to false to let the user subscribe again
        this.setState({ submitted: false, error: STRIPE_ERROR }),
        Alert.alert(
          "تنبيه",
          "تأكد من إدخال رقم البطاقة بشكل صحيح",
          [{ text: "حسنًا" ,
         
          }],
          { cancelable: false }
        );
        return;
      }
    } catch (e) {
      // Reset the state if the request was sent with an error
      // Set submitted to false to let the user subscribe again
      this.setState({ submitted: false, error: STRIPE_ERROR });
      return;
    }
    // Send a request to your server with the received credit card token
    const { error } = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      this.setState({ submitted: false, error: SERVER_ERROR })
    } else {
      this.setState({ submitted: false, error: null }),
      firebase
      .database()
      .ref("Client/" + firebase.auth().currentUser.uid)
      .update({
        creditCardToken: creditCardToken.id,
              })
      .then(
      Alert.alert(
        "تنبيه",
        "تم حفظ بيانات بطاقتك الائتمانية بنجاح، سيتم نقلك إلى خطوة الدفع",
        [{ text: "حسنًا" ,
       
        }],
        { cancelable: false }
      ),
      navigation.navigate('Invoice',{reqTitle: this.state.reqTitle,creditCardToken:creditCardToken.id,cardNumber:"**** **** **** "+creditCardToken.card.last4, reqKey: this.state.Imagekey, DID:this.state.DID})   //@shhdSU

      )}
  };

   
   
  // render the subscription view component and pass the props to it
  render() {
    const { submitted, error } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style = {styles.container}>
 <Svg
          width={416}
          height={144}
          style={{ alignSelf: "center", top: "-3%", position: "relative",
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
            {/* <G filter="url(#prefix__a)">
              <Path
                data-name="Path 117"
                d="M47 6h322a38 38 0 0138 38v50a38 38 0 01-38 38H47A38 38 0 019 94V44A38 38 0 0147 6z"
                fill="#ffeed6"
              />
            </G> */}
            {
              <Path
                data-name="Icon ionic-ios-arrow-back"
                d="M53.706 96.783l8.135-8.912a1.793 1.793 0 000-2.379 1.449 1.449 0 00-2.176 0L50.45 95.59a1.8 1.8 0 00-.045 2.323l9.256 10.169a1.451 1.451 0 002.176 0 1.793 1.793 0 000-2.379z"
                fill="#FEB518"
              />
            }
            <Path
              data-name="Icon material-menu"
              onPress={() => this.props.navigation.toggleDrawer()}
              d="M336.676 109.883H377V105.4h-40.324zm0-11.2H377V94.2h-40.324zm0-15.683v4.48H377V83z"
              fill="#FEB518"
            />
          </G>
        </Svg>
        <Text
          style={{
            fontSize: 24,
            color: "#4F3C75",
            fontWeight: "600",
            top: "-9%",
            alignSelf: "center",
            zIndex: 6,
            fontFamily: "Tajawal-Regular",
            
          }}
        >
          إضافة بطاقة جديدة
        </Text>
        
        <AddSubscriptionView
          error={error}
          submitted={submitted}
          onSubmit={this.onSubmit}
        />


</View>
</TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
});