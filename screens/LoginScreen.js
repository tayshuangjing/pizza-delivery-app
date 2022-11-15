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
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import COLORS from '../const/colors';


const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.push("Home");
      } 
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    navigation.push("Register");
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../assets/login2.jpg")} />
          {/* <Text style={styles.logoText}>Pitza</Text> */}
        </View>
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>     
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    color: "black",
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
    backgroundColor: COLORS.yellow,
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
    width: 250,
    alignContent: 'center'
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: "center",
    paddingBottom: "5%",
  },
  logoText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: "tr-regular",
    textAlign: 'center',
  },
});