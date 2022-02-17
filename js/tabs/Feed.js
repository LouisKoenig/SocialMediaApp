import * as React from 'react';
import {FlatList, View} from 'react-native';
import Styles from '../../StyleSheet';
import Post from '../components/Post';
import { SearchBar } from 'react-native-elements';
import {useState} from 'react';

const testPosts = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        author: 'TestUser',
        posting: 'Das ist ein Test Post.',
        url: '',
        image: ''
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-4458ba',
        author: 'TestUser1',
        posting: 'Das ist ein Test Post mit Video.',
        url: 'https://www.youtube.com/watch?v=1KGOMm7XFe0',
        image: ''
    },
    {
        id: 'bd7acbea-c3b1-46c2-aed5-4b28ba',
        author: 'TestUser2',
        posting: 'Das ist ein Test Post mit Bild.',
        url: '',
        image: 'https://www.tagesspiegel.de/images/heprodimagesfotos86120200706rushmo_471_1_20200705105518321-jpg/25977892/2-format6001.jpg'
    },
    {
        id: 'bd7acbea-c3asd1-46c2-aed5-4sdba',
        author: 'TestUser3',
        posting: 'Das ist ein Test Post mit Video und Bild.',
        url: 'https://www.youtube.com/watch?v=1KGOMm7XFe0',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Uluru_Australia%281%29.jpg'
    }
];

export default function Feed ()
{
    let [search, setSearch] = useState();

    const renderItem = ({ item }) => (
        <Post
            author={item.author}
            posting={item.posting}
            image={item.image !== '' ? item.image : undefined}
            url={item.url !== '' ? item.url : undefined}
            onPressLike={() => console.log('Like')}
            onPressComment={() => console.log('Comment')}/>
    );

    return (
        <View>
            <View style={{}}>
                <SearchBar noIcon
                           placeholder='Type Here...'
                           containerStyle={Styles.searchBar.container}
                           inputContainerStyle={Styles.searchBar.inputContainer}
                           inputStyle={Styles.searchBar.input}
                           value={search}
                           onChangeText={setSearch}/>
            </View>
            <FlatList
                data={testPosts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={Styles.flatList}>
            </FlatList>
        </View>

        );
}