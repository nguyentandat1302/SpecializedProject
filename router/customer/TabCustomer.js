import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterServiceCustomer from "../../router/customer/RouterServiceCustomer";
import Setting from "../../screen/manager/Setting";

const Tab = createMaterialBottomTabNavigator()

const TabCustomer = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RouterServiceCustomer" component={RouterServiceCustomer}
        options={{
          tabBarIcon: "home",
          title: "Home",
        }}
      />
      <Tab.Screen name="History" component={History}
        options={{
          tabBarIcon: "clipboard",
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

export default TabCustomer;
