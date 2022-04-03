import React, {useState, useContext} from 'react';
import {
    View,
    FlatList,
} from 'react-native';
import Styles from '../../StyleSheet';
import CreateComment from '../components/CreateComment';
import Comment from '../components/Comment';
import {RealmContext} from '../context/RealmContext';

const CommentScreen = ({route}) =>
{
    let parameters = route.params;
    let [commented, setCommented] = useState(false);

    const realmContext = useContext(RealmContext);
    const db = realmContext.realmDB;

    const onCommented = () =>
    {
        setCommented(!commented);
    }

    const renderItem = ({ item, index }) => {
        console.log(item)
        if(index === 0) {
            return <Comment
                id={item._id}
                isMain={false}
                userName={item.userName}
                text={item.text}
                onRefresh={onCommented}/>
        } else {
            return <Comment
                style={{borderTopWidth: 1, borderColor: "gray"}}
                id={item._id}
                isMain={false}
                userName={item.userName}
                text={item.text}
                onRefresh={onCommented}/>
        }
    };

    return (
        <View style={Styles.flatListParent}>
            <View>
                <Comment id={parameters.post._id} isMain={true}
                         userName={parameters.post.userName}
                         text={parameters.post.text}
                         video={parameters.post.video}
                         image={parameters.post.image}/>
            </View>
            <View>
                <CreateComment postId={parameters.post._id} commented={onCommented}/>
            </View>
            <FlatList data={db.objects("Comment").filtered("post_id == $0", parameters.post._id)}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index}
                      contentContainerStyle={Styles.flatList}
                      extraData={commented}>
            </FlatList>
        </View>);
};

export default CommentScreen;
