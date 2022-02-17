import * as React from 'react';
import { sha256 } from 'react-native-sha256';
import {
    StyleSheet,
    View,
    Text,
    TextInput, Alert
} from 'react-native';
import {useEffect, useState, useContext} from 'react';
import Styles from '../../StyleSheet';
import {UserContext} from '../context/UserContext';
import UIButton from '../components/UIButton';
import Dialog from 'react-native-dialog';
import {storeUser} from '../Util';


export default function AccountSettings() {
    let [firstName, setFirstName] = useState();
    let [lastName, setLastName] = useState();
    let [userName, setUserName] = useState();
    let [password, setPassword] = useState();
    let [changePasswordVisible, setChangePasswordVisible] = useState(false);
    let [oldPassword, setOldPassword] = useState();
    let [newPassword, setNewPassword] = useState();
    let [repeatNewPassword, setRepeatNewPassword] = useState();
    const userContext = useContext(UserContext);

    useEffect(() => {
        setFirstName(userContext.currentUser.firstName);
        setLastName(userContext.currentUser.lastName);
        setUserName(userContext.currentUser.userName);
    }, []); //Only on initial click

    const onSaveChanges = async () => {
        let hash = await sha256(userContext.currentUser.salt + password);


        if(hash !== userContext.currentUser.password)
        {
            Alert.alert("Wrong password!");
            return;
        }

        await updateUser();
    }

    const onChangePassword = () => {
        setChangePasswordVisible(true);
    };

    const onCancelChangingPassword = () => {
        setOldPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
        setChangePasswordVisible(false);
    };

    const onConfirmChangingPassword = async () => {
        if(newPassword !== repeatNewPassword)
        {
            Alert.alert("Passwords not matching!");
            return;
        }

        let hasholdPassword = await sha256(userContext.currentUser.salt + oldPassword);

        if(hasholdPassword !== userContext.currentUser.password)
        {
            Alert.alert("Old password invalid!");
            return;
        }

        let hashnewPassword = await sha256(userContext.currentUser.salt, newPassword);

        let newUser = {
            firstName: userContext.currentUser.firstName,
            lastName: userContext.currentUser.lastName,
            userName: userContext.currentUser.userName,
            salt: userContext.currentUser.salt,
            password: hashnewPassword
        }

        if(await storeUser(newUser))
        {
            userContext.currentUser.password = hashnewPassword;
            Alert.alert("Changed password");
        }
        else
        {
            Alert.alert("Error changing password");
        }

        setOldPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
    };

    const updateUser = async () => {
        let userObject = {};

        userObject.firstName = firstName;
        userObject.lastName = lastName;
        userObject.userName = userContext.currentUser.userName;
        userObject.password = userContext.currentUser.password;
        userObject.salt = userContext.currentUser.salt;

        let result =  await storeUser(userObject);

        if(result)
        {
            Alert.alert("Successfully changed your data!")
            userContext.currentUser.firstName = userObject.firstName;
            userContext.currentUser.lastName = userObject.lastName;
        }
        else
        {
            Alert.alert("Error changing your data!")
        }
    };

    return (
        <View style={Styles.container}>
            <Dialog.Container visible={changePasswordVisible}>
                <Dialog.Title>Change your password</Dialog.Title>
                <Dialog.Input
                    label="Old password:"
                    onChangeText={value => setOldPassword(value)}
                    value={oldPassword}
                    secureTextEntry={true}
                    style={Styles.input}/>
                <Dialog.Input
                    label="New password:"
                    onChangeText={value => setNewPassword(value)}
                    value={newPassword}
                    secureTextEntry={true}
                    style={Styles.input}/>
                <Dialog.Input
                    label="Repeat new password:"
                    onChangeText={value => setRepeatNewPassword(value)}
                    value={repeatNewPassword}
                    secureTextEntry={true}
                    style={Styles.input}/>
                <Dialog.Button
                    label="Cancel"
                    onPress={onCancelChangingPassword}
                    style={[Styles.buttonContainer, Styles.buttonSizes.dialog, Styles.textSizes.dialog, Styles.button]}/>
                <Dialog.Button
                    label="Confirm"
                    onPress={onConfirmChangingPassword}
                    style={[Styles.buttonContainer, Styles.buttonSizes.dialog, Styles.textSizes.dialog, Styles.button]}/>
            </Dialog.Container>
            <Text style={[Styles.title, Styles.field]}>{"Hi " + userName}</Text>
            <Text style={Styles.subtitle}>Feel free to adjust your data below:</Text>
            <View style={[Styles.field, Styles.itemRow]}>
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
                <Text style={Styles.inputHint}>Password:</Text>
                <TextInput placeholder="Your password"
                           style={Styles.input}
                           secureTextEntry={true}
                           value={password}
                           onChangeText={setPassword}/>
            </View>
            <View style={[Styles.field, styles.fixToText]}>
                <UIButton size="small" onClick={onChangePassword}>Change Password</UIButton>
                <UIButton size="small" onClick={onSaveChanges}>Save Changes</UIButton>
            </View>
        </View>);
}

const styles = StyleSheet.create({
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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

