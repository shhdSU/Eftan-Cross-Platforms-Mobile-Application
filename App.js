import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

//Initialize Firebase
// const firebaseConfig = {w
//   apiKey: "AIzaSyDtSPt8lV9R-dkmkCXxCI0xNadkq9aAtUk",
//   authDomain: "eftan2020.firebaseapp.com",
//   databaseURL: "https://eftan2020.firebaseio.com",
//   projectId: "eftan2020",
//   storageBucket: "eftan2020.appspot.com",
// };
class App extends React.Component {
  componentWillMount() {
    // To Configure react native app with cloud of Google Firebase database !
    var config = {
      apiKey: "AIzaSyDtSPt8lV9R-dkmkCXxCI0xNadkq9aAtUk",
      authDomain: "eftan2020.firebaseapp.com",
      databaseURL: "https://eftan2020.firebaseio.com",
      projectId: "eftan2020",
      storageBucket: "eftan2020.appspot.com",
      // messagingSenderId: "782913922565",
      // appId: "1:782913922565:web:856c5c1c336cf2e0415e6c",
      // measurementId: "G-J6S9B6L3WK",
    };

    firebase.initializeApp(config);
    firebase
      .database()
      .ref("Client/EftanClient")
      .set({
        CEmail: "email@email.com",
        CFirstName: "Sarah",
        CLastName: "Algwaiz",
        CPassword: "Password",
        CProfileImage: null,
      })
      .then(() => {
        console.log("INSERTED !");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
import {
  Container,
  Content,
  Header,
  Item,
  Form,
  Input,
  Button,
  Label,
} from "native-base";
// export default function App() {
//   return (
//     <Container style= {styles.container}>
//       <Form>
//         <Item>
//           <Label>Email</Label>
//           <Input
//           autoCorrect = {false}
//           autoCapitalize = "none"
//           />
//         </Item>
//       </Form>
//     </Container>
//      );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
