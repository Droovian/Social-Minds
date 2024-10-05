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
    <View>
      <Text>FormField</Text>

      <View style={styles.container}>

        <TextInput
            value={value}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
            {...props}
        />

        {title === 'Password' && (
            
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} >
                <Image
                    source={!showPassword ? icons.eye : icons.eyeSlash}
                    resizeMode='contain'
                    style={styles.image}
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
        color: '#fff',
        fontSize: 16,
        padding: 10,
    },
    container:{
        width: 200,
        height: 50,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,

    },
    image:{
        height: 30,
        width: 30,
    }
})