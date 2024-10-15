import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../context/app-provider";

export default function Layout(){

    const { isLogged } = useGlobalContext()!;

    if(isLogged) return <Redirect href='/home' />
    
    return (
        
        <>
        <Stack>
            <Stack.Screen
                name="sign-in"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="sign-up"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="welcome"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="verify"
                options={{
                    headerShown: false
                }}
            />
             
        </Stack>
        <StatusBar backgroundColor="#161622" style="light" />
        </>
    )
}