import { ScrollView, StyleSheet, Text, View, Dimensions, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { useState } from 'react'
import CustomButton from '@/components/Button'
import { getAccount, createDummyUser } from '@/lib/appwrite'

import { Link } from 'expo-router'
const SignUp = () => {

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const submit = () => {
        createDummyUser();
    }
    const [isSubmitting, setSubmitting] = useState<boolean>(false);

  return (
    <SafeAreaView>
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.textcol}>
                        Sign Up
                </Text>

                <FormField
                    title="Username"
                    value={form.username}
                    placeholder="Enter your username"
                    handleChangeText={(e) => {setForm({...form, username: e})}}
                    otherStyles={{marginTop: 20}}
                />
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
                    title="Sign Up"
                    handlePress={submit}
                    containerStyles={{marginTop: 20}}
                    isLoading={isSubmitting}
                />

                <View>
                  <Text style={{color: '#fff', marginTop: 12}}>
                    Already have an account? <Link href="/sign-in">Sign In</Link>
                  </Text>
                </View>
           </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height,
    },
    textcol: {
        color: '#fff',
        fontSize: 30,
    }

})