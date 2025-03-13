import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native-paper';
import { login, useMyContextController } from '../../Context';
import auth from "@react-native-firebase/auth"


const Login = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();
  //Lay userLogin tu store luc dau co the null
  const {userLogin} = controller
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const cUSERS = firestore().collection("USERS")
  const onSubmit = () => {
    if (email === '' || password === '') {
      Alert.alert('Login Error', 'Please enter both email and password');
      return;
    }
    // Su dung componnt login trong store de dang nhap voi email va pasword
    login(dispatch, email, password)
    //userLogin khac null
  };
  useEffect(()=>{ // 
    console.log(userLogin)
    if(userLogin!=null)
    {
      if(userLogin.role==='admin')
        navigation.navigate("tabadmin")
      else
        navigation.navigate("tabcustomer")
    }
    else
      navigation.navigate("login")
  }, [userLogin]) 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login BadmintonCourt</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Button onPress={() => navigation.navigate("register")}>
        Register New Account
      </Button>
      <Button onPress={() => navigation.navigate("resetpassword")}>
        If you Forgot your password, please Reset!
      </Button>
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
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F50057',
    marginBottom: 30,
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
  passwordContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
  },
  eyeIcon: {
    paddingRight: 10,
    fontSize: 20,
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

export default Login;
