import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Colors} from "@/constants/Colors";
import { Constants } from '@/constants/Constants';

/*
Note:
The Expo Go <MaterialIcons/> built-in component uses icons found at:
https://icons.expo.fyi/Index (FILTER ON "MaterialIcons")

Reference: https://docs.expo.dev/guides/icons/
*/

type Props = {
  name: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  label?: string;
};

export default function MaterialButtonIcon({ name, label, onPress }: Props) {
  if (label) {
    return (
      <Pressable style={styles.container} onPress={onPress}>
        <Pressable style={styles.buttonContainer}>
          <MaterialIcons name={name} size={24} color={Colors.default.color}/>
        </Pressable>
        <Text style={styles.iconButtonLabel}>{label}</Text>
      </Pressable>
    );
  } else {
    return (
      <Pressable style={styles.buttonContainer} onPress={onPress}>
        <MaterialIcons name={name} size={24} color={Colors.default.color}/>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Constants.generic.padding
  },
  buttonContainer: {
    width: 35,
    height: 35,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: Colors.default.color,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
},
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    color: Colors.default.color,
    marginTop: 12,
  },
});
