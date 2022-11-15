import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../const/colors';
import promos from '../const/promos';
import newmenus from '../const/newmenus';

const {width} = Dimensions.get('screen');

const HomeScreen = ({navigation}) => {

  const Card = ({promo}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Detail', promo)}>
        <ImageBackground style={style.cardImage} source={promo.image}>
          {/* <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {promo.name}
          </Text> */}
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <View style={{flexDirection: 'row'}}>
              {/* <Icon name="promo" size={20} color={COLORS.white} />
              <Text style={{marginLeft: 5, color: COLORS.white}}>
                {promo.location}
              </Text> */}
            </View>
            <View style={{flexDirection: 'row'}}>
              {/* <Icon name="star" size={20} color={COLORS.white} /> */}
              {/* <Text style={{marginLeft: 5, color: COLORS.white}}>5.0</Text> */}
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const RecommendedCard = ({promo}) => {
    return (
      <ImageBackground style={style.rmCardImage} source={promo.image}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 22,
            marginTop: 10,
            fontFamily: 'tr-bold'
          }}>
          {promo.name}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              {/* <Icon name="promo" size={22} color={COLORS.white} />
              <Text style={{color: COLORS.white, marginLeft: 5}}>
                {promo.location}
              </Text> */}
            </View>
            {/* <View style={{flexDirection: 'row'}}>
              <Icon name="star" size={22} color={COLORS.white} />
              <Text style={{color: COLORS.white, marginLeft: 5}}>5.0</Text>
            </View> */}
          </View>
          {/* <Text style={{color: COLORS.white, fontSize: 13}}>
            {promo.details}
          </Text> */}
        </View>
      </ImageBackground>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 150,
            paddingHorizontal: 20,
            paddingTop: 50
          }}>
          <View style={{flex: 1}}>
            <Text style={style.headerTitle}>Explore Promotions</Text>
            <Text style={style.headerTitle}>and New menus</Text>
          </View>
        </View>
        
        <Text style={style.sectionTitle}>Promotion</Text>
        <View>
          <FlatList
            contentContainerStyle={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={promos}
            renderItem={({item}) => <Card promo={item} />}
          />
          <Text style={style.sectionTitle}>New Menu</Text>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{paddingLeft: 20, paddingBottom: 20}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={newmenus}
            renderItem={({item}) => <RecommendedCard promo={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    fontFamily: 'tr-bold',
    fontSize: 23,
  },
  inputContainer: {
    height: 60,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    top: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontFamily: 'tr-bold',
    fontSize: 20,
  },
  cardImage: {
    height: 220,
    width: width - 40,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  rmCardImage: {
    width: width / 2,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
});
export default HomeScreen;