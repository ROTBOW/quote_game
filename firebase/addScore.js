import firebase_app from "./config";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const db = getFirestore(firebase_app);

const addScore = async (score) => {
    
    let res = null;
    let err = null;

    try {
        res = await addDoc(collection(db, 'scoreboard'), score)
    } catch (e) {
        err = e;
    };

    return {res, err};
}

export default addScore;