import * as React from 'react';
import {
    Text,
    TextInput,
    Button,
    Alert, StyleSheet, View
} from 'react-native';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';




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
  return <View style={styles.container}>
      <Text style={[styles.title1, styles.field]}>Sign Up</Text>
      <Text style={[styles.title2, styles.field]}>Please enter your details below:</Text>
      <View style={styles.field}>
      <Text style={styles.inputHint}>Username:</Text>
      <TextInput
      placeholder="Your new username"
      onChangeText={newName => setName(newName)}
      defaultValue={name}
      style={styles.input}></TextInput>
      </View>
      <View style={styles.field}>
      <Text style={styles.inputHint}>Age:</Text>
      <TextInput
      placeholder="Your age"
      style={styles.input}
      keyboardType='numeric'
      onChangeText={handleAgeInput}
      value={age}
      defaultValue={age}></TextInput>
      </View>
      <View style={styles.field}>
          <Text style={styles.inputHint}>Location:</Text>
          <TextInput
              placeholder="Your city"
              style={styles.input}
              onChangeText={newLocation => setLocation(newLocation)}
              defaultValue={location}></TextInput>
      </View>
      <View style={styles.field}>
      <Text style={styles.inputHint}>Password:</Text>
      <TextInput
      placeholder="Your password"
      style={styles.input}
      secureTextEntry={true}
      onChangeText={newPassword => setPassword(newPassword)}
      defaultValue={password}></TextInput>
      </View>
      <View style={styles.field}>
      <Text style={styles.inputHint}>Repeat Password:</Text>
      <TextInput
      placeholder="Your password again"
      style={styles.input}
      secureTextEntry={true}
      onChangeText={newRepeatedPassword => setRepeatedPassword(newRepeatedPassword)}
      defaultValue={repeatedPassword}></TextInput>
      </View>
      <View style={styles.field}>
          <Button
              title="Sign Up"
              style={[styles.button, styles.field]}
              onPress={() => CreateAccount(name, age, location, password, repeatedPassword)}></Button>
      </View>

  </View>;
}

function SetAge(age)
{
    let cleanedAge = age.replace(/[^0-9]/g, '');
}

async function CreateAccount(name, age, location, password, repeatPassword )
{
    if(password !== repeatPassword)
    {
        Alert.alert("Passwords not matching!");
    }
    else if(! await IsNameAvailable(name))
    {
        Alert.alert("Username either taken or unsupported!")
    }
    else
    {
        let newUser = new Object();
        newUser.name = name;
        newUser.age = age;
        newUser.location = location;
        newUser.password = password;

        StoreUser(newUser);
    }
}


async function IsNameAvailable(name)
{
    console.log(name);
    let checkWhiteSpaceOnly = name.replace(/\s/g, '');
    if(checkWhiteSpaceOnly.length === 0 || await CheckNameExists(name))
    {
        return false;
    }

    return true;
}

function StoreUser(user)
{
    let jsonUser = JSON.stringify(user);
    const storeUser = async() => {
        return await AsyncStorage.setItem(user.name, jsonUser);
    }

    storeUser().then(console.log("stored successfully")).catch("not stored successfully");
}

async function CheckNameExists(name)
{
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
    }
});