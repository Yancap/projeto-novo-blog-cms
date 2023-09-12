import { randomUUID } from "crypto";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    if(req.method === 'POST'){
        const firebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.FIREBASE_DATABASE_URL,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
            measurementId: process.env.FIREBASE_MEASUREMENT_ID
        };
        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);


        const getChatSchema = z.object({
            chat: z.string()
        })

        try {
            const {chat} = getChatSchema.parse(req.body)

            const starCountRef = ref(db, `/chat/${chat}`);
            let response: any[] = []
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                
                const dataArray = Object.keys(data).map(key => data[key]);
                
                response = dataArray
            });
            return res.status(200).send( response )
        } catch (error) {
            return res.status(400).send({ error })
        }
        
    }
    return res.status(401).send({ message: "Invalid HTTP request"})
    
}