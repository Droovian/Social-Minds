import { ScrollView, StyleSheet, Text, View, Dimensions, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { useState } from 'react'
import CustomButton from '@/components/Button'

import { Link } from 'expo-router'
const SignIn = () => {

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [isSubmitting, setSubmitting] = useState<boolean>(false);

  return (
    <SafeAreaView>
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.textcol}>
                        Sign In
                </Text>

                <FormField
                    title="Email"
                    value={form.email}
                    placeholder="Enter your email"
                    handleChangeText={(e) => {setForm({...form, email: e})}}
                    otherStyles={{marginTop: 20}}
                />

                <FormField
                    title="Password"
                    value={form.password}
                    placeholder="Enter your password"
                    handleChangeText={(e) => {setForm({...form, password: e})}}
                    otherStyles={{marginTop: 20}}
                />

                <CustomButton
                    title="Sign In"
                    handlePress={() => Alert.alert("Sign In")}
                    containerStyles={{marginTop: 20}}
                    isLoading={isSubmitting}
                />
           </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height - 100,
    },
    textcol: {
        color: '#fff',
        fontSize: 30,
    }

})