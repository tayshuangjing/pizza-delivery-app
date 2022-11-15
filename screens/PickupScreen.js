import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, FlatList, TextInput, Platform, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { render } from "react-dom";
import SwitchSelector from "react-native-switch-selector";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import COLORS from '../const/colors';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const Images = [
    { image: require("../assets/pizza.png") },
    { image: require("../assets/pizza.png") },
    { image: require("../assets/pizza.png") },
    { image: require("../assets/pizza.png") },
];

const markers = [
    {
        coordinate: {
            latitude: 4.326395602389938,
            longitude: 101.12803929049848,
        },
        title: "Pitza Shop - Kampar Perak",
        description: "Open 10.00 - 20.00",
        image: Images[0].image,
        rating: 4,
    },
    {
        coordinate: {
            latitude: 3.1066409656484555,
            longitude: 101.44678663372011,
        },
        title: "Pitza Shop - Penang Georgetown",
        description: "Open 10.00 - 20.00",
        image: Images[1].image,
        rating: 4,
    },
    {
        coordinate: {
            latitude: 3.10663159171329,
            longitude: 101.44680272697353,
        },
        title: "Pitza Shop - Ipoh South Gate",
        description: "Open 10.00 - 20.00",
        image: Images[2].image,
        rating: 4,
    },

]

export default function PickupScreen() {
    const initialMapState = {
        markers,
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    }
    const [state, setState] = React.useState(initialMapState);

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3);
            if (index >= state.markers.length) {
                index = state.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { coordinate } = state.markers[index];
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: state.region.latitudeDelta,
                            longitudeDelta: state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });
    });

    // const interpolations = state.markers.map((markers, index) => {
    //     const inputRange = [
    //         (index - 1) + CARD_WIDTH,
    //         index * CARD_WIDTH,
    //         ((index + 1) * CARD_WIDTH),
    //     ];

    //     const scale = mapAnimation.interpolate({
    //         inputRange,
    //         outputRange: [1, 1.5, 1],
    //         extrapolate: "clamp"
    //     });

    //     return { scale };
    // })

    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);

    return (
        <View style={styles.container}>
            <MapView
                ref={_map}
                initialRegion={state.region}
                style={styles.container}
                provider={PROVIDER_GOOGLE}
            >
                {state.markers.map((marker, index) => {
                    // const scaleStyle = {
                    //     transform: [
                    //         {
                    //             scale: interpolations[index].scale,
                    //         },
                    //     ],
                    // };
                    return (
                        <MapView.Marker key={index} coordinate={marker.coordinate}>
                            <Animated.View style={[styles.markerWrap]}>
                                <Animated.Image
                                    source={require("../assets/pizza.png")}
                                    style={[styles.marker]}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </MapView.Marker>
                    );
                })}
            </MapView>
            <View style={styles.searchBox}>
                <Ionicons name="ios-search" size={20} />
                <TextInput
                    placeholder="Search"
                    style={{ flex: 1, padding: 0 }}
                />
            </View>
            <Animated.ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                pagingEnabled
                snapToInterval={CARD_WIDTH}
                snapToAlignment="center"
                contentContainerStyle={{flexGrow: 1, justifyContent: "center"}}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
            >
                {state.markers.map((marker, index) => (
                    <View style={styles.card} key={index}>
                        {/* <Image
                            source={marker.image}
                            style={styles.cardImage}
                            resizeMode="cover"
                        /> */}
                        <View style={styles.textContent}>
                            <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                            {/* <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text> */}
                            <View style={styles.button}>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    style={[styles.signIn, {
                                        backgroundColor: COLORS.primary
                                    }]}
                                >
                                    <Text style={[styles.textSign, {
                                        color: "white",
                                        fontFamily: "tr-regular"
                                    }]}>Select this store</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBox: {
        position: "absolute",
        marginTop: Platform.OS == 'ios' ? 40 : 20,
        flexDirection: "row",
        backgroundColor: "#fff4e2",
        width: "90%",
        alignSelf: "center",
        borderRadius: 20,
        padding: 10,
        
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    card: {
        elevation: 2,
        backgroundColor: "#fff",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y:-2},
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage:{
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
    },
    cardDescription: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignItems: "center",
        marginTop: 5
    },
    signIn: {
        width: "100%",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
    },
    textSign: {
        fontSize: 14,
    }
})