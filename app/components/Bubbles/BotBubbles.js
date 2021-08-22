import React from 'react';
import {Dimensions, StyleSheet, Text, View, Image} from 'react-native';
import {colors, layout} from '../../config/styling';

const {width, height} = Dimensions.get('screen');

export default function BotBubbles({item}) {
  return (
    <View style={styles.fromBot}>
      <Image style={styles.avatar} source={item.user.avatar} />
      <View>
        <View style={styles.fromBotBubble}>
          <Text style={styles.textMessage}>{item.text}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.1,
  },
  fromBot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: layout.spacer.width.small / 2,
  },
  fromBotBubble: {
    marginLeft: layout.spacer.width.small,
    backgroundColor: colors.dark.dark,
    maxWidth: width * 0.7,
    padding: layout.spacer.width.small,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    borderColor: colors.light.light,
    borderWidth: StyleSheet.hairlineWidth,
  },
  textMessage: {
    fontSize: layout.fontSize.m,
    color: colors.light.light,
    fontWeight: '500',
  },
});
