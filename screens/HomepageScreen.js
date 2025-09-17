import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomepageSreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Christoffel's Chef Book!</Text>
            <Text style={styles.subtitle}>Your personal recipe manager.</Text>
            <Button
                title="Get Started"
                onPress={() => navigation.navigate('Welcome')}
            />
        </View>
    );
}