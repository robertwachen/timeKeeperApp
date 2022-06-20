import { useState, Pressable } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import categoryData from '../data/categoryData';




const Item = (props) => {
    // console.log(typeof(props.data['logs'].entries()))
    console.log('==========')
    console.log(JSON.stringify(props))

    function parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
      }
      

    const getMinutes = (d1, d2) => {

        var startDate = parseISOString(d1)
        var endDate = parseISOString(d2)
        startDate.setSeconds(0)
        endDate.setSeconds(0)
        startDate.setMilliseconds(0)
        endDate.setMilliseconds(0)

        // To calculate the time difference of two dates
        // console.log(startDate.getTime() + " start date time " + startDate);
        // console.log(endDate.getTime() + " end date time " + endDate);
        // console.log (endDate - startDate)
        var Difference_In_Time = endDate.getTime() - startDate.getTime();
        
        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        var Difference_In_Hours = Difference_In_Time / (1000 * 3600);

        var Difference_In_Minutes = Difference_In_Time / (1000 * 60);
        
        //To display the final no. of days (result)
        // console.log("Total number of time between dates  <br>"
        //             + startDate + "<br> and <br>" 
        //             + endDate + " is: <br> " 
        //             + Difference_In_Days + "days "
        //             + Difference_In_Hours + "hours "
        //             + Difference_In_Minutes + "minutes "
        //             + Difference_In_Time + " diff in time"
        //             );
        // console.log(Difference_In_Time + " diff in time ");
        // console.log(Difference_In_Minutes + " minutes ");

        return Difference_In_Minutes;
    }

    // References the useState in HorizontalScrollBar
    const selectItem = (item) => {
         if (props.selectedItems.includes(item.category)) {
            const newListItems = props.selectedItems.filter(itemCategory => itemCategory !== item.category);
            props.setSelectedItems(newListItems);
        } else {
            props.setSelectedItems([...props.selectedItems, item.category]);
        }
    }

    const totalHours = () => {
        var result = 0;
        for (var log in props.data['goals']) {
            var obj = props.data['goals'][log];
            // console.log(obj)
            if (obj["category"] == props.item.category)
            {
                    result = obj['hours'];
            }
        }
        return result
    }
    const hoursSpent = () => {
        var result = 0;
        for (var log in props.data['logs']) {
            var obj = props.data['logs'][log];
            // console.log(obj)
            if (obj["category"] == props.item.category)
            {
                    // result += 1;
                    // console.log(obj)
                    // console.log('getting minutes for ' + obj['startDate'] + " to " + obj['endDate'])
                    result += getMinutes(obj['startDate'], obj['endDate']);
                    // console.log('new total for ' + obj['category'] + ': ' + result)
            }
        }
        // result += 25
        // console.log(result + " before round")
        // result = (Math.ceil((result / 60) / 25) * 25).toFixed(2);

        // MAKES RESULT A STRING
        result = (Math.round((result / 60) * 4) / 4).toFixed(1)
        if (result % 1 == 0) {
            result = result.substring(0, result.length - 2)
        }
        // result = Math.round(result / (60 * 15)) * 15
        // console.log(result + "after round")
        return result
    }

    const imgPath = {
        'Startup':{
            image: require('../assets/icons/startup-fill-light.png')
        },
        'Waste': {
            image: require('../assets/icons/waste-fill-light.png')
        },
        'Body':{
            image: require('../assets/icons/body-fill-light.png')
        },
        'Social': {
            image: require('../assets/icons/social-fill-light.png')
        },
        'School': {
            image: require('../assets/icons/school-fill-light.png')
        },

    }
      
    
    return (
        <TouchableOpacity 
        onPress={() => selectItem(props.item)}
        activeOpacity={1}
        >
            
            {/* Learn how to do modal expansion, perhaps lower priority */}
            <View 
            style={[styles.CategoryListContainer, 
            props.selectedItems.includes(props.item.category) && styles.CategoryListContainerExtended]}
            >
                <View
                style={{flexDirection:'row', alignItems: 'center'}}
                >
                    <Image 
                            source={imgPath[props.item.category]['image']}
                            style={styles.CategoryListIconContainer}
                        />

                    <View style={{marginLeft: 8}} />
                    <View>
                        <Text style={styles.CategoryListH1}>
                            {props.item.category}
                        </Text>
                        <Text style={styles.CategoryListH2}>
                            {hoursSpent()} / {totalHours()} hours
                        </Text>
                    </View>
                </View>
                

                {/* {
                    props.selectItems.includes(props.item.category) ?
                    <View>
                        <Text> test</Text>
                    </View>
                    :
                    null
                } */}
                

                {/* FUTURE FEATURE */}
                {/* <View style={styles.CategoryListStatusContainer}>
                    <View style={styles.CategoryListStatus} />
                    <Text style={styles.CategoryListH3}>
                        Falling Behind
                    </Text>
                </View> */}
            </View>

            {/* <View>
                <Text>second view</Text>
            </View> */}
            
        </TouchableOpacity>
    );
}

const CategoryList = (props) => {
    const [categoriesOpened, setCategoriesOpened] = useState([]);

    console.log(''+ JSON.stringify(props.data['goals']) + 'in category list!')

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
                data={props.data["goals"]}
                renderItem={({item, index}) => {
                    return (
                        <Item item={item} index={index} selectedItems={categoriesOpened} setSelectedItems={setCategoriesOpened} data={props.data}></Item>
                    )
                }}
                />
            {/* </ScrollView> */}
        </View>
    );
}

const styles = StyleSheet.create({
    CategoryListContainer: {
        justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        backgroundColor: '#FBFBFB',
        margin: 10,
        marginBottom: 4,
        width: 336,
        height: 96,
        borderWidth: 2,
        borderColor: '#E9EAE4',
        borderRadius: 40,
        flexDirection: 'column'
    },
    CategoryListContainerExtended: {
        height: 224,
    },
    CategoryListIconContainer: {
        // color: '#D4F2F8', // fix
        // backgroundColor: '#D4F2F8',
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
    // CategoryListIcon: {
    //     width: 32,
    //     height: 32, 
    //     tintColor: '#3EC7F5',
    //     // add position
    // },
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