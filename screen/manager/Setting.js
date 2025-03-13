import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView, Alert } from 'react-native';
import { logout, useMyContextController } from '../../Context';
import AsyncStorage from '@react-native-async-storage/async-storage'; // to persist dark mode state

const Setting = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  // Load dark mode preference on component mount
  useEffect(() => {
    const loadDarkModePreference = async () => {
      const storedDarkMode = await AsyncStorage.getItem('darkMode');
      if (storedDarkMode !== null) {
        setDarkMode(JSON.parse(storedDarkMode));
      }
    };
    loadDarkModePreference();
  }, []);

  // Toggle dark mode and save preference
  const toggleDarkMode = async (value) => {
    setDarkMode(value);
    await AsyncStorage.setItem('darkMode', JSON.stringify(value));
  };

  // Toggle notifications with an alert
  const toggleNotifications = (value) => {
    setNotificationsEnabled(value);
    const message = value ? 'Notifications Enabled' : 'Notifications Disabled';
    Alert.alert('Notification Status', message, [{ text: 'OK' }]);
  };

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.headerTitle, isDarkMode && styles.darkHeaderTitle]}>Settings</Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkSectionTitle]}>Personal Information</Text>

        <TouchableOpacity style={[styles.option, isDarkMode && styles.darkOption]} onPress={() => navigation.navigate('profile')}>
          <Text style={[styles.optionText, isDarkMode && styles.darkOptionText]}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.option, isDarkMode && styles.darkOption]} onPress={() => navigation.navigate('changepassword')}>
          <Text style={[styles.optionText, isDarkMode && styles.darkOptionText]}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkSectionTitle]}>Preferences</Text>

        <View style={[styles.option, isDarkMode && styles.darkOption]}>
          <Text style={[styles.optionText, isDarkMode && styles.darkOptionText]}>Enable Notifications</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={(value) => toggleNotifications(value)}
          />
        </View>

        <View style={[styles.option, isDarkMode && styles.darkOption]}>
          <Text style={[styles.optionText, isDarkMode && styles.darkOptionText]}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={(value) => toggleDarkMode(value)}
          />
        </View>

        <TouchableOpacity style={[styles.option, isDarkMode && styles.darkOption]} onPress={() => navigation.navigate('favouritemovie')}>
          <Text style={[styles.optionText, isDarkMode && styles.darkOptionText]}>Favourite Movie</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={[styles.option, isDarkMode && styles.darkOption]} onPress={() => logout(dispatch)}>
          <Text style={[styles.optionText, { color: '#F44336' }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F50057',
    marginBottom: 20,
    textAlign: 'center',
  },
  darkHeaderTitle: {
    color: '#F50057', // Retain a vibrant color in dark mode, but you can modify this
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  darkSectionTitle: {
    color: '#fff',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 10,
  },
  darkOption: {
    backgroundColor: '#444', // Darker background in dark mode
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  darkOptionText: {
    color: '#fff', // White text in dark mode
  },
});

export default Setting;
