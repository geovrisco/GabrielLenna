import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ChatScreen from './app/screen/ChatScreen';
import {colors} from './app/config/styling';
import DeviceInfoScreen from './app/screen/DeviceInfoScreen';

const App = () => {
  const [chat, setChat] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      {chat ? <ChatScreen /> : <DeviceInfoScreen />}
      <TouchableOpacity
        style={{
          position: 'absolute',
          height: 50,
          width: 50,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'dodgerblue',
          left: 0,
        }}
        onPress={() => setChat(!chat)}>
        <Text style={{color: '#fff'}}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
