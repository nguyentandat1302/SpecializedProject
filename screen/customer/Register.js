import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const cUSERS = firestore().collection('USERS');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    cUSERS.doc(email).get()
      .then(querySnapshot => {
        if (querySnapshot.exists) {
          Alert.alert("Registration Error", "Email already exists.");
        } else {
          auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              //const user = userCredential.user;

              cUSERS.doc(email).set({
                fullName: fullName,
                email: email,
                createdAt: firestore.FieldValue.serverTimestamp()
              }).then(() => {
                console.log(`Registered User: ${fullName}, Email: ${email} , password ${password}`);
                navigation.navigate("login")
              }).catch((error) => {
                console.error("Error saving user data: ", error);
              });
            })
            .catch((error) => {
              Alert.alert("Registration Error", error.message);
            });
        }
      })
      .catch(error => {
        console.error("Error checking user data: ", error);
        Alert.alert("Error", "Could not check user data. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Register Badminton Court</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Confirm Password *</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={styles.loginRedirect}>
          Already have an account? Login here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#F50057',
  },
  form: {
    marginTop: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#F50057',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginRedirect: {
    marginTop: 15,
    textAlign: 'center',
    color: '#F50057',
  },
});

export default Register;
