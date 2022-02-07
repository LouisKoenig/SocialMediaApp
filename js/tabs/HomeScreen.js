import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Button,
    TextInput
}
    from 'react-native';

export default function HomeScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const clickLogin = () => {
        console.log("Test");
    }

  return (
      <View style={styles.container}>

          {/*Title*/}
          <Text style={[styles.title, styles.field]}>Login</Text>

          {/*Email*/}
          <View style={styles.field}>
              <Text style={styles.inputHint}>E-Mail</Text>
              <TextInput value={email}
                         onChangeText={setEmail}
                         style={styles.input}/>
          </View>

          {/*Password*/}
          <View style={styles.field}>
              <Text style={styles.inputHint}>Password</Text>
              <TextInput value={password}
                         onChangeText={setPassword}
                         style={styles.input}/>
          </View>

          {/* Styles not working */}
          <View style={[styles.test]}>
              <TouchableOpacity style={[styles.buttonContainer, styles.field]}>
                  <Text style={[styles.button]}>Test</Text>
              </TouchableOpacity>
          </View>


      </View>);
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "600"
    },
    test: {
        flex: 1
    },
    buttonContainer: {
        flexShrink: 1,
        padding: 10,
        borderRadius: 21,
        backgroundColor: "purple",
        alignItems: 'center',
    },
    button: {
        fontSize: 20,
        color: "white"
    },
    field: {
        marginTop: 20,
    },
    inputHint: {
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
