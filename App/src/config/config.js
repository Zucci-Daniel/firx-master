import {Dimensions, StyleSheet} from '../imports/all_RnComponents';

const brandFont = {
  medium: 'Ubuntu Mono',
  regular: 'Catamaran-Regular',
  mediumBold: 'Catamaran-Bold',
  semiBold: 'Catamaran-SemiBold',
  cashFont: 'spacefri',
};

const colors = {
  calmBlue: '#a3bae3',
  postActions: '#d2d4c3',
  initials: '#dee3de',
  neonBg: '#03012d',
  brandColor: '#fafafa',
  brandBg: '#010101',
  // brandBg:'#1A2B61',
  pureWhite: '#E1E9EE',
  // pureWhite: '#E1E9EE',
  inputUnderLineColor: '#6A7085',
  placeHolder: '#1A2B61',
  hairLineColor: '#010101',
  //   hairLineColor: '#324995',
  walletOptionColor: '#24a0ed',
  // walletOptionColor:'#333333',
  chip: '#424040',
  hairLineGray: '#E2DFDF',
  notificationRed: '#fa3e3e',
  notificationBg: '#E1EFF3',
  fadeWhite: '#ccc',
  calmRed: '#D2686E',
  info: '#c9aa88',
  dropDownBg: '#e9aa88',
  calmGreen: 'green',
  skeletonBg: '#020035',
  skeletonAnimationBg: '#002244',
};

const {width, height} = Dimensions.get('screen');
const universalPadding = width / 10;
const sMargin = 10;
const inputBorder = 5;
const menuIconSize = 30;
const postHeight = height / 1.7;

const postSize = height / 1.5;
const avatarWidth = width / 13;
const avatarEditWidth = width / 3;

//for the bottom navigation
const tabBarBottomConfig = {
  backgroundColor: colors.neonBg,
  // height: height / 17,
  border: '0',
  borderTopWidth: 0,
  borderTopColor: colors.neonBg,
  justifyContent: 'center',
};

export {
  colors,
  width,
  height,
  universalPadding,
  sMargin,
  inputBorder,
  tabBarBottomConfig,
  menuIconSize,
  brandFont,
  postSize,
  avatarWidth,
  postHeight,
  avatarEditWidth,
};
