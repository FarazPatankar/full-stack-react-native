import React, { useState } from 'react';
import {
  SafeAreaView, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator
} from 'react-native';
import tailwind from 'tailwind-rn';

import Firebase, { fns } from '../lib/firebase';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const registerUser = fns.httpsCallable('registerUser');
      await registerUser({ email, password });
      await Firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };
  return (
    <SafeAreaView style={tailwind('flex-1 justify-center')}>
      {isLoading && <ActivityIndicator />}
      {!isLoading && (
        <View style={tailwind('py-10 px-5')}>
          <Text style={tailwind('text-4xl font-bold')}>
            Sign up
          </Text>

          <View style={tailwind('mt-10')}>
            <TextInput
              placeholder="Email"
              onChangeText={(val) => setEmail(val)}
              autoCapitalize="none"
              style={tailwind('text-lg border-b-2 border-blue-500')}
            />
            <TextInput
              placeholder="Password"
              onChangeText={(val) => setPassword(val)}
              secureTextEntry
              style={tailwind('text-lg border-b-2 border-blue-500 mt-5')}
            />

            <TouchableOpacity
              style={tailwind('bg-blue-500 rounded-lg py-3 mt-10')}
              onPress={handleSignup}
            >
              <Text style={tailwind('text-white text-center font-bold text-lg rounded-lg')}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tailwind('mt-2 flex-row justify-center')}>
            <Text>Already have an account?</Text>
            <TouchableOpacity
              style={tailwind('ml-1')}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={tailwind('text-blue-500')}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Signup;
