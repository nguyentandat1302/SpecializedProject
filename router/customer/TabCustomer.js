import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterServiceCustomer from "../../routersss/customer/RouterServiceCustomer";
import Setting from "../../screensss/admin/Setting";
import History from "../../screensss/customer/History";

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
