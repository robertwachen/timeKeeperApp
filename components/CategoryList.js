import { useState, Pressable } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import categoryData from '../data/categoryData';




const Item = (props) => {

    // References the useState in HorizontalScrollBar
    const selectItem = (item) => {
         if (props.selectedItems.includes(item.key)) {
            const newListItems = props.selectedItems.filter(itemKey => itemKey !== item.key);
            props.setSelectedItems(newListItems);
        } else {
            props.setSelectedItems([...props.selectedItems, item.key]);
        }
    }

    return (
        <TouchableOpacity 
        onPress={() => selectItem(props.item)}
        activeOpacity={1}
        >
            
            {/* Learn how to do modal expansion, perhaps lower priority */}
            <View 
            style={[styles.CategoryListContainer, 
            props.selectedItems.includes(props.item.key) && styles.CategoryListContainerExtended]}
            >
                <View style={styles.CategoryListIconContainer}>
                    <Image 
                        source={props.item.image}
                        style={styles.CategoryListIcon}
                    />
                </View>

                <View style={{marginLeft: 8}} />
                <View>
                    <Text style={styles.CategoryListH1}>
                        {props.item.name}
                    </Text>
                    <Text style={styles.CategoryListH2}>
                        X / Y hours
                    </Text>
                </View>

                <View style={styles.CategoryListStatusContainer}>
                    <View style={styles.CategoryListStatus} />
                    <Text style={styles.CategoryListH3}>
                        Falling Behind
                    </Text>
                </View>
            </View>

            {/* <View>
                <Text>second view</Text>
            </View> */}
            
        </TouchableOpacity>
    );
}

const CategoryList = (props) => {

    const [categoriesOpened, setCategoriesOpened] = useState([]);

    return (
        <View style={{
            marginLeft: 16,
            flex: 1,
        }}>
            {/* <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            > */}
                <FlatList 
                data={categoryData}
                renderItem={({item, index}) => {
                    return (
                        <Item item={item} index={index} selectedItems={categoriesOpened} setSelectedItems={setCategoriesOpened}></Item>
                    )
                }}
                />
            {/* </ScrollView> */}
        </View>
    );
}

const styles = StyleSheet.create({
    CategoryListContainer: {
        // justifyContent: 'center',
        alignItems: 'center',
        color: '#FBFBFB',
        margin: 10,
        marginBottom: 8,
        width: 336,
        height: 96,
        borderWidth: 2,
        borderColor: '#E9EAE4',
        borderRadius: 40,
        flexDirection: 'row'
    },
    CategoryListContainerExtended: {
        height: 224,
    },
    CategoryListIconContainer: {
        // color: '#D4F2F8', // fix
        backgroundColor: '#D4F2F8',
        borderRadius: 20,
        margin: 16,
        marginRight: 8,
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        // top: 4,
        // left: 4,
        // alignSelf: 'flex-start',
        // add position
    },
    CategoryListIcon: {
        width: 32,
        height: 32, 
        tintColor: '#3EC7F5',
        // add position
    },
    CategoryListH1: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    CategoryListH2: {
        fontSize: 16,
        color:'#949494',
    },
    CategoryListH3: {
        fontSize: 14,
        color:'#000',
    },
    CategoryListStatusContainer: {
        // alignSelf: 'flex-end',
        // backgroundColor: '#000',
        // flexBasis: '100%',
        paddingLeft: 24,
        width: 132,
        // justifyContent: 'center',
        // alignItems: 'center'
        flexDirection: 'row'
    },
    CategoryListStatus: {
        backgroundColor: '#EFCB4C',
        width: 16,
        height: 16,
        borderRadius: 20,
        marginRight: 8,
        // alignSelf: 'center'
    }
})

export default CategoryList