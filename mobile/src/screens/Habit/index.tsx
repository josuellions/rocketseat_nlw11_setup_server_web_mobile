import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, ScrollView, Alert} from "react-native";

import dayjs from "dayjs";
import clsx from "clsx";

import { ProgressBar } from "../../component/ProgressBar";
import { BackButton } from "../../component/BackButton";
import { HabitEmpty } from "../../component/HabitEmpty";
import { Checkbox } from "../../component/Checkbox";
import { Loading } from "../../component/Loading";

import { genereteProgressPercentege } from "../../utils/generate-progress-percentage";
import { api } from "../../lib/axios";


interface Params {
  date: string
}

interface DayInfoProps {
  completedHabits: string[];
  possibleHabits: {
    id: string,
    title: string
  }[];
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as Params;
  const [ loading, setLoading ] = useState(true);
  const [ dayInfo, setDayInfo ] = useState<DayInfoProps | null>(null)
  const [ completedHabits, setCompletedHabits ] = useState<string[]>([])

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM')

  const isDateInPast = parsedDate.endOf('day').isBefore(new Date());
  const habitsProgress = dayInfo?.possibleHabits.length ? genereteProgressPercentege(dayInfo?.possibleHabits.length, completedHabits.length) : 0; 

  async function fetchHabits() {
    try {
      setLoading(true);
      const formatDate = dayjs(date).endOf('day');
      
      const res = await api.get('/day', { params: { date : formatDate }});

      setDayInfo(res.data);
      setCompletedHabits(res.data.completedHabits)
      
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Falha ao carregar as informação dos hábitos!')
    } finally{
      setLoading(false);
    }
  }

  async function handlerToggleHabit(habitId: string) {
    
    try {
      await api.patch(`/habits/${habitId}/toggle`);

      if(completedHabits.includes(habitId)){
        setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
      } else {
        setCompletedHabits(prevState => [...prevState, habitId])
      }
      
    } catch (error){
      Alert.alert('Error','Falha ao atulizar o hábito!')
      console.log
    }
  }

  useEffect(() => {
    fetchHabits();
  },[])

  if(loading) {
    return ( <Loading /> )
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >
        <BackButton />
       
        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">{dayOfWeek}</Text>
       
        <Text className="text-white font-extrabold text-3xl">{dayAndMonth}</Text>
      
        <ProgressBar progress={habitsProgress}/> 

        <View className={clsx("mt-6", {
          ["opacity-50"]: isDateInPast
        })}>
          {
            dayInfo?.possibleHabits ?
              dayInfo?.possibleHabits.map(habit => (
                <Checkbox
                  key={habit.id}
                  title={habit.title}
                  disabled={isDateInPast}
                  checked={completedHabits.includes(habit.id)}
                  onPress={() => handlerToggleHabit(habit.id)}
                />
              )) : (
                <HabitEmpty/>
              )
          }
        </View>
        {
          isDateInPast && (
            <Text className="text-white mt-10 text-center">
              Você não é possivel editar hábitos de uma data passada.
            </Text>
          )
        }
      </ScrollView>
    </View>
  )
}