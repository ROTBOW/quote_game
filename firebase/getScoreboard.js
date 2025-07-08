import firebase_app from "./config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

const getAllScores = async () => {
    try {
        const qSnap = await getDocs(collection(db, 'scoreboard'));

        let docs = {};
        qSnap.forEach((doc) => {
            docs[doc.id] = doc.data()
        });
    
        return docs;
    } catch (error) {
        log.error(error)
    }

};


export default getAllScores;