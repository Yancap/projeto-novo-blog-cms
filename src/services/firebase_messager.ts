import axios from "axios";

interface buildChatParams {
    adminMail: string;
    authorMail: string;
}
interface MessagesRequest {
    name: string;
    email: string;
    createdAt: number;
    message: string;
    date: string;
}
export function buildChat({adminMail, authorMail}: buildChatParams){
    return `${adminMail.replace(/@.*/, "@")}-${authorMail.replace(/@.*/, "@")}`
}

export function addDateInMessagesArray(data: MessagesRequest[]){
    const messagesWithDate = data.map( item => (
        {...item, date: new Date(item.createdAt)}
    ))
    return messagesWithDate
}

export const firebase_api = axios.create({
    baseURL: "api/firebase"
})