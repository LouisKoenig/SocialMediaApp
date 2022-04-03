import React, {useState} from 'react';
import type { Node } from 'react';
import 'react-native-get-random-values';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BSON } from 'realm';
import {generateToken} from './js/Util';
import {sha256} from 'react-native-sha256';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Import Screens
import TabBar from './js/TabBar';
import WelcomeScreen from './js/screens/WelcomeScreen';
import SignUpScreen from './js/screens/SignUpScreen';
import LoginScreen from './js/screens/LoginScreen';
import CommentScreen from './js/screens/CommentScreen';

//Context
import { UserContext } from './js/context/UserContext';
import { RealmContext } from './js/context/RealmContext';
import { realmDB } from './js/realm/RealmDB';



const App: () => Node = () => {
  let [currentUser, setCurrentUser] = useState();

  /*const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };*/

  const initDatabase = async () => {

    const dataVersion = 8;
    const lastDataVersion = await AsyncStorage.getItem("dataVersion")

    if(lastDataVersion && lastDataVersion >= dataVersion) {
      return;
    }

    console.log("Updated Database");
    await AsyncStorage.setItem("dataVersion", dataVersion.toString());

    if(! realmDB.objectForPrimaryKey("User", "CrazyTestUser")) {
      const salt = generateToken(32);
      sha256(salt + "CrazyPassword").then((hash) => {

        realmDB.write(() => {
          realmDB.create("User", {
            firstName: "Hans",
            lastName: "Meier",
            userName: "CrazyTestUser",
            salt: salt,
            password: hash
          });
        });
      });
    }

    if(! realmDB.objectForPrimaryKey("User", "SabineHofer2303")) {
      const salt = generateToken(32);
      sha256(salt + "mbTZOi6Jqq").then((hash) => {

        realmDB.write(() => {
          realmDB.create("User", {
            firstName: "Sabine",
            lastName: "Hofer",
            userName: "SabineHofer2303",
            salt: salt,
            password: hash
          });
        });
      });
    }

    if(! realmDB.objectForPrimaryKey("User", "AnonymousITFreak")) {
      const salt = generateToken(32);
      sha256(salt + "SecretPass743$").then((hash) => {

        realmDB.write(() => {
          realmDB.create("User", {
            firstName: "Max",
            lastName: "Mustermann",
            userName: "AnonymousITFreak",
            salt: salt,
            password: hash
          });
        });
      });
    }

    realmDB.write(() => {
      realmDB.delete(realmDB.objects("Post"));

      realmDB.create("Post", {
        _id: new BSON.UUID(),
        userName: "CrazyTestUser",
        text: 'Das ist ein Test Post.',
        image: "",
        video: "",
        time: new Date(),
      });

      realmDB.create("Post", {
        _id: new BSON.UUID(),
        userName: "SabineHofer2303",
        text: "Das ist ein Test Post mit Video.",
        image: "",
        video: "https://www.youtube.com/watch?v=ER8HBwDKMGw",
        time: new Date()
      });

      realmDB.create("Post", {
        _id: new BSON.UUID(),
        userName: "AnonymousITFreak",
        text: "Das ist ein Test Post mit Bild.",
        image: "https://img1.gbpicsonline.com/gb/17/121.png",
        video: "",
        time: new Date()
      });

      realmDB.create("Post", {
        _id: new BSON.UUID(),
        userName: "CrazyTestUser",
        text: "Das ist ein Test Post mit Video und Bild.",
        image: "https://img1.gbpicsonline.com/gb/17/121.png",
        video: "https://www.youtube.com/watch?v=ER8HBwDKMGw",
        time: new Date()
      });
    });
  }

  const Stack = createNativeStackNavigator();

  initDatabase();

  return (
      <RealmContext.Provider value={{realmDB: realmDB}}>
        <UserContext.Provider value={{currentUser: currentUser, setCurrentUser: setCurrentUser}}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Welcome"
                            component={WelcomeScreen}
                            options={{ headerShown: false }}/>
              <Stack.Screen name="SignUp"
                            component={SignUpScreen}
                            options={{
                              headerTintColor: "#4A0080",
                              headerTitleStyle: {
                                color: "black"
                              }
                            }}/>
              <Stack.Screen name="Login"
                            component={LoginScreen}
                            options={{
                              headerTintColor: "#4A0080",
                              headerTitleStyle: {
                                color: "black"
                              }
                            }}/>
              <Stack.Screen name="TabBar"
                            component={TabBar}
                            options={{ headerShown: false }}/>
              <Stack.Screen name="Comments"
                            component={CommentScreen}
                            options={{
                              headerTintColor: "#4A0080",
                              headerTitleStyle: {
                                color: "black"
                              }
                            }}/>
            </Stack.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      </RealmContext.Provider>

  );
};

export default App;
