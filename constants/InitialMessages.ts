import MessageObject from "@/app/objects/MessageObject";
import MessageType from "@/app/objects/MessageType";
import uuid from 'react-native-uuid';

function buildMessages() {
    const rawMessages = [
        {
            "key": uuid.v1().toString(),
            "who": "Andy Ryan",
            "messageText": "This is a test message from Andy",
            "messageType": "Text"
        },
        {
            "key": uuid.v1().toString(),
            "who": "Moderator",
            "messageText": "The course curriculum we will be following will progress as described below:",
            "messageType": "Text"
        },
        {
            "key": uuid.v1().toString(),
            "who": "Moderator",
            "messageText": "Introduction to React Native and Expo Go",
            "messageType": "Text"
        },
        {
            "key": uuid.v1().toString(),
            "who": "Moderator",
            "messageText": "Plan and setup the basic layout of the application.  Style to your own tastes.",
            "messageType": "Text"
        },
        {
            "key": uuid.v1().toString(),
            "who": "Moderator",
            "messageText": "Introduction to components.  Plan the components that will be present in the initial layout.",
            "messageType": "Text"
        },
        {
            "key": uuid.v1().toString(),
            "who": "Moderator",
            "messageText": "Create each component planned.  Integrate them into our layout.  Style to your own tastes.",
            "messageType": "Text"
        },
        {
            "key": uuid.v1().toString(),
            "who": "Moderator",
            "messageText": "Introduction to JSON. Remove hard-coded text in messages and substitute with data from a JSON object",
            "messageType": "Text"
        },
        {
            "key": uuid.v1().toString(),
            "who": "Moderator",
            "messageText": "Setup routes where there is a \"real-time chat\" route for the existing work and a new \"profile\" route",
            "messageType": "Text"
        },
        {
            "key": uuid.v1().toString(),
            "who": "Moderator",
            "messageText": "Plan and setup the basic layout of the profile route.  This should provide the ability for someone to enter their user name and provide a picture",
            "messageType": "Text"
        },
        {
            "key": uuid.v1().toString(),
            "who": "Moderator",
            "messageText": "Update the messages so that you have a message that has your user name as the \"who\" value.  Display above each message who the message is from.",
            "messageType": "Text"
        },
        {
            "key": uuid.v1().toString(),
            "who": "Moderator",
            "messageText": "Update the \"real-time chat\" route so that message that are from your own user name are shown differently that other messages in the chat",
            "messageType": "Text"
        },
        {
            "key": uuid.v1().toString(),
            "who": "Moderator",
            "messageText": "Welcome to the session on building a real-time chat application using Expo Go with React Native!",
            "messageType": "Text"
        }
    ];

    return rawMessages.map((message) => {
        return new MessageObject(message.key, message.who, message.messageText, MessageType.Text);
    })
}

export default buildMessages();
