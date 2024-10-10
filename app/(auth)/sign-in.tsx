import { ScrollView, StyleSheet, Text, View, Dimensions, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { useState } from 'react'
import CustomButton from '@/components/Button'
import { z } from 'zod';
import { router } from 'expo-router'
import { signIn } from '@/lib/appwrite'
import { Link } from 'expo-router'
import { useGlobalContext } from '../context/app-provider'
import { loginWithGoogle } from '@/lib/appwrite'
import { getCurrentUser } from '@/lib/appwrite'
import UserCard from '@/components/UserCard'
const SignInSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const SignIn = () => {

    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const { setUser, setIsLogged } = useGlobalContext()!;
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async () => {
        
        const validation = SignInSchema.safeParse(form);
            
            if (!validation.success) {
                Alert.alert("Error", "Invalid form data");
                return;
            }
            
            setSubmitting(true);
    
            try {
                await signIn(form.email, form.password);
                const getUser = await getCurrentUser();
                setUser(getUser);
                setIsLogged(true);
                Alert.alert("Success", "Signed in successfully");
                router.replace('/home');

            } catch (error) {
                Alert.alert("Error", "Error signing in");
            } finally {
                setSubmitting(false);
            }
    }
    
  return (
    <SafeAreaView className='bg-white h-full'>
            <View className='w-full flex justify-center items-center h-full px-5 my-6'>
                <Text className='mb-10 font-bold text-left text-2xl'>
                        Welcome to Social Minds
                </Text>

                <FormField
                    title="Email"
                    value={form.email}
                    placeholder="Enter your email"
                    handleChangeText={(e) => {setForm({...form, email: e})}}
                    otherStyles={''}
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
                    handlePress={handleSubmit}
                    containerStyles={{marginTop: 20}}
                    isLoading={isSubmitting}
                />

                <CustomButton
                    title='Sign In with Google'
                    handlePress={loginWithGoogle}
                    containerStyles={{marginTop: 20}}
                    isLoading={isSubmitting}
                />

                <View>
                    <Text style={{ marginTop: 20, fontSize: 20}}>
                        Don't have an account? <Link href="/sign-up">Sign Up</Link>
                    </Text>
                </View>
           </View>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height - 100,
    },
    textcol: {
        color: '#000000',
        fontSize: 30,
    }

})