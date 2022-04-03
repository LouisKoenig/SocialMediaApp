import * as React from 'react';
import {FlatList, View} from 'react-native';
import Styles from '../../StyleSheet';
import Post from '../components/Post';
import {useContext} from 'react';
import {RealmContext} from '../context/RealmContext';
import {useIsFocused, useNavigation} from '@react-navigation/native';
export default function Feed ()
{
    const navigation = useNavigation();
    const realmContext = useContext(RealmContext);

    useIsFocused();

    const renderItem = ({ item, index }) => {
        if (index === 0) {
            return <Post key={item._id}
                         author={item.userName}
                         posting={item.text}
                         image={item.image !== '' ? item.image : undefined}
                         url={item.url !== '' ? item.url : undefined}
                         onPressLike={() => console.log('Like')}
                         onPressComment={() => (
                             navigation.navigate('Comments', {
                                 postId: item._id,
                                 author: item.userName,
                                 posting: item.text
                             }))}/>
        } else {
            return <Post key={item._id}
                         style={{borderTopStyle: 'solid', borderTopColor: 'lightgray', borderTopWidth: 1}}
                         author={item.userName}
                         posting={item.text}
                         image={item.image !== '' ? item.image : undefined}
                         url={item.url !== '' ? item.url : undefined}
                         onPressLike={() => console.log('Like')}
                         onPressComment={() => (
                             navigation.navigate('Comments', {
                                 postId: item._id,
                                 author: item.userName,
                                 posting: item.text
                             }))}/>
        }
    };

    return (
        <View style={Styles.flatListParent}>
            <FlatList style={{height: "100%"}}
                      data={realmContext.realmDB.objects("Post")}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
                      contentContainerStyle={Styles.flatList}>
            </FlatList>
        </View>
        );
}
