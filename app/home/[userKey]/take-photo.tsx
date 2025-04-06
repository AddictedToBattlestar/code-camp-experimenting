import {CameraType, CameraView, useCameraPermissions} from 'expo-camera';
import {useRef, useState} from "react";
import {Button, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useLocalSearchParams } from 'expo-router';
import useFirebaseMessages from '@/app/hooks/useFirebaseMessages';
import useFirebaseUserData from '@/app/hooks/useFirebaseUserData';
import MessageType from '@/app/objects/MessageType';
import * as FileSystem from 'expo-file-system';

// https://docs.expo.dev/versions/latest/sdk/camera/
// npx expo install expo-camera

export default function Photo() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef<CameraView>(null);

    const { userKey } = useLocalSearchParams();
    const {userDataForSelf} = useFirebaseUserData(userKey);
    const {storeMessage} = useFirebaseMessages();

    if (!permission) {
        // Camera permissions are still loading.
        return <View/>;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission"/>
            </View>
        );
    }

    const takePicture = async () => {
        const photo = await ref.current?.takePictureAsync();
        if (photo?.uri && userDataForSelf) {
            if (Platform.OS === 'web') {
                storeMessage(userDataForSelf.key, photo.uri, MessageType.Image);
            } else {
                const base64Img = await FileSystem.readAsStringAsync(photo.uri, { encoding: FileSystem.EncodingType?.Base64 });
                storeMessage(userDataForSelf.key, "data:image/png;base64,"+base64Img, MessageType.Image);
            }
        }
        console.debug(photo);
    };

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} ref={ref} facing={facing}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <FontAwesome6 name="camera" size={32} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <FontAwesome6 name="camera-rotate" size={32} color="white"/>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});