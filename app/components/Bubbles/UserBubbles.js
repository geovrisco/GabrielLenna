import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {colors, layout} from '../../config/styling';

const {width, height} = Dimensions.get('screen');

export default function UserBubbles({item}) {
  return (
    <View style={styles.fromUser}>
      <Text style={styles.textMessage}>{item.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fromUser: {
    alignSelf: 'flex-end',
    marginLeft: layout.spacer.width.small,
    backgroundColor: colors.primary.light,
    maxWidth: width * 0.7,
    padding: layout.spacer.width.small,
    borderRadius: 12,
    borderTopRightRadius: 0,
    borderColor: colors.light.light,
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: layout.spacer.width.small / 2,
  },
  textMessage: {
    fontSize: layout.fontSize.m,
    color: colors.light.light,
    fontWeight: '500',
  },
});
