import React, {useState} from "react";
import { View, Text, Button, StyleSheet,Image, FlatList, TouchableOpacity, } from "react-native";

export default function ManagecontentScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Courses</Text>
                            <TouchableOpacity style={styles.dropdown}>
                                <Text style={styles.dropdownText}>{sortOption}</Text>
                            </TouchableOpacity>
        </View>
    );
}