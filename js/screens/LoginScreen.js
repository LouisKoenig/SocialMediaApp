import React, { useState, useContext} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput, Alert,
} from 'react-native';
import Styles from '../../StyleSheet';
import UIButton from '../components/UIButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sha256} from 'react-native-sha256';
import { UserContext } from '../UserContext';

const LoginScreen = ({navigation}) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const userContext = useContext(UserContext);

    function createUserID(userName) {
        return "User_" + userName;
    }

    const onClickLogin = async () => {
        let user = JSON.parse(await AsyncStorage.getItem(createUserID(userName)));
        if(! user){
            Alert.alert("User does not exists");
            return;
        }

        let hash = await sha256(user.salt + password);
        if(user.password !== hash){
            Alert.alert("Wrong Password")
            return;
        }

        userContext.setUser(user);
        navigation.navigate('TabBar');
    }

    const onClickSignUp = () => {
        navigation.navigate('SignUp');
    }

  return (
      <View style={Styles.container}>

          {/*Title*/}
          <Text style={[Styles.title, Styles.field]}>Login</Text>

          {/*Email*/}
          <View style={Styles.field}>
              <Text style={Styles.inputHint}>Username</Text>
              <TextInput value={userName}
                         onChangeText={setUserName}
                         style={Styles.input}/>
          </View>

          {/*Password*/}
          <View style={Styles.field}>
              <Text style={Styles.inputHint}>Password</Text>
              <TextInput value={password}
                         onChangeText={setPassword}
                         style={Styles.input}
                         secureTextEntry={true}/>
          </View>

          <View style={Styles.field}>
              <Text>
                  <Text>No Account? Sign Up </Text>
                  <Text style={{color: "#4A0080"}} onPress={() => onClickSignUp()}>Here</Text>
              </Text>
          </View>

          {/* Styles not working */}
          <View style={[Styles.field]}>
              <UIButton onClick={() => onClickLogin()}>Login</UIButton>
          </View>


      </View>);
}

export default LoginScreen;
