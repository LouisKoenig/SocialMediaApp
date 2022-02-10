import * as React from 'react';
import {
    Text,
    TextInput,
    Button,
    Alert, StyleSheet, View, TouchableOpacity,
} from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sha256} from 'react-native-sha256';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Styles from '../../StyleSheet';

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
                                  onPress={() => CreateUser(firstName, lastName, userName, password, repeatPassword, termsOfService)}>
                    <Text style={[Styles.button]}>Sign Up</Text>
                </TouchableOpacity>
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
