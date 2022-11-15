import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,

} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, createUserDocument } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import COLORS from '../const/colors';
import { formatPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-input-auto-format";

const RegisterScreen = () => {

    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();

    // formatPhoneNumber = (phoneNumberString) => {
    //     let newText = '';
    //     let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    //     for (var i = 0; i < cleaned.length; i++){
    //         if (i == 0){
    //             newText = '('
    //         } else if (i == 2){
    //             newText = newText + ') '
    //         } else if (i == 6){
    //             newText = newText + '-';
    //         }
    //         newText = newText + cleaned[i];
    //     }
    //     this.setState({number: newText});
    // };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.push("Home");
            }
        });
        return unsubscribe;
    }, []);

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(async (userCredentials) => {
                const user = userCredentials.user;
                console.log("Registered with", user.email);
                await createUserDocument(user, { username }, { phoneNumber });
            })

            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    alert("That email address is already in use!");
                }
                if (error.code === "auth/invalid-email") {
                    alert("That email address is invalid!");
                }
                console.error(error);
            });
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.inputContainer}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require("../assets/register.jpg")} />
                    {/* <Text style={styles.logoText}>Pitza</Text> */}
                </View>
                <TextInput
                    placeholder="Name"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Phone"
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                {/* <PhoneInput
                    placeholder="Phone number"
                    value={inputValue}
                    onChange={(e) => handleInput(e)}
                    style={styles.input}
                /> */}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: COLORS.grey,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 30,
        fontFamily: "tr-regular",
        color: 'black',
        borderRadius: 50,
        fontSize: 14
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,

    },
    button: {
        backgroundColor: COLORS.primary,
        width: "70%",
        padding: 10,
        marginVertical: 20,
        alignItems: "center",
        borderRadius: 50,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 14,
        fontFamily: "tr-regular",
    },
    buttonOutline: {
        backgroundColor: COLORS.blue,
        marginTop: 5,
        borderRadius: 50,
    },
    buttonOutlineText: {
        color: COLORS.white,
        fontSize: 14,
        fontFamily: "tr-regular",
    },
    logo: {
        height: 180,
        width: 300,
    },
    logoContainer: {
        alignItems: "center",
        paddingBottom: "5%",
    },
    logoText: {
        color: COLORS.white,
        fontSize: 14,
        fontFamily: "tr-regular",
        textAlign: 'center',
      },
})