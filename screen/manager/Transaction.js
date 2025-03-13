import { useState, useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection("APPOINTMENTS")
            .onSnapshot(async (snapshot) => {
                const transactionList = [];

                for (const doc of snapshot.docs) {
                    const appointmentData = doc.data();
                    const serviceDoc = await firestore()
                        .collection("SERVICES")
                        .doc(appointmentData.serviceID)
                        .get();

                    if (serviceDoc.exists) {
                        transactionList.push({
                            id: doc.id,
                            ...appointmentData,
                            serviceName: serviceDoc.data().serviceName,
                        });
                    }
                }

                setTransactions(transactionList);
            });

        return () => unsubscribe();
    }, []);

    const handleAccept = async (transactionId) => {
        await firestore().collection("APPOINTMENTS").doc(transactionId).update({
            state: "Accepted"
        });
    };

    const handleDelete = (transactionId) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this transaction?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: async () => {
                    await firestore().collection("APPOINTMENTS").doc(transactionId).delete();
                }},
            ]
        );
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.transactionCard}>
                <Text style={styles.textBold}>Service Name: {item.serviceName}</Text>
                <Text>Date and Time: {new Date(item.datetime.seconds * 1000).toLocaleString()}</Text>
                <Text>Status: {item.state}</Text>
                <Text>Customer: {item.customerID}</Text>
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.acceptButton}
                        onPress={() => handleAccept(item.id)}
                    >
                        <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDelete(item.id)}
                    >
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>List of Transactions</Text>

            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#f4f6f7", 
    },
    headerText: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#34495e", 
        textAlign: "center", 
    },
    transactionCard: {
        padding: 20,
        borderWidth: 1,
        borderColor: "#dfe6e9", 
        backgroundColor: "#ffffff", 
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4, 
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#2c3e50", 
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    acceptButton: {
        backgroundColor: "#27ae60", 
        padding: 12,
        borderRadius: 8,
        width: "45%",
        alignItems: "center",
    },
    deleteButton: {
        backgroundColor: "#e74c3c", 
        padding: 12,
        borderRadius: 8,
        width: "45%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },
});

export default Transactions;
