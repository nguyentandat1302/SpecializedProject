import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Firestore from "@react-native-firebase/firestore";
import { MyContextControllerProvider } from "./context";
import auth from "@react-native-firebase/auth";
import MainRouter from "./router/customer/MainRouter";

const initial = () => {
  const cUSERS = Firestore().collection("USERS");
  const admin = {
    name: "Nguyen Tan Dat",
    phone: "0587944658",
    address: "Phu Yen",
    email: "abcdef@gmail.com",
    role: 'admin'
  };

  cUSERS.doc(admin.email).onSnapshot((doc) => {
    if (!doc.exists) {
      // Đăng ký user name
      auth()
        .createUserWithEmailAndPassword(admin.email, "123456")
        .then(() => {
          cUSERS.doc(admin.email).set(admin);
          console.log("Create New Account Admin");
        })
        .catch(e => console.log(e));
    }
  });
};

const App = () => {
  useEffect(() => {
    initial();
  }, []);

  // Sử dụng useNavigation để lấy navigation object
  const navigation = useNavigation();

  return (
    <NavigationContainer>
      <PaperProvider>
        <MyContextControllerProvider>
          <MainRouter navigation={navigation} />
        </MyContextControllerProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
