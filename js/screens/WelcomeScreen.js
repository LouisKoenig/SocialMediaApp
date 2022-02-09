import React from 'react';
import {
    Text, TouchableOpacity,
    View,
} from 'react-native';
import Styles from '../../StyleSheet';

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

            <View style={[Styles.test]}>
                <TouchableOpacity style={[Styles.buttonContainer, Styles.field]}
                                  onPress={() => onClickSignUp()}>
                    <Text style={[Styles.button]}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[Styles.buttonContainer, Styles.field]}
                                  onPress={() => onClickLogin()}>
                    <Text style={[Styles.button]}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default WelcomeScreen;
