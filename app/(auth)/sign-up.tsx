import { ScrollView, StyleSheet, Text, View, Dimensions, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { useState } from 'react'
import CustomButton from '@/components/Button'
import { createUser  } from '@/lib/appwrite'
import { z } from 'zod';
import { Link } from 'expo-router'
import { router } from 'expo-router'
import { useGlobalContext } from '../context/app-provider'
import { send, EmailJSResponseStatus } from '@emailjs/react-native'

const SignUpSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }).max(20),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const SignUp = () => {

    const { setUser , setIsLogged } = useGlobalContext()!;

    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleSubmit = async () => {
        const validation = SignUpSchema.safeParse(form);
            
            if (!validation.success) {
                Alert.alert("Error", "Invalid form data");
                return;
            }
            
            setSubmitting(true);
    
            try {
                const user = await createUser(form.email, form.password, form.username);
                setUser(user);
                setIsLogged(true);

                router.replace('/verify');

            } catch (error) {
                Alert.alert("Error", "Error creating user");
            } finally {
                setSubmitting(false);
            }
    }

  return (
    <SafeAreaView className='bg-white h-full'>
        <ScrollView>
            <View className='w-full flex justify-center items-center h-full px-4 my-6'>
                <Text className='text-bold text-3xl mb-20 underline'>
                        Make your account
                </Text>

                <FormField
                    title="Username"
                    value={form.username}
                    placeholder="Enter your username"
                    handleChangeText={(e) => setForm({...form, username: e})}
                    otherStyles={{marginTop: 20}}
                />
                <FormField
                    title="Email"
                    value={form.email}
                    placeholder="Enter your email"
                    handleChangeText={(e) => setForm({...form, email: e})}
                    otherStyles={{marginTop: 20}}
                />

                <FormField
                    title="Password"
                    value={form.password}
                    placeholder="Enter your password"
                    handleChangeText={(e) => setForm({...form, password: e})}
                    otherStyles={{marginTop: 20}}
                />

                <CustomButton
                    title="Sign Up"
                    handlePress={handleSubmit}
                    containerStyles={{marginTop: 20}}
                    isLoading={isSubmitting}
                />

                <View>
                  <Text style={{ marginTop: 20, fontSize: 20}}>
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