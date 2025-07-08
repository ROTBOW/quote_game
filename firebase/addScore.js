import firebase_app from "./config";
import { getFirestore, doc, addDoc, Timestamp } from "firebase/firestore";

const db = getFirestore(firebase_app);

const addScore = async (score, start, end) => {
    let res = null;
    let err = null;

    // Setting time spent
    score['start'] = Timestamp.fromDate(start);
    score['end'] = Timestamp.fromDate(end);
    

    try {
        res = await addDoc(doc(db, 'scoreboard', id),
            score,
            {merge: true})
    } catch (e) {
        err = e;
    };

    return {res, err};
}

export default addScore;