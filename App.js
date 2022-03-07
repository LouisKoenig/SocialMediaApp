import React, {useState} from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Import Screens
import TabBar from './js/TabBar';
import WelcomeScreen from './js/screens/WelcomeScreen';
import SignUpScreen from './js/screens/SignUpScreen';
import LoginScreen from './js/screens/LoginScreen';
import { UserContext } from './js/context/UserContext';
import { RealmContext } from './js/context/RealmContext';

import { realmDB } from './js/realm/RealmDB';

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

  const Stack = createNativeStackNavigator();

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
