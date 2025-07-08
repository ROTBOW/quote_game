import firebase_app from "./config";
import { getFirestore, addDoc, Timestamp, collection } from "firebase/firestore";

const db = getFirestore(firebase_app);

const addScore = async (score, start, end) => {
    
    let res = null;
    let err = null;
    
    // Setting time spent
    score['start'] = Timestamp.fromDate(start);
    score['end'] = Timestamp.fromDate(end);
    console.log(score);
    

    try {
        res = await addDoc(collection(db, 'scoreboard'), score)
    } catch (e) {
        err = e;
    };

    return {res, err};
}

export default addScore;