import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    Image
}
    from 'react-native';
import Styles from '../../StyleSheet';
import YoutubeVideo from './YoutubeVideo';
import UIIconButton from './UIIconButton';
import {RealmContext} from '../context/RealmContext';
import {realmDB} from '../realm/RealmDB';
import {BSON} from 'realm';
import {UserContext} from '../context/UserContext';
import {useNavigation} from '@react-navigation/native';

interface PostProperties {
    post: any
}

const Post = (props: PostProperties) => {

    const navigation = useNavigation();
    const realmContext = useContext(RealmContext);
    const userContext = useContext(UserContext);

    const [votes, setVotes] = useState(realmContext.realmDB.objects("Vote").filtered("post_id == $0", props.post._id).length);
    const [hasVoted, setVoted] = useState(true);

    const onClickComment = () => {
        navigation.navigate('Comments', {
            post: props.post
        })
    }

    const onClickLike = async () => {
        const db = realmContext.realmDB;

        let vote = undefined;
        try {
            vote = await db.objects("Vote").filtered("userName == $0 && post_id == $1", userContext.currentUser.userName, props.post._id);
        } catch (e) {
        }

        if(vote?.length !== 0){
            return;
        }

        db.write(() => {
            realmDB.create("Vote", {
                _id: new BSON.UUID(),
                post_id: props.post._id,
                userName: userContext.currentUser.userName
            });
        });

        setVotes(realmContext.realmDB.objects("Vote").filtered("post_id == $0", props.post._id).length);
    }

    return (
        <View style={[props.style, Styles.postings.post]}>
            <View style={[Styles.postings.profilePicContainer, Styles.postings.leftSide]}>
                <Image
                    source={require('../../res/avatar.png')}
                    style={Styles.postings.profilePic}/>
            </View>
            <View style={Styles.postings.rightSide}>
                <Text style={Styles.postings.author}>{props.post.userName}</Text>
                <Text style={Styles.postings.posting}>{props.post.text}</Text>
                <Text style={Styles.postings.posting}>Likes: {votes}</Text>
                {
                    props.post.image !== "" &&(
                            <Image source={{uri: props.post.image}}
                                   resizeMode="contain"
                                   style={[Styles.mediaContainer, Styles.field]}/>
                    )
                }
                {
                    props.post.video !== "" && (
                        <View style={[Styles.field, Styles.mediaContainer]}>
                            <YoutubeVideo videoLink={props.post.video}/>
                        </View>
                    )
                }
                <View style={[Styles.itemRow, Styles.field]}>
                    <UIIconButton style={{paddingRight: 10}} icon="comment-multiple" size={22} disabled={false} onClick={onClickComment}/>
                    <UIIconButton icon="cards-heart" size={22} disabled={false} onClick={onClickLike}/>
                </View>
            </View>
        </View>
    );
}

export default Post;

