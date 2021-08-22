import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Dialogflow_V2} from 'react-native-dialogflow';
import {DialogFlowConfig} from '../config/DialogFlow';
import {colors, layout} from '../config/styling';

const {height, width} = Dimensions.get('screen');

const Bot = {
  name: 'Bot',
  id: 0,
};
const User = {
  name: 'You',
  id: 1,
};

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      chatId: 1,
      text: 'Default Bot Chat',
      createdAt: new Date(),
      user: Bot,
    },
    {
      chatId: 2,
      text: 'Default Bot Chat',
      createdAt: new Date(),
      user: Bot,
    },
    {
      chatId: 3,
      text: 'Default Bot Chat',
      createdAt: new Date(),
      user: Bot,
    },
    {
      chatId: 4,
      text: 'Default Bot Chat',
      createdAt: new Date(),
      user: Bot,
    },
  ]);
  const flatlistRef = useRef();

  const handleSendChat = async () => {
    let sentMessage = {
      chatId: messages.length + 1,
      text: message,
      createdAt: new Date(),
      user: User,
    };

    Dialogflow_V2.requestQuery(
      sentMessage.text,
      result => handleDialogflow(result),
      error => console.log(error),
    );

    setMessages(messages => messages.concat(sentMessage));
  };

  const handleDialogflow = result => {
    console.log(result, 'doalog');
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    let botMessage = {
      chatId: messages.length + 2,
      text: text,
      createdAt: new Date(),
      user: Bot,
    };
    setMessages(messages => messages.concat(botMessage));
  };

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      DialogFlowConfig.client_email,
      DialogFlowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      DialogFlowConfig.project_id,
    );
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <View style={styles.chatHeader}>
          <Text style={styles.titleText}>Chat Test</Text>
        </View>
        <FlatList
          data={messages}
          keyExtractor={item => item.chatId}
          renderItem={({item}) => (
            <View style={{height: 50}}>
              <Text>{item.text}</Text>
            </View>
          )}
        />
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="ini textinput"
            value={message}
            onChangeText={text => setMessage(text)}
          />
          <TouchableOpacity onPress={handleSendChat}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  chatHeader: {
    height: height * 0.075,
    backgroundColor: colors.primary.dark,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    width: width * 0.8,
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    width: width,
    paddingHorizontal: width * 0.05,
  },
  titleText: {
    color: colors.light.light,
    fontSize: layout.fontSize.xl,
    fontWeight: 'bold',
  },
});
