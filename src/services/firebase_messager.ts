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

interface NewData {
    date: string;
    messages: MessagesRequest[]
}

export function paginationMessagesInDatas(data: MessagesRequest[]){
    const date = new Date()
    date.setDate(date.getDate() + 0)
    const newData: NewData[] = [{
        date: "Hoje",
        messages: []
    }]

    let aux = 2

    for(let i = 0; i < data.length; i++) {
        
        let currentMonth = date.getMonth()
        let currentYear = date.getFullYear()
        let currentDay = date.getDate()
        const messageDate = new Date(data[i].date)
        let messageMonth = messageDate.getMonth()
        let messageYear = messageDate.getFullYear()
        let messageDay = messageDate.getDate()
        
        
        if(currentMonth === messageMonth && currentYear === messageYear && currentDay === messageDay){
            newData[0].date = "Hoje"
            newData[0].messages.push(data[i])
        } else if(currentMonth === messageMonth && currentYear === messageYear && currentDay - messageDay === 1){
            
            if(!newData[1]){
                newData.push({ date: "Ontem", messages: [] })
            }
            newData[1].messages.push(data[i])
            
            
        } else if(currentYear === messageYear ){

            const index = i - 1 < 0 ? 0 : i - 1
            const lastMessageDate = new Date(data[index].date)
            if(lastMessageDate.getDate() !== messageDate.getDate() || lastMessageDate.getMonth() !== messageDate.getMonth()){
                aux++
            }
            if(!newData[aux]){
                newData.push({ date: messageDate.toLocaleString([], {  month: 'long', day: 'numeric' }), messages: [] })
            }
            newData[aux].messages.push(data[i])
        }
    }

    
    return newData.reverse()
}

export const firebase_api = axios.create({
    baseURL: "api/firebase"
})