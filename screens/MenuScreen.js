import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    View,
    Image,
    TextInput,
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView,
    StyleSheet,
} from 'react-native';
import COLORS from '../const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import menus from '../const/menus';
const { height } = Dimensions.get('window');
const menuCategories = [
    { name: 'PIZZA', icon: 'pizza' },
    { name: 'SIDES', icon: 'food-drumstick-outline' },
    { name: 'DESSERT', icon: 'cupcake' },
    { name: 'DRINK', icon: 'cup' },
];

const Card = ({ menu, navigation, index }) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Detail', index)}>
            <Image
                source={menu.image}
                style={{
                    width: 140,
                    height: 140,
                    borderRadius: 20,
                    marginLeft: 8
                }}
            />
            <View style={style.infoContainer}>
                <Text style={style.name}>{menu.name}</Text>
                <Text style={style.price}>RM {menu.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

const MenuScreen = ({ navigation }) => {
    const handleDelivery = () => {
        navigation.push("Delivery");
    };

    const handlePickup = () => {
        navigation.push("Pickup");
    };

    const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
    const [filteredMenus, setFilteredMenus] = React.useState([]);

    const filterMenu = index => {
        const currentMenus = menus.filter(
            item => item?.menu?.toUpperCase() == menuCategories[index].name,
        )[0]?.menus;
        setFilteredMenus(currentMenus);
    };

    React.useEffect(() => {
        filterMenu(0);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, color: COLORS.white }}>
            <View style={style.header}>
                <TouchableOpacity onPress={handleDelivery}>
                    <Text style={{ color: COLORS.primary, fontSize: 16, fontFamily: 'tr-bold' }}>Delivery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePickup}>
                    <Text style={{ color: COLORS.primary, fontSize: 16, fontFamily: 'tr-bold' }}>Pickup</Text>
                </TouchableOpacity>
            </View>

            <View style={style.mainContainer}>
                {/* Render all the categories */}
                <View
                    style={{
                        width: 70,
                        height: "100%",
                        backgroundColor: "white"
                    }}>
                    {menuCategories.map((item, index) => (
                        <View key={'menu' + index} style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setSeletedCategoryIndex(index);
                                    filterMenu(index);
                                }}
                                style={[
                                    style.categoryBtn,
                                    {
                                        backgroundColor:
                                            selectedCategoryIndex == index
                                                ? COLORS.primary
                                                : COLORS.white,
                                    },
                                ]}>
                                <Icon
                                    name={item.icon}
                                    size={30}
                                    color={
                                        selectedCategoryIndex == index
                                            ? COLORS.white
                                            : COLORS.primary
                                    }
                                />
                                <Text style={[
                                    style.categoryBtnName,
                                    {
                                        color:
                                            selectedCategoryIndex == index
                                                ? COLORS.white
                                                : COLORS.primary,
                                    },
                                ]}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                {/* Render the cards with flatlist */}
                <View style={{ width: 300, paddingBottom: 200 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={filteredMenus}
                        keyExtractor = {(item,index)=>index.toString()}
                        renderItem = {({item,index})=>(
                            
                            <Card menu={item} navigation={navigation} index = {index}/>
                        )}
                        numColumns={2}
                    />
                </View>
            </View>

        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    header: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mainContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: COLORS.light,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: 20,
        minHeight: height,
    },
    searchInputContainer: {
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 7,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    categoryBtn: {
        height: 80,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    categoryBtnName: {
        color: COLORS.dark,
        fontSize: 8,
        marginTop: 5,
        fontFamily: 'tr-bold'
    },
    cardContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    cardDetailsContainer: {
        height: 120,
        backgroundColor: COLORS.white,
        flex: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 20,
        justifyContent: 'center',
    },
    cardImageContainer: {
        height: 150,
        width: 140,
        backgroundColor: COLORS.background,
        borderRadius: 20,
    },
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },

    name: {
        fontSize: 11,
        fontFamily: 'tr-bold'
    },
    price: {
        fontSize: 10,
        paddingTop: 10,
        marginBottom: 30,
        fontFamily: 'tr-regular'
    },
    categoryContainer: {
        alignContent: "center",

    },
    menuContainer: {
        width: 300,
    },
});
export default MenuScreen;