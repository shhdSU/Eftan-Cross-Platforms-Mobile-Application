import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./components/login";
import SignupScreen from "./components/signup";
import GalleryScreen from "./components/gallery";
import DprofileScreen from "./components/DProfile"; // Access by Client
import privacyPolicyScreen from "./components/privacyPolicy";
import ForgotPassword from "./components/ForgotPassword";
import DesignerProfile from "./components/designerProfile"; // Access by Designer
import RequestScreen from "./components/requestPage";
import UploadNewDesign from "./components/uploadNewDesign";

const Navigation = createStackNavigator(
  {
    "رفع تصميم جديد": { screen: UploadNewDesign },
    "صفحة الدخول": { screen: LoginScreen },
    "صفحة التسجيل": { screen: SignupScreen },
    "معرض المصمم": { screen: GalleryScreen },
    "صفحة المصمم": { screen: DprofileScreen },
    "سياسة الخصوصية": { screen: privacyPolicyScreen },
    "نسيت كلمة السر!": { screen: ForgotPassword },
    "الملف الخاص بي": { screen: DesignerProfile },
    "صفحة الطلب": { screen: RequestScreen },
  },
  { headerMode: "none" }
);

export default createAppContainer(Navigation);
