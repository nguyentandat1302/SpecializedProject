import { createStackNavigator } from "@react-navigation/stack";
import TabAdmin from "./TabManager";
import TabCustomer from "./TabCustomer";
import Login from "../../screen/customer/Login";
import Register from "../../screen/customer/Register";
import Welcome from "../../screen/customer/Welcome";


const Stack = createStackNavigator();

const MainRouter = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="Api" component={Api} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="tabadmin" component={TabAdmin} />
      <Stack.Screen name="tabcustomer" component={TabCustomer} />
     

    </Stack.Navigator>
  );
};

export default MainRouter;
