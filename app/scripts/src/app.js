import socket from './ws-client';
import {ChatForm, ChatList, promptForUserName} from './dom';
import { UserStore } from './storage';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';


let userStore = new UserStore('x-chattrbox/u');
let userName = userStore.get();
if(!userName)
{
    userName = promptForUserName();
    userStore.set(userName);
}


class ChatApp {
    constructor() {
        console.log('Hello From Main App')

        this.chatForm = new ChatForm(FORM_SELECTOR,INPUT_SELECTOR);
        this.chatList = new ChatList(LIST_SELECTOR, userName);
        
        socket.init('ws://localhost:3001');
        socket.registerOpenHandler(() => {
            this.chatForm.init((data) => {
                let msg = new ChatMessage({message: data});
                socket.sendMessage(msg.serialize());

            })

            
        });
        socket.registerMessageHandler((data) =>{
            console.log(data);
            let message = new ChatMessage(data);
            this.chatList.drawMessage(message.serialize());
        });
    }
}


class ChatMessage {

    constructor({ message: m, user: u = userName, timeStamp: t = (new Date()).getTime() }) {
        this.message = m;
        this.user = u;
        this.timeStamp = t;
    }

    serialize() {
        return {
            user: this.user,
            message: this.message,
            timeStamp: this.timeStamp
        };
    }

}
export default ChatApp;