import React, {useState} from "react";
import{useRouter} from 'expo-router';
import { View, Text, Button, StyleSheet,TouchableOpacity } from "react-native";


export default function WelcomeScreen({ navigation }) {

const router = useRouter();
    return (
        <View style={styles.container}>
    
            <Text style={styles.title}>Welcome to Christoffel's Chef Book!</Text>
         <TouchableOpacity style={styles.navButton} onPress={()=> router.push('/Get started')}>
         <Text style={styles.navText}> Get started </Text>
         </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Button:{

  },

  
});