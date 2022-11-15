import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { TOPNAVI_H, BANNER_H } from '../const/constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../const/colors';
import { useNavigation } from "@react-navigation/native";


const TopNavigation = props => {
  const safeArea = useSafeArea();
  const navigation = useNavigation();

  const { title, scrollA } = props;
  const isFloating = !!scrollA;
  const [isTransparent, setTransparent] = useState(isFloating);

  useEffect(() => {
    if (!scrollA) {
      return;
    }
    const listenerId = scrollA.addListener(a => {
      const topNaviOffset = BANNER_H - TOPNAVI_H - safeArea.top;
      isTransparent !== a.value < topNaviOffset &&
        setTransparent(!isTransparent);
    });
    return () => scrollA.removeListener(listenerId);
  });

  return (
    <>
      <StatusBar
        barStyle={isTransparent ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.container(safeArea, isFloating, isTransparent)}>
        <Icon style={styles.icon(isTransparent)}
          name="arrow-left"
          size={28}
          color={COLORS.white}
          onPress={navigation.goBack}
        />
        <Text style={styles.title(isTransparent)}>{title}</Text>
      </View>
    </>
  );
};

const styles = {
  container: (safeArea, isFloating, isTransparent) => ({
    paddingTop: safeArea.top,
    marginBottom: isFloating ? -TOPNAVI_H - safeArea.top : 0,
    height: TOPNAVI_H + safeArea.top,
    shadowOffset: { y: 0 },
    backgroundColor: isTransparent ? '#0001' : '#FFF',
    shadowOpacity: isTransparent ? 0 : 0.5,
    elevation: isTransparent ? 0.01 : 5,
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  }),
  title: isTransparent => ({
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'tr-bold',
    color: isTransparent ? '#FFF' : '#000',
  }),
  icon: isTransparent => ({
    position: 'absolute',
    left: 10,
    top: 40,
    color: isTransparent ? '#FFF' : '#000',
  }),
};

export default TopNavigation;