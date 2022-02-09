import * as React from 'react';
import {
    Text,
    TextInput,
    Button,
    Alert, StyleSheet, View, SafeAreaView,
} from 'react-native';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sha256} from 'react-native-sha256';
import ReactNativeBiometrics from 'react-native-biometrics';
import Styles from "../../StyleSheet";

export default function AccountScreen() {
    let [name, setName] = useState();
    let [age, setAge] = useState();
    let [location, setLocation] = useState();
    let [password, setPassword] = useState();
    let [repeatedPassword, setRepeatedPassword] = useState();

    let handleAgeInput = (someAgeInput) => {
        let cleanedAge = someAgeInput.replace(/[^0-9]/g, '');
        setAge(cleanedAge);
    }

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

    //TODO: Improve Function
    let IsNameAvailable = async (name) => {
        console.log(name);
        let checkWhiteSpaceOnly = name.replace(/\s/g, '');
        if(checkWhiteSpaceOnly.length === 0 || await CheckNameExists(name))
        {
            return false;
        }

        return true;
    }

    //TODO: Improve Function
    let CheckNameExists = async (name) => {
        const readData = async () => {
            try {
                const result = await AsyncStorage.getItem(name);

                if (result !== null) {
                    return true;
                }
                else {
                    return false;
                }
            } catch (e) {
                console.log("Error looking for username")
                return false;
            }
        }
        let result = await readData();
        return result;
    }

    //TODO: setAge from useState hook should be override
    function SetAge(age) {
        let cleanedAge = age.replace(/[^0-9]/g, '');

    }

    let createAccount = async (name, age, location, password, repeatPassword ) => {
        //let test = await AsyncStorage.getAllKeys();
        //console.log(test);
        //AsyncStorage.clear();

        //TODO: LATER Profilbild
        //TODO: Visible Name (firstName, lastName)
        //TODO: Username
        //TODO: Password
        //TODO: PasswordRepeat
        //TODO: AGB, Datenschutz, älter als 16 (Checkbox zum abhacken)

        if(password !== repeatPassword) {
            Alert.alert("Passwords not matching!");
            return;
        }

        //TODO: Generates Error (unhandled promise rejection)
        if(! await IsNameAvailable(name)) {
            Alert.alert("Username either taken or unsupported!")
            return;
        }

        //Generates a salt token
        let salt = generateToken(32);
        //Encrypt password with salt
        let hash = await sha256(salt + password);

        let user = {
            name: name,
            age: age,
            location: location,
            salt: salt,
            password: hash
        }

        let result = await AsyncStorage.setItem("User_USERNAME", JSON.stringify(user));
        AsyncStorage.

            //biometric authentication
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
        });

    }

    return (
        <View style={Styles.container}>
            <Text style={[Styles.title, Styles.field]}>Sign Up</Text>
            <Text style={Styles.subtitle}>Please enter your details below:</Text>
            <View style={Styles.field}>
                <Text style={Styles.inputHint}>Username:</Text>
                <TextInput placeholder="mustermann@dhbw-loerrach.de"
                           onChangeText={newName => setName(newName)}
                           defaultValue={name}
                           style={Styles.input}/>
            </View>
            <View style={Styles.field}>
                <Text style={Styles.inputHint}>Age:</Text>
                <TextInput placeholder="Your age"
                           style={Styles.input}
                           keyboardType='numeric'
                           onChangeText={handleAgeInput}
                           value={age}
                           defaultValue={age}/>
            </View>
            <View style={Styles.field}>
                <Text style={Styles.inputHint}>Location:</Text>
                <TextInput placeholder="Your city"
                           style={Styles.input}
                           onChangeText={newLocation => setLocation(newLocation)}
                           defaultValue={location}/>
            </View>
            <View style={Styles.field}>
                <Text style={Styles.inputHint}>Password:</Text>
                <TextInput placeholder="Your password"
                           style={Styles.input}
                           secureTextEntry={true}
                           onChangeText={newPassword => setPassword(newPassword)}
                           defaultValue={password}/>
            </View>
            <View style={Styles.field}>
                <Text style={Styles.inputHint}>Repeat Password:</Text>
                <TextInput placeholder="Your password again"
                           style={Styles.input}
                           secureTextEntry={true}
                           onChangeText={newRepeatedPassword => setRepeatedPassword(newRepeatedPassword)}
                           defaultValue={repeatedPassword}/>
            </View>
            <View style={Styles.field}>
                <Button title="Sign Up"
                        style={[Styles.button, Styles.field]}
                        onPress={() => createAccount(name, age, location, password, repeatedPassword)}/>
            </View>
        </View>);
}
