import { StatusBar } from "expo-status-bar";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./components/login";
import SignupScreen from "./components/signup";
import firebase from "../Eftan/database/firebase";

const Navigation = createStackNavigator({
  Signup: { screen: SignupScreen },
  Login: { screen: LoginScreen },
});
export default createAppContainer(Navigation);
