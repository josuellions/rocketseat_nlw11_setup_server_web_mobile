import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function HabitEmpty() {
  const { navigate } = useNavigation();
  return (
    <Text className="text-zinc-400 text-base text-center">
      Nenhum hábito foi adicionado para essa data. {' '}
      <Text 
        onPress={() => navigate('new')}
        className="text-violet-400 text-base underline active:text-violet-200"
      >
        Cadastre novo hábito
      </Text>
    </Text>
  )
}