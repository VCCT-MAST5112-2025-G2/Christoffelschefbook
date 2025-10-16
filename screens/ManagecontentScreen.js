import React from "react";
import { View, Text, Button, StyleSheet,Image, FlatList, TouchableOpacity, navigation } from "react-native";

export default function ManagecontentScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Content</Text>
            <FlatList></FlatList>
            </View>
    );
}