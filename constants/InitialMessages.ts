import MessageObject from "@/app/objects/MessageObject";

function buildMessages() {
    const rawMessages = [
        {
            "key": crypto.randomUUID(),
            "who": "Moderator",
            "messageText": "Welcome to the session on building a real-time chat application using Expo Go with React Native!"
        },
        {
            "key": crypto.randomUUID(),
            "who": "Andy",
            "messageText": "This is a test message from myself"
        },
        {
            "key": crypto.randomUUID(),
            "who": "Moderator",
            "messageText": "The course curriculum we will be following will progress as described below:"
        },
        {
            "key": crypto.randomUUID(),
            "who": "Moderator",
            "messageText": "Introduction to React Native and Expo Go"
        },
        {
            "key": crypto.randomUUID(),
            "who": "Moderator",
            "messageText": "Plan and setup the basic layout of the application.  Style to your own tastes."
        },
        {
            "key": crypto.randomUUID(),
            "who": "Moderator",
            "messageText": "Introduction to components.  Plan the components that will be present in the initial layout."
        },
        {
            "key": crypto.randomUUID(),
            "who": "Moderator",
            "messageText": "Create each component planned.  Integrate them into our layout.  Style to your own tastes."
        },
        {
            "key": crypto.randomUUID(),
            "who": "Moderator",
            "messageText": "Introduction to JSON. Remove hard-coded text in messages and substitute with data from a JSON object"
        },
        {
            "key": crypto.randomUUID(),
            "who": "Moderator",
            "messageText": "Setup routes where there is a \"real-time chat\" route for the existing work and a new \"profile\" route"
        },
        {
            "key": crypto.randomUUID(),
            "who": "Moderator",
            "messageText": "Plan and setup the basic layout of the profile route.  This should provide the ability for someone to enter their user name and provide a picture"
        },
        {
            "key": crypto.randomUUID(),
            "who": "Moderator",
            "messageText": "Update the messages so that you have a message that has your user name as the \"who\" value.  Display above each message who the message is from."
        },
        {
            "key": crypto.randomUUID(),
            "who": "Moderator",
            "messageText": "Update the \"real-time chat\" route so that message that are from your own user name are shown differently that other messages in the chat"
        }
    ];

    return rawMessages.map((message) => {
        return new MessageObject(message.key, message.who, message.messageText);
    })
}

export const InitialMessages = buildMessages();
