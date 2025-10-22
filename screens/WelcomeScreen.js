import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import HomeScreen from "./HomepageScreen";

export default function WelcomeScreen({ navigation }) {
  const router = useRouter(); // Router for navigation between screens
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Christoffel's Chef Book!</Text>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.navText}> View Menu </Text>
      </TouchableOpacity>
    </View>
  ); // Welcome screen with navigation to the homepage screen
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title:{
fontSize:20,
fontWeight:'bold',
marginBottom:100,
  },

  listContent: {
    paddingBottom: 120,
  },

  Button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: '50%',
  },


}); // Styles for the welcome screen components
