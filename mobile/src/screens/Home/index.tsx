import { useCallback, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Header } from "../../component/Header";
import { Loading } from "../../component/Loading";
import { HabitDay, DAY_SIZE } from "../../component/HabitDay";

import { api } from '../../lib/axios';

import { generateRangeDatesFromYearStart } from '../../utils/generate-range-between-dates';
import dayjs from "dayjs";

type SummaryProps = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number
}>


const minimunSummaryDatesSize = 18 * 5;
const weekDays = ['D','S','T','Q','Q','S','S'];
const datesFromYearStart = generateRangeDatesFromYearStart();
const amountOfDaysToFill = minimunSummaryDatesSize - datesFromYearStart.length;

export function Home() {
  const { navigate } = useNavigation();
  const [loading, setLoadin] = useState(true);
  const [summary, setSummary] = useState<SummaryProps | null>(null)

   async function fetchData() {

    try {
      setLoadin(true);
      const res = await api.get('summary');

      setSummary(res.data)
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar o sumário de hábitos.')
      console.log(error)
    }finally{
      setLoadin(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchData()
  },[]))

  if(loading) {
    return ( <Loading/> )
  }

  return(
    <View className="flex-1  bg-background px-8 pt-16">
      <Header />
      
        <View className="flex-row mt-6 mb-2">
        { weekDays.map((weekDay, index) => (
          <Text 
            key={`${weekDay}-${index}`} 
            style={{width: DAY_SIZE}}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
          >
            {weekDay}
          </Text>
        ))

        }
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >
        { summary &&
          <View
            className="flex-row flex-wrap"
          >
            {
              datesFromYearStart.map((date) => {
                const dayWithHabits = summary.find(day => {
                  
                  return dayjs(date).isSame(day.date, 'date');
                })
                return ( 
                  <HabitDay 
                    key={date.toISOString()}
                    date={date}
                    amountOfHabits={dayWithHabits?.amount}
                    amountCompleted={dayWithHabits?.completed}
                    onPress={() => navigate('habit', {date: date.toISOString()})}
                  />
                )
              })
            }

            {
              amountOfDaysToFill > 0 && Array
                .from({length: amountOfDaysToFill})
                .map((_, index) => (
                  <View 
                    key={index}
                    className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                    style={{width: DAY_SIZE, height: DAY_SIZE}}
                  />
                ))
            }
          </View>
        }
      </ScrollView>
    </View>
  )
}