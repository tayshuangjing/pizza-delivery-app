import { StyleSheet, Text, Image,} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Onboarding from 'react-native-onboarding-swiper';
import COLORS from '../const/colors';

export default function FirstScreen() {
  const navigation = useNavigation();
  return (
    <Onboarding
      onSkip={() => navigation.navigate('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: COLORS.white,
          image: <Image style={styles.first} source={require('../assets/first.png')} />,
          title: <Text style={styles.textOne}>WELCOME TO PITZA</Text>,
          subtitle: <Text style={styles.textA}>Get your delicious Pizza.{'\n'}    anytime. anywhere.</Text>,
        },
        {
          backgroundColor: COLORS.white,
          image: <Image style={styles.second} source={require('../assets/second.png')} />,
          title: <Text style={[styles.textOne, styles.textTwo]}>FAST DELIVERY</Text>,
          subtitle: <Text style={[styles.textA, styles.textB]}>Have your order delivered {'\n'}          directly to you.</Text>,
        },
        {
          backgroundColor: COLORS.white,
          image: <Image style={styles.third} source={require('../assets/third.png')} />,
          title: <Text style={[styles.textOne, styles.textThree]}>LOCATION TRACKING</Text>,
          subtitle: <Text style={[styles.textA, styles.textC]}>Monitor your pizza deliveries.</Text>,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  first: {
    width: '100%',
    height: 250,
  },
  second: {
    width: '100%',
    height: 250,
  },
  third: {
    width: '100%',
    height: 250,
  },
  textOne: {
    fontFamily: 'tr-regular',
    fontSize: 25,
    marginBottom: 20,
    color: COLORS.primary
  },
  textTwo: {
    color: COLORS.primary,
  },
  textThree: {
    color: COLORS.primary
  },
  textA: {
    fontFamily: 'tr-regular',
    fontSize: 15,
    color: "black"
  },
  textB: {
    color: "black",
  },
  textC: {
    color: "black"
  },
});