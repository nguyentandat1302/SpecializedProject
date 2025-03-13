import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../../context";
import { Avatar, IconButton } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import ServicesCustomer from "../../screen/customer/ServicesCustomer";
import AddNewAppointment from "../../screen/customer/AddNewAppointment";

const Stack = createStackNavigator();
const RouterServiceCustomer = () => {


  return (
    <Stack.Navigator>
      <Stack.Screen name="servicescustomer" component={ServicesCustomer} />
      <Stack.Screen name="addnewappointment" component={AddNewAppointment} />

    </Stack.Navigator>
  );
};

export default RouterServiceCustomer;
