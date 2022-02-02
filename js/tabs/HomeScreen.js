import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
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
          <Button title="Button"
                  onPress={() => clickLogin()}
                  style={[styles.button, styles.field]}/>
      </View>);
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "600"
    },
    button: {
        backgroundColor: "purple"
    },
    field: {
        paddingTop: 20

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
