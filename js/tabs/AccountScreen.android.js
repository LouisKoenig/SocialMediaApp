import * as React from 'react';
import {
    Text,
    TextInput,
    Button,
    Alert, StyleSheet, View
} from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sha256} from 'react-native-sha256';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function AccountScreen() {
    let [firstName, setFirstName] = useState();
    let [lastName, setLastName] = useState();
    let [userName, setUserName] = useState();
    let [password, setPassword] = useState();
    let [repeatPassword, setRepeatPassword] = useState();
    let [termsOfService, setTermsOfService] = useState(false);
    let [buttonDisabled, setButtonDisabled] = useState(true);

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

    return (
        <View style={styles.container}>
            <Text style={[styles.title, styles.field]}>Sign Up</Text>
            <Text style={styles.subtitle}>Please enter your details below:</Text>
            <View style={[styles.field, styles.itemRow]}>
                <View style={[styles.field, styles.leftElement]}>
                    <Text style={styles.inputHint}>First name:</Text>
                    <TextInput style={styles.input}
                               placeholder="First Name"
                               value={firstName}
                               onChangeText={setFirstName}/>
                </View>
                <View style={[styles.field, styles.rightElement]}>
                    <Text style={styles.inputHint}>Last name:</Text>
                    <TextInput style={styles.input}
                               placeholder="Last Name"
                               value={lastName}
                               onChangeText={setLastName}/>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={styles.inputHint}>Username:</Text>
                <TextInput placeholder="Your username"
                           style={styles.input}
                           value={userName}
                           onChangeText={setUserName}/>
            </View>
            <View style={styles.field}>
                <Text style={styles.inputHint}>Password:</Text>
                <TextInput placeholder="Your password"
                           style={styles.input}
                           secureTextEntry={true}
                           value={password}
                           onChangeText={setPassword}/>
            </View>
            <View style={styles.field}>
                <Text style={styles.inputHint}>Repeat Password:</Text>
                <TextInput placeholder="Your password again"
                           style={styles.input}
                           secureTextEntry={true}
                           value={repeatPassword}
                           onChangeText={setRepeatPassword}/>
            </View>
            <View style={styles.field}>
                <BouncyCheckbox
                    text="I am at least 16 years old and hereby accept the terms of service of this application."
                    isChecked={termsOfService}
                    onPress={() => setTermsOfService(!termsOfService)}>
                </BouncyCheckbox>
            </View>
            <View style={styles.field}>
                <Button title="Sign Up"
                        style={[styles.button, styles.field]}
                        disabled={buttonDisabled}
                        onPress={() => CreateUser(firstName, lastName, userName, password, repeatPassword, termsOfService)}/>
            </View>
        </View>);
}

async function CreateUser(firstName, lastName, userName, password, repeatedPassword, acceptedTermsOfService)
{
    if(!acceptedTermsOfService)
    {
        Alert.alert("Please accept our terms of service!");
        return;
    }
    if(password !== repeatedPassword)
    {
        Alert.alert("Passwords not matching!");
        return;
    }
    if(!IsPasswordSafe(password))
    {
        Alert.alert("Please select a stronger password!");
        return;
    }
    if(!IsUserNameValid(userName))
    {
        Alert.alert("Invalid user name!");
        return;
    }
    if(! await IsUserNameAvailable(userName))
    {
        Alert.alert("Username already taken!");
        return;
    }

    let newUser = new Object();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.userName = userName;
    newUser.password = password;

    let result = await StoreNewUser(newUser);

    if(!result)
    {
        Alert.alert("Error storing user.");
    }
};

function IsUserNameValid(name)
{
    let checkWhiteSpaceOnly = name.replace(/\s/g, '');
    if(checkWhiteSpaceOnly.length === 0)
    {
        return false;
    }

    return  true;
}

async function IsUserNameAvailable(name)
{
    try{
        let value = await AsyncStorage.getItem(BuildUserId(name));

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

function BuildUserId(username)
{
    return "User_" + username;
}

function IsPasswordSafe(password)
{
    return true; //TODO: Implement password rules
}

async function StoreNewUser(user)
{
    try{
        let result = await AsyncStorage.setItem(BuildUserId(user.userName), JSON.stringify(user));
        return true;

    } catch(e)
    {
        return false;
    }
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
    },
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
