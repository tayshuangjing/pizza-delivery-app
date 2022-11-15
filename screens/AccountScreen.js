
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    Image,
} from "react-native";
import { auth, firestore } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import COLORS from "../const/colors";

const AccountScreen = () => {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState([]);

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.navigate("Login");
                console.log("User signed out.");
            })
            .catch((error) => alert(error.message));
    };

    useEffect(() => {
        const asyncFetch = async () => {
            await firestore
                .collection("users")
                .doc(auth.currentUser.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUserInfo(snapshot.data());
                    } else {
                        asyncFetch();
                    }
                });
        };
        asyncFetch();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Email: {auth.currentUser?.email}</Text>
            <Text style={styles.text}>Username: {userInfo.username} </Text>
            <TouchableOpacity onPress={handleSignOut} style={styles.button}>
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        backgroundColor: COLORS.primary,
        width: "60%",
        padding: 15,
        borderRadius: 50,
        alignItems: "center",
        marginTop: 40,
    },
    buttonText: {
        color: "white",
        fontFamily: "tr-bold",
        fontSize: 16,
    },
    header: {
        position: "absolute",
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 20,
        justifyContent: "flex-start",
        backgroundColor: COLORS.secondary,
        flexDirection: "row",
        borderBottomEndRadius: 20,
        borderBottomLeftRadius: 20,
        width: "100%",
        top: 0,
    },
    text: {
        fontFamily: "tr-regular",
    }
});

export default AccountScreen;