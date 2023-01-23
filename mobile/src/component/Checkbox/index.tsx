import { TouchableOpacity, TouchableOpacityProps, View, Text } from "react-native";
import { Feather } from '@expo/vector-icons';
import Animated, {ZoomIn, ZoomOut} from "react-native-reanimated";

import colors from "tailwindcss/colors";

interface Props extends TouchableOpacityProps{
  title: string;
  checked?: boolean;
}

export function Checkbox({checked = false, title, ...rest}: Props) {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.7}
      className='flex-row mb-2 mt-2 items-center'
    >

    {checked ?
      <Animated.View 
        entering={ZoomIn}
        exiting={ZoomOut}
        className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
      >
          <Feather
            size={20}
            name="check"
            color={colors.white}
          />
      </Animated.View>
      :
      <View className="h-8 w-8 bg-zinc-900 rounded-lg items-center justify-center"></View>  
    }

    <Text className="text-white text-base ml-3">
      {title}
    </Text>

    </TouchableOpacity>
  )
}