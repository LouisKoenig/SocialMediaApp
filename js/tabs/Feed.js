import * as React from 'react';
import {FlatList, View} from 'react-native';
import Styles from '../../StyleSheet';
import Post from '../components/Post';
import {useContext} from 'react';
import {RealmContext} from '../context/RealmContext';
import {useIsFocused} from '@react-navigation/native';

export default function Feed () {
    const realmContext = useContext(RealmContext);

    useIsFocused();

    const renderItem = ({ item, index }) => {
        if (index === 0) {
            return <Post post={item}/>
        } else {
            return <Post post={item}
                         style={{borderTopStyle: 'solid', borderTopColor: 'lightgray', borderTopWidth: 1}}/>
        }
    };

    return (
        <View style={Styles.flatListParent}>
            <FlatList style={{height: "100%"}}
                      data={realmContext.realmDB.objects("Post")}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index}
                      contentContainerStyle={Styles.flatList}>
            </FlatList>
        </View>
        );
}
