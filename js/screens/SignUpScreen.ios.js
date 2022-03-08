import React, {useContext} from 'react';
import {
    Text,
    TextInput,
    Alert, StyleSheet, View, TouchableOpacity,
} from 'react-native';
import {useEffect, useState} from 'react';
import {sha256} from 'react-native-sha256';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Styles from '../../StyleSheet';
import {RealmContext} from '../context/RealmContext';
import UIButton from '../components/UIButton';
import {generateToken} from '../Util';

export default function AccountScreen({navigation}) {

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");
    let [repeatPassword, setRepeatPassword] = useState("");
    let [termsOfService, setTermsOfService] = useState(false);

    const realmContext = useContext(RealmContext);

    async function createUser() {
        if(! termsOfService)
        {
            Alert.alert("Please accept our terms of service!");
            return;
        }
        if(password !== repeatPassword)
        {
            Alert.alert("Passwords not matching!");
            return;
        }
        if(!isPasswordSafe(password))
        {
            Alert.alert("Please select a stronger password!");
            return;
        }
        if(! isUserNameValid(userName))
        {
            Alert.alert("Invalid user name!");
            return;
        }

        const db = realmContext.realmDB;

        //Check if user exists
        if(db.objectForPrimaryKey("User", userName)) {
            Alert.alert("Username exists");
            return;
        }

        //Generates a salt token
        let salt = generateToken(32);
        //Encrypt password with salt
        let hash = await sha256(salt + password);

        db.write(() => {
            const user = db.create("User", {
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                salt: salt,
                password: hash
            });
        });

        navigation.navigate('Login');
    }

    function isUserNameValid(name) {
        let checkWhiteSpaceOnly = name.replace(/\s/g, '');
        if(checkWhiteSpaceOnly.length === 0)
        {
            return false;
        }

        return  true;
    }

    function isPasswordSafe(password) {
        return true; //TODO: Implement password rules
    }

/*    //biometric authentication
    ReactNativeBiometrics.isSensorAvailable().then((sensor) => {
    //TouchID
    if (sensor.biometryType === ReactNativeBiometrics.TouchID) {
        Alert.alert("TouchID");
    }

    //FaceID
    if (sensor.biometryType === ReactNativeBiometrics.FaceID) {
        Alert.alert("FaceID");

        ReactNativeBiometrics.biometricKeysExist().then((resultObject) => {
            const { keysExist } = resultObject

            if (keysExist) {
                let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
                let payload = epochTimeSeconds + 'some message'

                ReactNativeBiometrics.createSignature({
                    promptMessage: 'Sign in',
                    payload: payload
                }).then((resultObject) => {
                    const { success, signature } = resultObject

                    if (success) {
                        console.log(signature)
                        verifySignatureWithServer(signature, payload)
                    }
                });
            } else {
                console.log('Keys do not exist or were deleted')
            }
        });

        ReactNativeBiometrics.createKeys('Confirm fingerprint').then((resultObject) => {
            const { publicKey } = resultObject
            console.log(publicKey)
            //sendPublicKeyToServer(publicKey)
        });

        ReactNativeBiometrics.simplePrompt({
            promptMessage: 'Confirm fingerprint'
        }).then((resultObject) => {
            const { success } = resultObject

            if (success) {
                console.log('successful biometrics provided')
            } else {
                console.log('user cancelled biometric prompt')
            }
        }).catch(() => {
            console.log('biometrics failed')
        });
    }

    //Android
    if (sensor.biometryType === ReactNativeBiometrics.Biometrics) {
        Alert.alert("Android");
        //do something face id specific
    }
}).catch((err) => {
    Alert.alert(err);
});*/

    return (
        <View style={Styles.container}>
            <Text style={[Styles.title, Styles.field]}>Sign Up</Text>
            <Text style={Styles.subtitle}>Please enter your details below:</Text>
            <View style={[Styles.field, styles.itemRow]}>
                <View style={[Styles.field, styles.leftElement]}>
                    <Text style={Styles.inputHint}>First name:</Text>
                    <TextInput style={Styles.input}
                               placeholder="First Name"
                               value={firstName}
                               onChangeText={setFirstName}/>
                </View>
                <View style={[Styles.field, styles.rightElement]}>
                    <Text style={Styles.inputHint}>Last name:</Text>
                    <TextInput style={Styles.input}
                               placeholder="Last Name"
                               value={lastName}
                               onChangeText={setLastName}/>
                </View>
            </View>
            <View style={Styles.field}>
                <Text style={Styles.inputHint}>Username:</Text>
                <TextInput placeholder="Your username"
                           style={Styles.input}
                           value={userName}
                           onChangeText={setUserName}/>
            </View>
            <View style={Styles.field}>
                <Text style={Styles.inputHint}>Password:</Text>
                <TextInput placeholder="Your password"
                           style={Styles.input}
                           secureTextEntry={true}
                           value={password}
                           onChangeText={setPassword}/>
            </View>
            <View style={Styles.field}>
                <Text style={Styles.inputHint}>Repeat Password:</Text>
                <TextInput placeholder="Your password again"
                           style={Styles.input}
                           secureTextEntry={true}
                           value={repeatPassword}
                           onChangeText={setRepeatPassword}/>
            </View>
            <View style={Styles.field}>
                <BouncyCheckbox
                    text="I am at least 16 years old and hereby accept the terms of service of this application."
                    isChecked={termsOfService}
                    onPress={() => setTermsOfService(!termsOfService)}>
                </BouncyCheckbox>
            </View>
            <View style={Styles.field}>
                <UIButton disabled={!termsOfService} onClick={() => createUser()}>Sign Up</UIButton>
            </View>
        </View>);
}

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: "row"
    },
    leftElement: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 3
    },
    rightElement: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 3
    }
});
