import firestore from "@react-native-firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import DatePicker from 'react-native-date-picker'
import { useMyContextController } from "../../Context";

const AddNewAppointment =({navigation, route})=>{
    const {id} = route.params.item
    const [service, setService] = useState({})
    const [datetime, setDatetime] = useState(new Date())

    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    const [open, setOpen] = useState(false)

    const SERVICES = firestore().collection("SERVICES")
    const APPOINTMENTS = firestore().collection("APPOINTMENTS")
    
    useEffect(()=>{
        SERVICES.doc(id).onSnapshot(reponse => setService(reponse.data()))
    },[])
    
    const handleAddNewAppointment=()=>{
        APPOINTMENTS.add(
            {
                customerID: userLogin.email,
                serviceID: id,
                datetime,
                state: "new"
            }
        )
        .then(response => APPOINTMENTS.doc(response.id).update({id: response.id}))
        navigation.navigate("appointments")
    }

    return(
        (service!=null)&&
        <View style={style.container}>
{/* image */}
        {((service.image)&&(<Image source={{uri: service.image}} style={{height:300}}/>))}

            
{/* service name */}
            <Text
                style={{
                    fontSize:24,
                    fontWeight:"bold",
                    margin: 10
                }}
            >
                Service Name : {service.serviceName}
            </Text>
            
            <Text
                style={{
                    fontSize:24,
                    fontWeight:"bold",
                    margin: 10
                }}
            >
                Price : {service.price}
            </Text>
            
            <TouchableOpacity 
                style={{
                    borderRadius: 10,
                    marginVertical: 10
                }}
                
            >
                <Text
                style={{
                    fontSize:24,
                    fontWeight:"bold",
                    margin: 10
                }}
                >
                    Choose date time: 
                </Text>
                <Text
                style={{
                    fontSize:24,
                    margin: 10,
                    backgroundColor: "aqua"
                }}
                onPress={()=> setOpen(true)}
                >
                    {datetime.toLocaleString()}
                </Text>
            </TouchableOpacity>
            <Button mode="contained"
                onPress={handleAddNewAppointment}
            >
                Add new appointment
            </Button>
            
            <DatePicker
                modal
                open={open}
                date={datetime}
                onConfirm={(date)=>{
                    setOpen(false)
                    setDatetime(date)
                }}
                onCancel={()=>{
                    setOpen(false)
                }}
            />
        </View>
    )
}
export default AddNewAppointment;

const style = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
    },
})