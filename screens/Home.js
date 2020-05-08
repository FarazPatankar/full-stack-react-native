import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';

import Firebase from '../lib/firebase';

const Home = () => (
  <SafeAreaView style={tailwind('flex-1 justify-center items-center')}>
    <Text>Home</Text>
    <TouchableOpacity
      style={tailwind('bg-red-500 py-3 px-5 rounded-lg mt-2')}
      onPress={() => Firebase.auth().signOut()}
    >
      <Text style={tailwind('text-white text-base')}>
        Logout
      </Text>
    </TouchableOpacity>
  </SafeAreaView>
);

export default Home;
