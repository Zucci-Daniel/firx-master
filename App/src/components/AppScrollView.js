import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

export default AppScrollView = ({
  children,
  extraStyle,
  extraScrollStyle,
  customHieght,
  paddingBottom,
  ...props
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          height: customHieght ? customHieght : '100%',
        },
        extraStyle,
      ]}>
      <ScrollView
        contentContainerStyle={[styles.view, extraScrollStyle]}
        alwaysBounceVertical
        showsVerticalScrollIndicator={false}
        {...props}>
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
