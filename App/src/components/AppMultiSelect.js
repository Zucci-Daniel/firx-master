import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../config/config';

const dataArray = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const AppMultiSelect = ({
  data = dataArray,
  search,
  maxHeight,
  valueField,
  placeholder,
  searchPlaceholder,
  labelField,
  value,
  onFocus,
  onBlur,
  onChange,
  initialLabel,
  ...props
}) => {
  return (
    <Dropdown
      containerStyle={styles.container}
      style={[styles.dropdown]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      selectedStyle={styles.selectedStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      // search={search}
      // maxHeight={'auto'}
      labelField={'label'}
      valueField={'value'}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      // onChange={selectedItem => onChange(selectedItem.map(item => item.value))}
      onChange={selectedItem =>
        onChange ? onChange(selectedItem) : console.log(selectedItem)
      }
      {...props}
    />
  );
};

export default AppMultiSelect;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.skeletonAnimationBg,
  },
  dropdown: {
    borderWidth: 0.5,
    borderRadius: 3,
    paddingHorizontal: 8,
    backgroundColor: colors.skeletonAnimationBg,
    padding: 10,
    textTransform: 'capitalize',
    marginBottom: 30,
  },

  label: {
    position: 'absolute',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.pureWhite,
    textTransform: 'capitalize',
  },

  inputSearchStyle: {
    height: 50,
    padding: 10,
    fontSize: 16,
    margin: 30,
    backgroundColor: colors.calmBlue,
    color: colors.info,
    borderRadius: 4,
  },
});
