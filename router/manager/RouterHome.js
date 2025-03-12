import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

const RouterHome = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  console.log("Test " + userLogin);

  return (
    <Stack.Navigator
      initialRouteName="services"
      screenOptions={{
        title: userLogin?.name ? userLogin.name : "User",
        headerLeft: null,
        headerRight: (props) => (
          <TouchableOpacity onPress={() => navigation.navigate("setting")} style={{ margin: 10 }}>
            <Avatar.Icon icon={"account"} size={30} style={{ backgroundColor: "white" }} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: "pink",
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="services" component={Services} />
      <Stack.Screen name="servicedetail" component={ServiceDetail} />
      <Stack.Screen name="addservice" component={AddService} />
      <Stack.Screen name="addcornpopservice" component={AddCornPopService} />
      <Stack.Screen name="payments" component={Payments} />

    </Stack.Navigator>
  );
};

export default RouterHome;
