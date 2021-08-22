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
  Image,
  Keyboard,
} from 'react-native';
import {Dialogflow_V2} from 'react-native-dialogflow';
import {DialogFlowConfig} from '../config/DialogFlow';
import {colors, layout} from '../config/styling';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import BotBubbles from '../components/Bubbles/BotBubbles';
import UserBubbles from '../components/Bubbles/UserBubbles';

const {height, width} = Dimensions.get('screen');

const Bot = {
  name: 'Bot',
  id: 0,
  avatar: require('../asset/botIcon.jpeg'),
};
const User = {
  name: 'You',
  id: 1,
  avatar: require('../asset/botIcon.jpeg'),
};

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [placeholder, setPlaceholder] = useState('🐾  Chat with doggo here...');
  const flatlistRef = useRef();

  const handleSendChat = async () => {
    if (!message) {
      setPlaceholder('🐾  Chat cannot be empty!');
      return null;
    }
    setPlaceholder('🐾  Chat with doggo here...');
    let sentMessage = {
      chatId: messages.length + 1,
      text: message,
      user: User,
    };

    Dialogflow_V2.requestQuery(
      sentMessage.text,
      result => handleDialogflow(result),
      error => console.log(error),
    );

    setMessages(messages => messages.concat(sentMessage));
    setMessage('');
    Keyboard.dismiss();
  };

  const handleDialogflow = result => {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    let botMessage = {
      chatId: messages.length + 2,
      text: text,

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
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <View style={styles.container}>
        <LinearGradient
          style={{height: height * 0.7, flex: 1}}
          colors={[
            colors.primary.light,
            colors.primary.regular,
            colors.primary.dark,
          ]}>
          <View style={styles.chatHeader}>
            <Material
              size={layout.fontSize.icon}
              name="paw"
              color={colors.light.light}
            />
            <Text style={styles.titleText}>Deng Deng!</Text>
            <Material
              size={layout.fontSize.icon}
              name="paw"
              color={colors.light.light}
            />
          </View>
          <FlatList
            ref={flatlistRef}
            contentContainerStyle={styles.flatlListContainer}
            data={messages}
            onContentSizeChange={() =>
              flatlistRef.current.scrollToEnd({animated: true})
            }
            onLayout={() => flatlistRef.current.scrollToEnd({animated: true})}
            keyExtractor={item => item.chatId}
            renderItem={({item}) => (
              <>
                {item.user.id === 0 ? (
                  <BotBubbles item={item} />
                ) : (
                  <UserBubbles item={item} />
                )}
              </>
            )}
          />
        </LinearGradient>
        <View style={[styles.textInputContainer]}>
          <View>
            <TextInput
              placeholderTextColor={colors.dark.dark}
              style={styles.textInput}
              placeholder={placeholder}
              value={message}
              onChangeText={text => setMessage(text)}
            />
            <View style={styles.textInputUnderline} />
          </View>
          <TouchableOpacity onPress={handleSendChat}>
            <View style={styles.sendButton(message ? 1 : 0.5)}>
              <Icon name="send" size={layout.fontSize.icon} />
              <Text>Send</Text>
            </View>
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
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  flatlListContainer: {
    width: width,
    paddingHorizontal: layout.spacer.width.small,
    // paddingBottom: 100,
  },

  sendButton: opacity => ({
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.2,
    height: height * 0.075,
    opacity: opacity,
  }),
  textInput: {
    width: width * 0.7,
    paddingLeft: layout.spacer.width.small,
    height: height * 0.05,
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.light.light,
    width: width,
    paddingHorizontal: layout.spacer.width.small,
    height: height * 0.075,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  textInputUnderline: {
    borderBottomWidth: 1,
    marginLeft: layout.spacer.width.small - 1,
    borderColor: colors.dark.dark,
  },

  titleText: {
    color: colors.light.light,
    fontSize: layout.fontSize.xl,
    fontWeight: 'bold',
  },
});
