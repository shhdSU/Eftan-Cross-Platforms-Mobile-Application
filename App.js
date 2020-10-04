import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./components/login";
import SignupScreen from "./components/signup";
import GalleryScreen from "./components/gallery";
import DprofileScreen from "./components/DProfile"; // Access by Client
import privacyPolicyScreen from "./components/privacyPolicy";
import ForgotPassword from "./components/ForgotPassword";
import DesignerProfile from "./components/designerProfile"; // Access by Designer
import RequestScreen from "./components/requestForms";

const Navigation = createStackNavigator(
  {
    "صفحة الطلب": { screen: RequestScreen },
    "صفحة الدخول": { screen: LoginScreen },
    "صفحة التسجيل": { screen: SignupScreen },
    "معرض الصور": { screen: GalleryScreen },
    "صفحة المصمم": { screen: DprofileScreen },
    "سياسة الخصوصية": { screen: privacyPolicyScreen },
    "نسيت كلمة السر!": { screen: ForgotPassword },
    "الملف الخاص بي": { screen: DesignerProfile },
  },
  { headerMode: "none" }
);

export default createAppContainer(Navigation);
