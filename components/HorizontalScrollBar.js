import { useState, Pressable } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import categoryData from '../data/categoryData';




// const getSelectedItems = (item) => selectedItems.includes(item.key);

const Item = (props) => {

    // References the useState in HorizontalScrollBar
    const selectItem = (item) => {
        if (props.selectedItems.includes(item.name)) {
            props.setSelectedItems([]);
        } else {
            props.setSelectedItems([item.name]);
        }
        // console.log(props.selectedItems[0])
        // THIS WOULD BE MULTI SELECT/DESELECT
        // if (props.selectedItems.includes(item.key)) {
        //     const newListItems = props.selectedItems.filter(itemKey => itemKey !== item.key);
        //     props.setSelectedItems(newListItems);
        // } else {
        //     props.setSelectedItems([...props.selectedItems, item.key]);
        // }
    }

    return (
        //style={({ pressed }) => [pressed ? FlatListItemPressed : FlatListItem]}
        <TouchableOpacity 
        onPress={() => selectItem(props.item)}
        activeOpacity={1}
        >
            <View style={{
                flex: 1
            }}
            // selected={getSelectedItems(item)
            // }
            >
                <Image 
                    source={props.item.image}
                    style={[styles.FlatListIcon,
                        props.selectedItems.includes(props.item.name) && styles.FlatListIconPressed]}
                >
                </Image>
                <View>
                    <Text style={[styles.FlatListText,
            props.selectedItems.includes(props.item.name) && styles.FlatListTextPressed]}>{props.item.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const HorizontalScrollBar = (props) => {

    return (
        <View style={{
            marginLeft: 16,
        }}>
            <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            >
                <FlatList 
                data={props.categoryData}
                renderItem={({item, index}) => {
                    return (
                        <Item item={item} index={index} selectedItems={props.selectedItems} setSelectedItems={props.setSelectedItems}></Item>
                    )
                }}
                numColumns={Math.ceil(props.categoryData.length / 2)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                // horizontal
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    FlatListText: {
        color: '#000',
        padding: 10,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    FlatListTextPressed: {
        color: '#0165EC',
    },
    FlatListIcon: {
        width: 80, 
        height: 80, 
        marginHorizontal: 10,
        marginRight: 16, 
        marginBottom: 4,
        tintColor: '#000',
    },
    FlatListIconPressed: {
        tintColor:'#0165EC',
    }
})

export default HorizontalScrollBar