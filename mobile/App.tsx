import './src/lib/dayjs'
import { StatusBar } from 'react-native';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter'


import { Loading } from '../mobile/src/component/Loading';
import { Routes } from './src/routes';

export default function App() {
  const [ fontsLoaded  ] = useFonts ({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  if(!fontsLoaded) {
    return (
      <Loading/>
    )
  }

  return (
    // <View style={styles.container}>
    <>
      <Routes />
      <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
    </>
  );
}
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Inter_800ExtraBold'
  }
});*/
