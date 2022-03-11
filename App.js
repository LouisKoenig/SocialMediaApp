import React, {useState} from 'react';
import type { Node } from 'react';
import {
  useColorScheme
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import 'react-native-get-random-values';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BSON } from 'realm';
//Import Screens
import TabBar from './js/TabBar';
import WelcomeScreen from './js/screens/WelcomeScreen';
import SignUpScreen from './js/screens/SignUpScreen';
import LoginScreen from './js/screens/LoginScreen';

//Context
import { UserContext } from './js/context/UserContext';
import { RealmContext } from './js/context/RealmContext';
import { realmDB } from './js/realm/RealmDB';
import {generateToken} from './js/Util';
import {sha256} from 'react-native-sha256';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};*/

const App: () => Node = () => {
  let [currentUser, setCurrentUser] = useState();

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const initDatabase = async () => {

    const dataVersion = 6;
    const lastDataVersion = await AsyncStorage.getItem("dataVersion")

    console.log(dataVersion + " " + lastDataVersion);
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
        time: new Date(),
      });

      realmDB.create("Post", {
        _id: new BSON.UUID(),
        userName: "SabineHofer2303",
        text: "Das ist ein Test Post mit Video.",
        time: new Date()
      });

      realmDB.create("Post", {
        _id: new BSON.UUID(),
        userName: "AnonymousITFreak",
        text: "Das ist ein Test Post mit Bild.",
        time: new Date()
      });

      realmDB.create("Post", {
        _id: new BSON.UUID(),
        userName: "CrazyTestUser",
        text: "Das ist ein Test Post mit Video und Bild.",
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
                            options={{ headerShown: false }}/>
              <Stack.Screen name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}/>
              <Stack.Screen name="TabBar"
                            component={TabBar}
                            options={{ headerShown: false }}/>
            </Stack.Navigator>
          </NavigationContainer>
          {/*{user ?
              <TabBar/>
          :
              <SafeAreaView style={{flex: 1}}>
                  <StatusBar backgroundColor="rgba(255, 0, 0, 0.2)"/>
                  <WelcomeScreen/>
              </SafeAreaView>
          }*/}
        </UserContext.Provider>
      </RealmContext.Provider>

  );
};

export default App;
