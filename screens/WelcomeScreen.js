import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
          <Image source={require('C:\Christoffelschefbook\Christoffelschefbook\screens\images\WelcomeScreen.png.png')} style={{stylesimage}} />
            <Text style={styles.title}>Welcome to Christoffel's Chef Book!</Text>
            <Button
                title="Get Started"
                onPress={() => navigation.navigate('Home')}
            />
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

  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  
});