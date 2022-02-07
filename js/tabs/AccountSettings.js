import * as React from 'react';
import { sha256 } from 'react-native-sha256';
import {
    StyleSheet,
    View,
    Text,
    TextInput, Button, Alert,
} from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AccountSettings() {
    let [firstName, setFirstName] = useState();
    let [lastName, setLastName] = useState();
    let [userName, setUserName] = useState();
    let [password, setPassword] = useState();

    useEffect(() => {
        async function FetchData()
        {
            let userData =  await GetUserData("TestUser");

            if(userData) {
                let userObject = JSON.parse(userData);
                setFirstName(userObject.firstName);
                setLastName(userObject.lastName);
                setUserName(userObject.userName);
                setPassword(userObject.password);
            }
            else
            {
                Alert.alert("Error getting user data!")
            }
        }

        FetchData();
    }, []); //Only on initial click

    return (
        <View style={styles.container}>
            <Text style={[styles.title1, styles.field]}>{"Hi " + userName}</Text>
            <Text style={styles.title2}>Feel free to adjust your data below:</Text>
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
                <Text style={styles.inputHint}>Password:</Text>
                <TextInput placeholder="Your password"
                           style={styles.input}
                           secureTextEntry={true}
                           value={password}
                           onChangeText={setPassword}/>
            </View>
            <View style={[styles.field, styles.fixToText]}>
                {/* Go to HomeScreen -->yet to be implemented */}
                <Button title="Cancel"
                        style={[styles.button, styles.field]}/>
                <Button title="Save changes"
                        style={[styles.button, styles.field]}
                        onPress={() => UpdateUser(firstName, lastName, userName, password)}/>
            </View>
        </View>);
}

async function GetUserData(userName)
{
    try
    {
        let result = await AsyncStorage.getItem(BuildUserId(userName));

        if(result !== null)
        {
            return result;
        }
        return null;
    }
    catch(e)
    {
        return null;
    }
}

async function UpdateUser(firstName, lastName, userName, password)
{
    let userObject = new Object();

    userObject.firstName = firstName;
    userObject.lastName = lastName;
    userObject.userName = userName;
    userObject.password = password;

    let result =  await StoreUpdatedUser(userObject);

    if(result)
    {
        Alert.alert("Successfully changed your data!")
    }
    else
    {
        Alert.alert("Error changing your data!")
    }
}

async function StoreUpdatedUser(user)
{
    try{
        let result = await AsyncStorage.setItem(BuildUserId(user.userName), JSON.stringify(user));
        return true;

    } catch(e)
    {
        return false;
    }
}

function BuildUserId(username)
{
    return "User_" + username;
}

const styles = StyleSheet.create({
    title1: {
        fontSize: 30,
        fontWeight: "600"
    },
    title2: {
        fontSize: 20,
        fontWeight: "500"
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
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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

