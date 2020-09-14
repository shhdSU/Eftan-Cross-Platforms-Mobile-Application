import { StatusBar } from "expo-status-bar";
//import HomeStack from "./routes/HomeStack";
import firebase from "../Eftan/database/firebase";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./components/login";
import SignupScreen from "./components/signup";
import GalleryScreen from "./components/gallery";
import CprofileScreen from "./components/Cprofile";

const Navigation = createStackNavigator({
  "صفحة التسجيل": { screen: SignupScreen },
  "صفحة الدخول": { screen: LoginScreen },
  gallery: { screen: GalleryScreen },
  Cprofile: { screen: CprofileScreen },
});

export default createAppContainer(Navigation);
