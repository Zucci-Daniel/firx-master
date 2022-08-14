import styled from '@emotion/native';
import { colors } from '../../config/config';


export const SearchBarStyles = {
  Container: styled.View`
    background: transparent;
    width: 100%;
    flex-direction: row;
    align-items:center
  `,
  SearchWrapper: styled.View`
    background: ${colors.pureWhite};
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 0 15px;
    flex: 1;
    width: 100%;
    flex-direction: row;
    border: 1px solid ${colors.chip};
  `,
  SearchInput: styled.TextInput`
    margin: 0;
    width: 100%;
    height: 100%;
    padding: 10px;
    color: ${colors.black};
    flex: 1;
    font-size: 17px;
  `,

  Touch: styled.TouchableOpacity`
    padding: 10px;
    align-self: stretch;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: ${colors.pureWhite};
    border: 1px solid ${colors.chip};
  `,
};
