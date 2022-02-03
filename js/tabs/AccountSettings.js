import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput, Button, Alert,
} from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AccountSettings() {
    let [name, setName] = useState();
    let [age, setAge] = useState();
    let [location, setLocation] = useState();
    let [password, setPassword] = useState();

    useEffect(() => {
        AsyncStorage.getItem("TestUser")
            .then((result) => {
                let userObject = JSON.parse(result);
                setName(userObject.name);
                setAge(userObject.age);
                setLocation(userObject.location);
                setPassword(userObject.password);
            });
    }, []); //Have to save Username globally for using it here dynamically

    let handleAgeInput = (someAgeInput) => {
        let cleanedAge = someAgeInput.replace(/[^0-9]/g, '');
        setAge(cleanedAge);
    }

    return <View style={styles.container}>
        <View style={styles.field}>
            <Text style={styles.title1}>{name}</Text>
        </View>
        <View style={styles.field}>
            <Text style={styles.inputHint}>Age:</Text>
            <TextInput
    style={styles.input}
    keyboardType="numeric"
    onChangeText={handleAgeInput}
    value={age}
    defaultValue={age}/>
        </View>
        <View style={styles.field}>
            <Text style={styles.inputHint}>Location:</Text>
            <TextInput
    style={styles.input}
    onChangeText={newLocation => setLocation(newLocation)}
    defaultValue={location}/>
        </View>
        {/* will need a different way if we want to make passwords changeable */}
        <View style={styles.field}>
            <Text style={styles.inputHint}>Password:</Text>
            <TextInput
    style={styles.input}
    secureTextEntry={true}
    onChangeText={newPassword => setPassword(newPassword)}
    defaultValue={password}/>
        </View>
        <View style={[styles.field, styles.fixToText]}>
            {/* Go to HomeScreen -->yet to be implemented */}
            <Button
    title="Cancel"
    style={[styles.button, styles.field]}/>
            <Button
    title="Save changes"
    style={[styles.button, styles.field]}
            onPress={() => SaveChanges(name, age, location, password)}/>
        </View>

    </View>;
}

async function SaveChanges(name, age, location, password)
{
    let user = new Object();
    user.name = name;
    user.age = age;
    user.location = location;
    user.password = password;

    console.log(user);

    let jsonUser = JSON.stringify(user);
    const storeUser = async() => {
        return await AsyncStorage.setItem(user.name, jsonUser);
    }

    storeUser().then(Alert.alert("Saved changes")).catch("Error saving changes");
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
});

