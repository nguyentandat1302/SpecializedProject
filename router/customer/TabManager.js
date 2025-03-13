import Setting from "../../screen/manager/Setting";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterHome from "../manager/RouterHome";


const Tab = createMaterialBottomTabNavigator()

const TabManager = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="routerhome" component={RouterHome}
        options={{
          tabBarIcon: "home",
          title: "Home",
        }}
      />
      <Tab.Screen name="payments" component={Payments}
        options={{
          tabBarIcon: "cash",
        }}
      />
      <Tab.Screen name="Customers" component={Customers}
        options={{
          tabBarIcon: "account",
        }}
      />
      <Tab.Screen name="setting"  component={Setting}
        options={{
          tabBarIcon: "cog",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabManager;
