import React, {useContext, useEffect} from 'react';
import {
    Text,
    View,
} from 'react-native';
import Styles from '../../StyleSheet';
import UIButton from '../components/UIButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginUser} from '../Util';
import {realmDB} from '../realm/RealmDB';
import {UserContext} from '../context/UserContext';

const WelcomeScreen = ({navigation}) => {

    const userContext = useContext(UserContext);

    const onClickSignUp = () => {
        navigation.navigate('SignUp')
    };

    const onClickLogin = () => {
        navigation.navigate('Login')
    };

    const tryLogin = async () => {

        try {
            console.log("Test")
            const test = await AsyncStorage.multiGet(["ActiveUserName", "ActiveUserPassword"]);
            const userName = test[0][1];
            const password = test[1][1];

            const user = await loginUser(realmDB, userName, password);
            if(user) {
                userContext.setCurrentUser(user);
                navigation.navigate('TabBar');
            }
        } catch (e) {

        }
    }

    useEffect(() => {
        tryLogin();

    }, []);

    return (
        <View style={Styles.container}>
            <View style={Styles.field}>
                <Text style={Styles.title}>Welcome</Text>
                <Text style={Styles.title}>SocialMediaApp</Text>
            </View>

            <View style={Styles.field}>
                <UIButton onClick={() => onClickSignUp()}>Sign Up</UIButton>
            </View>
            <View style={Styles.field}>
                <UIButton onClick={() => onClickLogin()}>Login</UIButton>
            </View>
        </View>
    )
}

export default WelcomeScreen;
