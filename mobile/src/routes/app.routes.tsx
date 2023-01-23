import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/Home';
import { Habit } from '../screens/Habit';
import { HabitNew } from '../screens/HabitNew';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return(
    <Navigator screenOptions={{headerShown: false}}>
      <Screen
        name="home"
        component={Home}
      />
      <Screen
        name="new"
        component={HabitNew}
      />
      <Screen
        name="habit"
        component={Habit}
      />
    </Navigator>
  )
}