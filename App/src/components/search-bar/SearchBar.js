import React, { useState } from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { colors } from "../../config/config";
import { FingerIdAccessIcon, SearchIcon } from "../../imports/images";
import Link from "../Link";
import { SearchBarStyles } from "./styles";




const SearchBar = ({ SearchBarExtraStyles, placeholder = '', onSearch, getText, onClear, value }) => {
    const [searchFocused, setSearchFocused] = useState(false)
    return (

        <SearchBarStyles.Container style={SearchBarExtraStyles}>
            <SearchBarStyles.SearchWrapper style={searchFocused ? { borderColor: colors.brandColor } : {}}>
                <SearchBarStyles.SearchInput
                    onFocus={() => setSearchFocused(true)}
                    autoFocus={true}
                    value={value}
                    onChangeText={(text) => getText(text)}
                    placeholder={placeholder}
                    placeholderTextColor={colors.placeholderColor} />
            </SearchBarStyles.SearchWrapper>
            <View style={{ width: 10, backgroundColor: 'transparent' }} />
            <SearchBarStyles.Touch onPress={onSearch} style={searchFocused ? { borderColor: colors.brandColor } : {}}>
                <SearchIcon hieght={30} width={30} />
            </SearchBarStyles.Touch>
            <Link text={'clear'} onPress={onClear} extraStyle={{ alignSelf: 'center' }} />
        </SearchBarStyles.Container >

    );
};

export default SearchBar;
