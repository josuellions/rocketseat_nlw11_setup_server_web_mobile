import { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert} from "react-native";
import { Feather } from '@expo/vector-icons';

import { BackButton } from "../../component/BackButton";
import { Checkbox } from "../../component/Checkbox";
import colors from "tailwindcss/colors";
import { api } from "../../lib/axios";

export function HabitNew() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const availableWeekDays = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado']

  function handleToggleWeekDay(weekDayIndex: number) {
    if(weekDays.includes(weekDayIndex)){
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
    }else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

 async function handleCreateNewHabit() {
  try {
    if(!title.trim() || weekDays.length === 0){
      return Alert.alert('Novo hábito', 'Informe um nome, e selecione a recorrência para novo hábito.')
    }

    await api.post('/habits', {title, weekDays})

    setTitle('');
    setWeekDays([]);

    Alert.alert('Novo hábito', 'Hábito criado com sucesso.')

  } catch (error) {
    Alert.alert('Error', 'Falha ao criar novo hábito!')
    console.log(error)
  }
 }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton/>

        <Text className="mt-6 text-white font-semibold text-3xl">
          Criar hábito
        </Text>
       
        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          value={title}
          onChangeText={text => setTitle(text)}
          placeholder="Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 border-green-600"
        />
        <Text className="mt-6 mb-3 text-white font-semibold text-base">
          Qual seu recorrêmcia?
        </Text>
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox 
            key={weekDay} 
            title={weekDay}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          />
          ))
        }

        <TouchableOpacity 
          onPress={() => handleCreateNewHabit()}
          activeOpacity={0.7}
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
        >
          <Feather
            size={20}
            name="check"
            color={colors.white}
          />
          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}