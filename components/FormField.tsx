import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { useState } from 'react'
import React from 'react'
import { Image } from 'react-native'
import icons from '@/constants/icons'

type FormFieldProps = {
    title: string
    value: string
    placeholder: string
    handleChangeText: (text: string) => void
    otherStyles: any
}
const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}: FormFieldProps) => {

    const [showPassword, setShowPassword] = useState(false);
  return (
    <View className='flex flex-col space-y-2'>
        <Text className='text-gray-700 text-base font-medium'>{title}</Text>
      <View className='w-72 mb-7 h-16 px-4 bg-black-100 rounded-2xl border-2 border-gray-300 focus:border-secondary flex flex-row items-center'>

        <TextInput
            value={value}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#000000"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
            className={otherStyles}
            {...props}
        />

        {title === 'Password' && (
            
            <TouchableOpacity
            className='relative left-10'
            onPress={() => setShowPassword(!showPassword)} >
                <Image
                    source={!showPassword ? icons.eye : icons.eyeSlash}
                    resizeMode='contain'
                    className='w-6 h-6'
                />
            </TouchableOpacity>
        )}

      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({

    input: {
        color: '#000000',
        fontSize: 16,
        padding: 5,
    },
    container:{
        width: 200,
        height: 50,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,

    },
})