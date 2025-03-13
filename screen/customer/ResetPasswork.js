import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth"
const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const sendVerificationCode = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    } // thầy ơi em dùng 3 màng hình cho forgot , đầu tiền là mầng hình này check mail có tồn tại không, tiếp theoo tồn tại sẽ chuyển sang màng hình nhập 5 số , và cuối cùng là đổi mk á
    auth().sendPasswordResetEmail(email)
    .then(()=>{
      Alert.alert("Check email!!");
      navigation.navigate("login")
     }
    )
    .catch((e)=> console.log(e))
    // try {
    //   // Kiểm tra xem email có tồn tại trong Firestore không
    //   const userDoc = await firestore().collection('USERS').doc(email).get();
    //   if (!userDoc.exists) {
    //     Alert.alert('Error', 'Email not registered. Please check and try again.');
    //     return;
    //   }

    //   const code = Math.floor(10000 + Math.random() * 90000).toString();
    //   await firestore().collection('passwordResets').doc(email).set({
    //     code: code,
    //     email: email,
    //     createdAt: firestore.FieldValue.serverTimestamp(),
    //   });

    //   console.log(`Verification code ${code} sent to ${email}`);
    //   navigation.navigate('verify', { email: email });
    // } catch (error) {
    //   console.error('Error sending verification code:', error);
    //   Alert.alert('Error', 'Unable to send verification code. Please try again.');
    // }
  };
// em bị mất cái chỗ điều hướng sang trang forgot vậy h em vô đây thêm vô được không ạ

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={sendVerificationCode}>
        <Text style={styles.buttonText}>Send Verification Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#F50057',
  },
  input: {
    width: '80%',
    padding: 15,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    backgroundColor: '#F50057',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResetPassword;
