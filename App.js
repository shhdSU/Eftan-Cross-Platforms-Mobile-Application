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
import clientprofile from "./components/clientprofile";
import clientedit from "./components/clientedit";
import designerprofile from "./components/designerprofile";
import designeredit from "./components/designeredit";
import designerGallery from "./components/designerGallery";
import Explore from "./components/Explore";
import logos from "./components/logos";
import posters from "./components/posters";
import brands from "./components/brands";
import packages from "./components/packages";
import digitals from "./components/digitals";
import filters from "./components/filters";
import certifications from "./components/certifications";
import others from "./components/others";
import UploadNewDesign from "./components/UploadNewDesign";
import test from "./components/test";

const Navigation = createStackNavigator(
  {
    تست: { screen: test },

    "صفحة الدخول": { screen: LoginScreen },
    "رفع تصميم جديد": { screen: UploadNewDesign },

    اكسبلور: { screen: Explore },

    شعار: { screen: logos },
    ملصق: { screen: posters },
    "علامة تجارية": { screen: brands },
    "تغليف المنتج": { screen: packages },
    "الفن الرقمي": { screen: digitals },
    "فلاتر سنابتشات": { screen: filters },
    شهادات: { screen: certifications },
    "غير ذلك": { screen: others },

    "صفحة التسجيل": { screen: SignupScreen },
    "معرض المصمم": { screen: GalleryScreen },

    "صفحة المصمم": { screen: DprofileScreen },
    "سياسة الخصوصية": { screen: privacyPolicyScreen },
    "نسيت كلمة السر!": { screen: ForgotPassword },
    "الملف الخاص بي": { screen: DesignerProfile },
    "صفحة الطلب": { screen: RequestScreen },
    clientprofile: { screen: clientprofile },
    clientedit: { screen: clientedit },
    designerprofile: { screen: designerprofile },
    designeredit: { screen: designeredit },
    designerGallery: { screen: designerGallery },
  },
  { headerMode: "none" }
);

export default createAppContainer(Navigation);
