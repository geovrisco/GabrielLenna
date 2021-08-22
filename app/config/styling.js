import {Dimensions} from 'react-native';

export const colors = {
  primary: {
    dark: '#042148',
    light: '#2ba9d3',
    regular: '#0b56cf',
  },
  dark: {
    dark: '#4a516c',
    light: '#666666',
  },
  light: {
    light: '#fff',
  },
};

const {width, height} = Dimensions.get('screen');

export const layout = {
  fontSize: {
    s: 12,
    m: 14,
    l: 16,
    xl: 18,
    icon: 25,
  },
  spacer: {
    height: {
      small: height * 0.025,
      medium: height * 0.045,
      large: height * 0.65,
      xSmall: height * 0.01,
    },
    width: {
      small: width * 0.025,
      medium: width * 0.05,
      large: width * 0.075,
    },
  },
};
