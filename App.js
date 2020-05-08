import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Firebase from './lib/firebase';

import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';

const RootStack = createStackNavigator();
const AuthenticationStack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      {user && (
        <RootStack.Navigator
          screenOptions={{ headerShown: false }}
        >
          <RootStack.Screen name="Home" component={Home} />
        </RootStack.Navigator>
      )}
      {!user && (
        <AuthenticationStack.Navigator
          screenOptions={{ headerShown: false }}
        >
          <AuthenticationStack.Screen name="Signup" component={Signup} />
          <AuthenticationStack.Screen name="Login" component={Login} />
        </AuthenticationStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
