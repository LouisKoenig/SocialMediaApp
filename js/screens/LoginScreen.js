import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Styles from '../../StyleSheet';

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onClickLogin = () => {
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
              <Text style={Styles.inputHint}>E-Mail</Text>
              <TextInput value={email}
                         onChangeText={setEmail}
                         style={Styles.input}/>
          </View>

          {/*Password*/}
          <View style={Styles.field}>
              <Text style={Styles.inputHint}>Password</Text>
              <TextInput value={password}
                         onChangeText={setPassword}
                         style={Styles.input}/>
          </View>

          <View style={Styles.field}>
              <Text>
                  <Text>No Account? Sign Up </Text>
                  <Text style={{color: "#4A0080"}} onPress={() => onClickSignUp()}>Here</Text>
              </Text>
          </View>

          {/* Styles not working */}
          <View style={[Styles.test]}>
              <TouchableOpacity style={[Styles.buttonContainer, Styles.field]}
                                onPress={() => onClickLogin()}>
                  <Text style={[Styles.button]}>Login</Text>
              </TouchableOpacity>
          </View>


      </View>);
}

export default LoginScreen;
