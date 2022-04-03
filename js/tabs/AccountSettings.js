import * as React from 'react';
import { sha256 } from 'react-native-sha256';
import {
    StyleSheet,
    View,
    Text,
    TextInput, Alert
} from 'react-native';
import {useState, useContext} from 'react';
import Styles from '../../StyleSheet';
import {UserContext} from '../context/UserContext';
import UIButton from '../components/UIButton';
import Dialog from 'react-native-dialog';
import {RealmContext} from '../context/RealmContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AccountSettings({navigation}) {
    const userContext = useContext(UserContext);
    const realmContext = useContext(RealmContext);
    const db = realmContext.realmDB;
    const user = userContext.currentUser;

    let [firstName, setFirstName] = useState(user.firstName);
    let [lastName, setLastName] = useState(user.lastName);
    let [changePasswordVisible, setChangePasswordVisible] = useState(false);
    let [oldPassword, setOldPassword] = useState();
    let [newPassword, setNewPassword] = useState();
    let [repeatNewPassword, setRepeatNewPassword] = useState();

    const onSaveChanges = async () => {
        db.write(() => {
            const u = db.objectForPrimaryKey("User", user.userName)

            u.firstName = firstName;
            u.lastName = lastName;
        });

        Alert.alert("Saved Changes");
    }

    const onChangePassword = () => {
        setChangePasswordVisible(true);
    };

    const onLogout = async () => {

        await AsyncStorage.multiSet([
            ["ActiveUserName", ""],
            ["ActiveUserPassword", ""]
        ]);

        navigation.navigate("Welcome");
        userContext.setCurrentUser(undefined);

    }

    const onCancelChangingPassword = () => {
        setOldPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
        setChangePasswordVisible(false);
    };

    const onConfirmChangingPassword = async () => {
        if(newPassword !== repeatNewPassword) {
            Alert.alert("New passwords not matching!");
            return;
        }

        let hashOldPassword = await sha256(user.salt + oldPassword);

        if(hashOldPassword !== user.password) {
            Alert.alert("Old password wrong!");
            return;
        }

        let newHashPassword = await sha256(user.salt + newPassword);

        await db.write(() => {
            const u = db.objectForPrimaryKey("User", user.userName);
            u.password = newHashPassword;
        });

        setOldPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
        setChangePasswordVisible(false);
    };

    return (
        <View style={Styles.container}>
            <Dialog.Container visible={changePasswordVisible}>
                <Dialog.Title>Change Password</Dialog.Title>
                <Dialog.Input
                    label="Old password:"
                    onChangeText={value => setOldPassword(value)}
                    value={oldPassword}
                    secureTextEntry={true}
                    selectionColor={"#4A0080"}/>
                <Dialog.Input
                    label="New password:"
                    onChangeText={value => setNewPassword(value)}
                    value={newPassword}
                    secureTextEntry={true}
                    selectionColor={"#4A0080"}/>
                <Dialog.Input
                    label="Repeat new password:"
                    onChangeText={value => setRepeatNewPassword(value)}
                    value={repeatNewPassword}
                    secureTextEntry={true}
                    selectionColor={"#4A0080"}/>
                <Dialog.Button
                    label="Cancel"
                    onPress={onCancelChangingPassword}
                    style={{color: "#4A0080"}}/>
                <Dialog.Button
                    label="Confirm"
                    onPress={onConfirmChangingPassword}
                    style={{color: "#4A0080"}}/>
            </Dialog.Container>
            <View styles={Styles.field}>
                <Text style={Styles.title}>
                    Hallo <Text style={{color: "#4A0080"}}>@{user.userName}</Text>
                </Text>
                <Text style={Styles.subtitle}>Feel free to adjust your data below:</Text>
            </View>


            <View style={[Styles.field, Styles.itemRow]}>
                <View style={[Styles.field, {flexGrow: 1}]}>
                    <Text style={Styles.inputHint}>First name:</Text>
                    <TextInput style={Styles.input}
                               placeholder="First Name"
                               value={firstName}
                               onChangeText={setFirstName}
                               selectionColor={"#4A0080"}/>
                </View>
                <View style={[Styles.field, {flexGrow: 1}]}>
                    <Text style={Styles.inputHint}>Last name:</Text>
                    <TextInput style={Styles.input}
                               placeholder="Last Name"
                               value={lastName}
                               onChangeText={setLastName}
                               selectionColor={"#4A0080"}/>
                </View>
            </View>
            <View style={[Styles.field, Styles.isNarrow]}>
                <UIButton size="small" onClick={onSaveChanges} disabled={false}>Save</UIButton>
            </View>
            <View style={[Styles.field, Styles.isNarrow]}>
                <UIButton size="small" onClick={onChangePassword} disabled={false}>Change Password</UIButton>
            </View>
            <View style={[Styles.field, Styles.isNarrow]}>
                <UIButton size="small" onClick={onLogout} disabled={false}>Logout</UIButton>
            </View>
        </View>);
}

const styles = StyleSheet.create({
    leftElement: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingRight: 5
    },
    rightElement: {
        flex: 1,
        justifyContent: 'flex-end',

    }
});

