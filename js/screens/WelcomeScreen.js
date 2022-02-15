import React from 'react';
import {
    Text, TouchableOpacity,
    View,
} from 'react-native';
import Styles from '../../StyleSheet';
import UIButton from '../components/UIButton';

const WelcomeScreen = ({navigation}) => {
    const onClickSignUp = () => {
        navigation.navigate('SignUp')
    };

    const onClickLogin = () => {
        navigation.navigate('Login')
    };

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
