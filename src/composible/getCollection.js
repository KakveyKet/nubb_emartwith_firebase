import { collection, onSnapshot, query, getDocs, where, orderBy, startAt, endAt } from "firebase/firestore";
import { projectFirestore } from "../config/config";

export const getCollectionQuery = async (
    collectionName,
    whereDoc = [],
    callback,
    useSnapshot = false,
    searchField = null,
    searchTerm = ""
) => {
    const collectionRef = collection(projectFirestore, collectionName);

    // Apply the where clauses dynamically if provided
    let queryRef = collectionRef;
    if (whereDoc && whereDoc.length > 0) {
        queryRef = query(collectionRef, ...whereDoc);
    }

    // Apply search if searchField and searchTerm are provided
    if (searchField && searchTerm) {
        queryRef = query(
            queryRef,
            orderBy(searchField),
            startAt(searchTerm),
            endAt(searchTerm + "\uf8ff")
        );
    }

    try {
        if (useSnapshot) {
            const unsubscribe = onSnapshot(queryRef, (snapshot) => {
                const data = [];
                snapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                if (callback) {
                    callback(data);
                }
            });

            return unsubscribe;
        } else {
            const snapshot = await getDocs(queryRef);
            const data = [];
            snapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            if (callback) {
                callback(data);
            }
        }
    } catch (error) {
        console.error("Error in getCollectionQuery:", error);
    }
};