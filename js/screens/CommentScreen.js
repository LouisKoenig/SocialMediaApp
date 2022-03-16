import React, {useState, useContext, useEffect} from 'react';
import {
    View,
    FlatList
} from 'react-native';
import Styles from '../../StyleSheet';
import CreateComment from '../components/CreateComment';
import CommentPosting from '../components/CommentPosting';
import {RealmContext} from '../context/RealmContext';

const CommentScreen = ({route, navigation}) =>
{
    let parameters = route.params;
    let [author, setAuthor] = useState(parameters.author);
    let [posting, setPosting] = useState(parameters.posting);
    let [commented, setCommented] = useState(false);
    let [video, setVideo] = useState(""); // Maybe not needed
    let [image, setImage] = useState(""); // Maybe not needed
    const postId = parameters.postId;
    const realmContext = useContext(RealmContext);
    const db = realmContext.realmDB;

    const onGoBack = () => {
        navigation.navigate('TabBar');
    };

    const onCommented = () =>
    {
        setCommented(!commented);
    }

    const renderItem = ({ item }) => (
        <CommentPosting
            id={item._id}
            isMain={false}
            author={item.userName}
            posting={item.text}
            onPressEdit={() => console.log('Edit')}
            onRefresh={onCommented}/>
    );

    return (<View style={Styles.flatListParent}>
        <View>
            <CommentPosting id={postId} isMain={true} author={author} posting={posting} onPressGoBack={onGoBack}/>
        </View>
        <View>
            <CreateComment postId={postId} commented={onCommented}/>
        </View>
            <FlatList data={db.objects("Comment").filtered("post_id == $0", postId)}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
                      contentContainerStyle={Styles.flatList}
                      extraData={commented}>
            </FlatList>
    </View>);
};

export default CommentScreen;