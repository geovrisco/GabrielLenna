import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const {height, width} = Dimensions.get('screen');
const {height: windowHeight, width: windowWidth} = Dimensions.get('window');

export default function DeviceInfoScreen() {
  const [Device, setDevice] = useState({
    deviceName: '',
    deviceId: '',
    product: '',
    brand: '',
    notch: true,
  });

  const getDeviceInfo = async () => {
    let deviceName = await DeviceInfo.getDevice();
    let deviceId = DeviceInfo.getDeviceId();
    let product = await DeviceInfo.getProduct();
    let brand = DeviceInfo.getBrand();
    let notch = DeviceInfo.hasNotch() ? 'yes' : 'no';
    console.log(notch);

    setDevice({
      deviceId,
      deviceName,
      product,
      brand,
      notch,
    });
  };

  useEffect(() => {
    getDeviceInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Device Info</Text>
      <Text>Name : {Device.deviceName}</Text>
      <Text>DeviceId : {Device.deviceId}</Text>
      <Text>Product : {Device.product}</Text>
      <Text>Brand : {Device.brand}</Text>
      <Text>Notch : {Device.notch}</Text>
      <Text>
        Dimension : {Math.round(width)} X {Math.round(height)}
      </Text>

      <View style={{height: 10}} />
      <Text>ScreenWIdth : {width}</Text>
      <Text>ScreenHeight : {height}</Text>

      <Text>windowWidth : {windowWidth}</Text>
      <Text>windowHeight : {windowHeight}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
  },
});
