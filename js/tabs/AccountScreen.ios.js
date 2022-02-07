import * as React from 'react';
import {
    Text,
    TextInput,
    Button,
    Alert, StyleSheet, View
} from 'react-native';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sha256} from 'react-native-sha256';
import ReactNativeBiometrics from 'react-native-biometrics';

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
        <View style={styles.container}>
            <Text style={[styles.title, styles.field]}>Sign Up</Text>
            <Text style={styles.subtitle}>Please enter your details below:</Text>
            <View style={styles.field}>
                <Text style={styles.inputHint}>Username:</Text>
                <TextInput placeholder="mustermann@dhbw-loerrach.de"
                           onChangeText={newName => setName(newName)}
                           defaultValue={name}
                           style={styles.input}/>
            </View>
            <View style={styles.field}>
                <Text style={styles.inputHint}>Age:</Text>
                <TextInput placeholder="Your age"
                           style={styles.input}
                           keyboardType='numeric'
                           onChangeText={handleAgeInput}
                           value={age}
                           defaultValue={age}/>
            </View>
            <View style={styles.field}>
                <Text style={styles.inputHint}>Location:</Text>
                <TextInput placeholder="Your city"
                           style={styles.input}
                           onChangeText={newLocation => setLocation(newLocation)}
                           defaultValue={location}/>
            </View>
            <View style={styles.field}>
                <Text style={styles.inputHint}>Password:</Text>
                <TextInput placeholder="Your password"
                           style={styles.input}
                           secureTextEntry={true}
                           onChangeText={newPassword => setPassword(newPassword)}
                           defaultValue={password}/>
            </View>
            <View style={styles.field}>
                <Text style={styles.inputHint}>Repeat Password:</Text>
                <TextInput placeholder="Your password again"
                           style={styles.input}
                           secureTextEntry={true}
                           onChangeText={newRepeatedPassword => setRepeatedPassword(newRepeatedPassword)}
                           defaultValue={repeatedPassword}/>
            </View>
            <View style={styles.field}>
                <Button title="Sign Up"
                        style={[styles.button, styles.field]}
                        onPress={() => createAccount(name, age, location, password, repeatedPassword)}/>
            </View>
        </View>);
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "600"
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "600"
    },
    button: {
        backgroundColor: "purple"
    },
    field: {
        paddingTop: 15

    },
    inputHint: {
        paddingLeft: 3,
        paddingBottom: 5
    },
    input: {
        fontSize: 18,
        height: 45,
        padding: 10,
        borderRadius: 3,
        backgroundColor: "white",

    },
    container: {
        flex: 1,
        flexDirection: "column",
        paddingTop: 20,
        paddingHorizontal: 20
    }
});
