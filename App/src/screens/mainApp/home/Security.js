import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import FormTitle from "../../../components/FormTitle";
import Link from "../../../components/Link";
import { colors } from "../../../config/config";
import { checkIfSignatureExist, _authenticateWithExistingKey, _createAnewBiometricKey } from "../../../hooks/operations";
import { FingerIdAccessIcon } from "../../../imports/images";
import * as Keychain from 'react-native-keychain';
import { SignUpInfoContext } from "../../forms/signUpInfoContext";
import { AppContext } from "../../../appContext";

const Security = ({ navigation }) => {
    const { user } = useContext(SignUpInfoContext);
    const { userUID } = useContext(AppContext);
    const [credentialsSavedBefore, setCredentialsSavedBefore] = useState(null)
    const [userCredentials, setUserCredentials] = useState({})


    const [biometricEnabled, setBiometricEnabled] = useState(null)
    const [message, setMessage] = useState({ title: '', desc: '', titleColor: 'transparent', descColor: 'transparent' })



    useEffect(() => {
        confirmIfUserEnabledBiometric()
        checkIfCredentialsWasSaved()
    }, [])

    const handleBiometrics = async () => {
        const keysExist = await checkIfSignatureExist()

        if (keysExist) {
            handleAuthWithExistingKey()
        } else {
            handleCreateNewBiometricKey()
        }
    }

    const handleAuthWithExistingKey = async () => {
        await _authenticateWithExistingKey(giveFeedBack, markUser, errorFeedback)
    }
    const handleCreateNewBiometricKey = () => {
        _createAnewBiometricKey(handleAuthWithExistingKey, markUser, () => null)
    }

    const markUser = () => {
        AsyncStorage.setItem('userHasEnabledBiometric', 'true');
        storeCredentials(userUID)
    }

    const checkIfCredentialsWasSaved = async () => {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
            var userCred = JSON.parse(credentials.password)
            setUserCredentials({ ...userCred })
            setCredentialsSavedBefore(true)
        } else {
            console.log('No credentials stored');
            setCredentialsSavedBefore(false)

        }
    }
    const confirmIfUserEnabledBiometric = async () => {
        try {
            const response = await AsyncStorage.getItem('userHasEnabledBiometric');
            if (response == 'true') {
                setBiometricEnabled(true)
                setMessage({ ...message, title: 'update your finger print', desc: `Tap if you wanna update your fingerprint?`, titleColor: colors.pureWhite, descColor: colors.fadeWhite })
            }
            else {
                setBiometricEnabled(false)
                setMessage({ ...message, title: 'Add your fingerprint', desc: `${user?.firstName}! We've made signing in easier for you, with just your finger print, you can login anytime, and anywhere.`, titleColor: colors.pureWhite, descColor: colors.fadeWhite })
            }

        } catch (error) {
            console.log(error, ' failed to confirm if user enabled biometric')
        }
    }

    const disableFingerPrint = async () => {
        await AsyncStorage.setItem('userHasEnabledBiometric', 'false');
        setBiometricEnabled(false)
        setMessage({ ...message, title: 'Disabled fingerprint', desc: `tap the icon to enable fingerprint.`, titleColor: colors.chip, descColor: colors.fadeWhite })
    }

    const storeCredentials = async (email) => {
        try {
            await Keychain.setGenericPassword(email, email);
        } catch (error) {
            console.log('failed to store credentials ', error)
        } finally {
            return true
        }
    }

    const giveFeedBack = () => {
        setBiometricEnabled(true)
        setMessage({
            ...message, title: 'Congratulations!!', desc: `${user?.firstName}! you can log in with your fingerprint now!`, titleColor: colors.calmGreen, descColor: colors.fadeWhite
        })
        setTimeout(() => {
            navigation.goBack()
        }, 2000);
    }
    const errorFeedback = () => {
        if (biometricEnabled) {
            setMessage({ ...message, title: 'Failed to update!!', desc: `Biometric updating failed! try again.`, titleColor: colors.calmRed, descColor: colors.fadeWhite })

        } else {
            setMessage({
                ...message, title: 'Failed!!', desc: `Biometric setup failed! try again.`, titleColor: colors.calmRed, descColor: colors.fadeWhite
            })
        }
    }



    return (
        <View style={{ flex: 1, backgroundColor: colors.neonBg, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 }}>
            <FormTitle color={message.titleColor} title={message?.title} subheading={message?.desc} suhHeadingStyles={{ color: message.descColor, paddingHorizontal: 15, textAlign: 'center' }} />
            <TouchableOpacity activeOpacity={.6} onPress={() => handleBiometrics()}>
                <FingerIdAccessIcon />
            </TouchableOpacity>

            {biometricEnabled && <Link onPress={disableFingerPrint} text={'remove fingerprint security?'} extraStyle={{ marginTop: 50 }} color={colors.calmRed} />}
        </View>
    );
};

export default Security;
