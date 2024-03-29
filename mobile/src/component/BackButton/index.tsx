import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from 'tailwindcss/colors';

export function BackButton(){
  const { goBack } = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
      <Feather
        size={32}
        name="arrow-left"
        color={colors.zinc[400]}

      />
    </TouchableOpacity>
  )
}