import { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import categoryData from '../data/categoryData';

const Item = (props) => {
    return (
        <View style={{
            flex: 1
        }}>
            <Image 
                source={props.item.image}
                style={{width: 100, height: 80, marginRight: 16, marginBottom: 4}}
            >
            </Image>
            <View>
                <Text style={styles.FlatListItem}>{props.item.name}</Text>
            </View>
        </View>
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
                        <Item item={item} index={index}></Item>
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
    FlatListItem: {
        color: '#000',
        padding: 10,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    }
})

export default HorizontalScrollBar