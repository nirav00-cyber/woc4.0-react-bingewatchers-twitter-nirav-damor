import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const app = initializeApp({

    
apiKey: "AIzaSyAAiKnXS2DQL230zXQ1eBESQuTku96C-qA",
authDomain: "bingewatcherstwitter-react.firebaseapp.com",
projectId: "bingewatcherstwitter-react",
storageBucket: "bingewatcherstwitter-react.appspot.com",
messagingSenderId: "587980750987",
appId: "1:587980750987:web:acee13d3015e91ae0ed48e"
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    
    // projectId: process.env.REACT_APP_FIREBASE_API_KEY_PROJECT_ID,
    
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    
    // messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    
    // appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const auth = getAuth(app);
export default app