import * as React from 'react';
import {
    SafeAreaView,
    Text,
    TextInput,
    Button,
    Alert
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
  return <SafeAreaView>
      <Text>Sign Up</Text>
      <Text>Please enter your details below:</Text>
      <Text>Username:</Text>
      <TextInput
      placeholder="Your new username"
      onChangeText={newName => setName(newName)}
      defaultValue={name}></TextInput>
      <Text>Age:</Text>
      <TextInput
      placeholder="Your age"
      keyboardType='numeric'
      onChangeText={handleAgeInput}
      value={age}
      defaultValue={age}></TextInput>
      <Text>Location:</Text>
      <TextInput
      placeholder="Your city"
      onChangeText={newLocation => setLocation(newLocation)}
      defaultValue={location}></TextInput>
      <Text>Password:</Text>
      <TextInput
      placeholder="Your password"
      secureTextEntry={true}
      onChangeText={newPassword => setPassword(newPassword)}
      defaultValue={password}></TextInput>
      <Text>Repeat Password:</Text>
      <TextInput
      placeholder="Your password again"
      secureTextEntry={true}
      onChangeText={newRepeatedPassword => setRepeatedPassword(newRepeatedPassword)}
      defaultValue={repeatedPassword}></TextInput>
      <Button title="Sign Up" onPress={() => CreateAccount(name, age, location, password, repeatedPassword)}></Button>
  </SafeAreaView>;
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