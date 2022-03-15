import React, {useState, useContext, useEffect} from 'react';
import {
    View,
    FlatList
} from 'react-native';
import Styles from '../../StyleSheet';
import CreateComment from '../components/CreateComment';
import CommentPosting from '../components/CommentPosting';
import {RealmContext} from '../context/RealmContext';

const testPosts = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        author: 'TestUser',
        posting: 'Das ist ein Test Comment.',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-4458ba',
        author: 'TestUser1',
        posting: 'Test!!!!',
    },
    {
        id: 'bd7acbea-c3b1-46c2-aed5-4b28ba',
        author: 'TestUser2',
        posting: 'Das ist ein Test Comment',
    },
    {
        id: 'bd7acbea-c3asd1-46c2-aed5-4sdba',
        author: 'TestUser3',
        posting: 'Hallo ich teste.',
    },
    {
        id: 'bd7acbea-cd1-46c2-aed5-4sdba',
        author: 'TestUser3',
        posting: 'Das ist ein anderer Comment.',
    }
];


const CommentScreen = ({route, navigation}) =>
{
    let [author, setAuthor] = useState("");
    let [posting, setPosting] = useState("");
    let [video, setVideo] = useState(""); // Maybe not needed
    let [image, setImage] = useState(""); // Maybe not needed
    const postId = route.params.postId;
    const realmContext = useContext(RealmContext);
    const db = realmContext.realmDB;

    const getMainPost = async () => {
        let mainPost = await db.objectForPrimaryKey("Post", postId);
        setAuthor(mainPost.userName);
        setPosting(mainPost.text);
    };

    useEffect(() => {
        getMainPost();
    }, []);

    const onGoBack = () => {
        navigation.navigate('TabBar');
    };

    const renderItem = ({ item }) => (
        <CommentPosting
            isMain={false}
            author={item.author}
            posting={item.posting}
            onPressEdit={() => console.log('Edit')}
            onPressDelete={() => console.log('Delete')}/>
    );

    return (<View>
        <View>
            <CommentPosting isMain={true} author={author} posting={posting} onPressGoBack={onGoBack}/>
        </View>
        <View>
            <CreateComment parentId="IDK yet"/>
        </View>
        <View>
            <FlatList data={db.objects("Comment").filtered("post_id == $0", postId)}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
                      contentContainerStyle={Styles.flatList}>
            </FlatList>
        </View>
    </View>);
};

export default CommentScreen;