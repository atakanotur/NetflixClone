import colors from '@/source/theme/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  index: number;
  paginationIndex: number;
};

const Dot = ({ index, paginationIndex }: Props) => {
  return (
    <View style={paginationIndex === index ? styles.dot : styles.dotOpacity} />
  );
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    backgroundColor: colors.red,
    height: 8,
    width: 8,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  dotOpacity: {
    backgroundColor: colors.white,
    height: 8,
    width: 8,
    marginHorizontal: 5,
    borderRadius: 8,
    opacity: 0.5,
  },
});