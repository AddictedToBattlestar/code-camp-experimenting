import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Colors} from "@/constants/Colors";
import {Constants} from "@/constants/Constants";

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function ActionPicker({ isVisible, children, onClose }: Props) {
  return (
    <View>
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose an action</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color={Colors.default.color} size={22} />
          </Pressable>
        </View>
        <View style={styles.bodyContainer}>
            {children}
        </View>
      </View>
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: Colors.default.backgroundColor,
    borderTopRightRadius: Constants.generic.borderRadius,
    borderTopLeftRadius: Constants.generic.borderRadius,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '20%',
    backgroundColor: Colors.default.primaryColor,
    borderTopRightRadius: Constants.generic.borderRadius,
    borderTopLeftRadius: Constants.generic.borderRadius,
    paddingHorizontal: Constants.generic.padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.default.color,
    fontSize: 16,
  },
  bodyContainer: {
    padding: Constants.generic.padding,
    gap: Constants.generic.padding
  }
});
