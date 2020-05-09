import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';

import Firebase from './lib/firebase';
import { apolloClient } from './lib/apollo';

import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';

const RootStack = createStackNavigator();
const AuthenticationStack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setReady(true);
    });
  }, []);

  if (!ready) return null;
  return (
    <NavigationContainer>
      {user && (
        <ApolloProvider client={apolloClient}>
          <RootStack.Navigator
            screenOptions={{ headerShown: false }}
          >
            <RootStack.Screen name="Home" component={Home} />
          </RootStack.Navigator>
        </ApolloProvider>
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
