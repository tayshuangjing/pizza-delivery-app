import React from 'react';

import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';

export function Product({ name, price, image, onPress }) {

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image
                style={styles.thumb}
                source={image}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>$ {price}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
    },
    thumb: {
        width: 140,
        height: 140,
        borderRadius: 20,
        marginLeft: 8
    },
    infoContainer: {
        padding: 16,
    },

    name: {
        fontSize: 10,
        fontWeight: 'bold',
    },

    price: {
        fontSize: 10,
        fontWeight: '600',
        marginBottom: 20,
    },

});