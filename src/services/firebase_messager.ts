import axios from "axios";

interface buildChatParams {
    adminMail: string;
    authorMail: string;
}
interface MessagesRequest {
    name: string;
    email: string;
    createdAt: number  | string;
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
    //date.setDate(date.getDate() + 0)
    let currentMonth = date.getMonth()
    let currentYear = date.getFullYear()
    let currentDay = date.getDate()

    const newData: NewData[] = []

    let aux = 0

    for(let i = 0; i < data.length; i++) {

        
        const messageDate = new Date(data[i].date)
        let messageMonth = messageDate.getMonth()
        let messageYear = messageDate.getFullYear()
        let messageDay = messageDate.getDate()

        const lastIndex = i - 1 < 0 ? 0 : i - 1
        const lastMessageDate = new Date(data[lastIndex].date)
        
        if(lastMessageDate.getDate() !== messageDate.getDate() || lastMessageDate.getMonth() !== messageDate.getMonth()){
            aux++
        }

        if(currentMonth === messageMonth && currentYear === messageYear && currentDay === messageDay){
            if(!newData[aux]){
                newData[aux] = { date:"Hoje", messages: [] }
            }
            newData[aux].messages.push(data[i])
        } else if(currentMonth === messageMonth && currentYear === messageYear && currentDay - messageDay === 1){

            

            if(!newData[aux]){
                newData[aux] = { date:"Ontem", messages: [] }
            }
            newData[aux].messages.push(data[i])
            
            
        } else if(currentYear === messageYear ){

            if(!newData[aux] || newData.length === 0){
                newData.push({ date: messageDate.toLocaleString([], {  month: 'long', day: 'numeric' }), messages: [] })
            }

            newData[aux].messages.push(data[i])
        }

    }


    return newData
}

export const firebase_api = axios.create({
    baseURL: "api/firebase"
})