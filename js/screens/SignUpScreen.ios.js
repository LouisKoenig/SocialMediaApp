import React, {useContext} from 'react';
import {
    Text,
    TextInput,
    Alert, StyleSheet, View, TouchableOpacity,
} from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sha256} from 'react-native-sha256';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Styles from '../../StyleSheet';
import {RealmContext} from '../context/RealmContext';
import { ObjectId } from 'bson';

export default function AccountScreen() {
    let [firstName, setFirstName] = useState();
    let [lastName, setLastName] = useState();
    let [userName, setUserName] = useState();
    let [password, setPassword] = useState();
    let [repeatPassword, setRepeatPassword] = useState();
    let [termsOfService, setTermsOfService] = useState(false);
    let [buttonDisabled, setButtonDisabled] = useState(true);

    const realmContext = useContext(RealmContext);

    useEffect(() => {
        if(termsOfService)
        {
            setButtonDisabled(false);
        }
        else
        {
            setButtonDisabled(true);
        }
    });

    let generateToken = (length) => {
        const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let index;
        let token = "";
        for (let i = 0; i < length; i++) {
            index = Math.floor(Math.random() * 62);
            token = token + alphabet[index];
        }
        return token;
    }

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
        if(!isUserNameValid(userName))
        {
            Alert.alert("Invalid user name!");
            return;
        }
        /*if(! await isUserNameAvailable(userName))
        {
            Alert.alert("Username already taken!");
            return;
        }*/

        //Generates a salt token
        let salt = generateToken(32);
        //Encrypt password with salt
        let hash = await sha256(salt + password);

        let newUser = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            salt: salt,
            password: hash
        }

        const db = realmContext.realmDB;
        const users = db.objects("User");

        console.log(users);
        try {
            const user = users.filtered("userName = " + userName);

            console.log("Test " + user);
            if(user) {

                console.log("exists");
            }
        } catch (e) {

            let user = undefined;

            //No user
            db.write(() => {
                user = db.create("User", {
                    _id: new ObjectId(),
                    firstName: firstName,
                    lastName: lastName,
                    userName: userName,
                    salt: salt,
                    password: hash
                });
            });

            console.log(user);
        }
        //let result = await storeNewUser(newUser);

        /*if(!result)
        {
            Alert.alert("Error storing user.");
        }*/
    }

    function isUserNameValid(name) {
        let checkWhiteSpaceOnly = name.replace(/\s/g, '');
        if(checkWhiteSpaceOnly.length === 0)
        {
            return false;
        }

        return  true;
    }

    async function isUserNameAvailable(name) {
        try{
            let value = await AsyncStorage.getItem(createUserID(name));

            console.log(value);

            if(value === null)
            {
                return true;
            }

            return false;
        }
        catch(e)
        {
            return false;
        }
    }

    function createUserID(userName) {
        return "User_" + userName;
    }

    function isPasswordSafe(password) {
        return true; //TODO: Implement password rules
    }

    async function storeNewUser(user) {
        try {
            let result = await AsyncStorage.setItem(createUserID(user.userName), JSON.stringify(user));
            return true;

        } catch(e) {
            return false;
        }
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
            <View style={Styles.test}>
                <TouchableOpacity style={[buttonDisabled ? Styles.buttonContainerDisabled : Styles.buttonContainer, Styles.field]}
                                  disabled={buttonDisabled}
                                  onPress={() => createUser()}>
                    <Text style={[Styles.button]}>Sign Up</Text>
                </TouchableOpacity>
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
