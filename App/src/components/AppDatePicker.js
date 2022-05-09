import React, {useState} from 'react';
import {Button, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icons from 'react-native-vector-icons/FontAwesome';
import {colors} from '../config/config';

const AppDatePicker = ({
  getDate,
  label = 'Add your birth date',
  extraDateStyles,
  iconColor = colors.chip,
}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateColor, setDateColor] = useState('gray');
  const [useThisDate, setuseThisDate] = useState({
    theMonth: '',
    theDay: '',
    theYear: '',
  });

  const getTheDate = selectedDate => {
    setOpen(false);
    setDate(selectedDate);
    let splitedDate = selectedDate.toString();
    let pushDateToArray = splitedDate.split(' ');
    pushDateToArray.splice(4);
    pushDateToArray.shift();
    let [theMonth, theDay, theYear] = pushDateToArray;

    setuseThisDate({
      theMonth,
      theDay,
      theYear,
    });

    return `${theMonth}/${theDay}/${theYear}`;
  };

  return (
    <>
      <View style={styles.dateSelector}>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text style={[styles.dateColor, {color: dateColor}, extraDateStyles]}>
            {useThisDate.theMonth == ''
              ? label
              : `${useThisDate.theMonth}/${useThisDate.theDay}/${useThisDate.theYear}`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Icons name="calendar" size={30} color={iconColor} />
        </TouchableOpacity>
      </View>

      <DatePicker
        textColor={colors.pureWhite}
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={date => {
          const formatDate = getTheDate(date);
          setDateColor(colors.neonBg);

          getDate(formatDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default AppDatePicker;

const styles = StyleSheet.create({
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomColor:config.colors.placeholderColor,
    borderBottomColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingBottom: 40,
  },
  dateColor: {
    fontSize: 20,
  },
});
