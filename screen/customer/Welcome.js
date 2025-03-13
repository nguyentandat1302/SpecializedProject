import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList } from 'react-native';

const images = [];
//   { id: '1', uri: require('../../image/badminton.jpg') },
//   { id: '2', uri: require('../../image/basketball.jpg') },
//   { id: '3', uri: require('../../image/football.jpg') },
//   { id: '4', uri: require('../../image/tennis.jpg') },
// ];

const Welcome = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('login');
  };

  const renderImageItem = ({ item }) => (
    <ImageBackground source={item.uri} style={styles.imageBackground} resizeMode="cover">
      <TouchableOpacity style={styles.textContainer} onPress={handlePress}>
        <Text style={styles.text}>Welcome to Sports</Text>
      </TouchableOpacity>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  text: {
    color: '#F50057',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Welcome;
