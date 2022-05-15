import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Collapsible} from '../imports/all_packages';
import {universalPadding, width, sMargin, colors} from '../config/config';

export default CollapseView = ({closed = true, onPress}) => {
  return (
    <Collapsible collapsed={closed} onPress={onPress}>
      <View style={{height: 600, backgroundColor: 'green'}}></View>
    </Collapsible>
  );
};

const styles = StyleSheet.create({
  container: {},
});
