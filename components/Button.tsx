import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
type CustomButtonProps = {
    title: string;
    handlePress: () => void;
    containerStyles?: any;
    textStyles?: any;
    isLoading?: boolean;
    className?: string;
};
const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps) => {

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className='bg-cyan-100 p-3 rounded-md'
    >
      <Text style={styles.buttonText}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;


const styles = StyleSheet.create({

    buttonText: {
        color: '#000000',
        fontSize: 16,
    },
    buttonContainer:{
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: 200,
        marginTop: 20,
    }

});