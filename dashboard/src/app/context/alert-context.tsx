import { createContext, useEffect, useState } from "react";
import { AlertList, Alert } from "../types/types";
import { FIREBASE_DB } from "../../../firebase.config";
import { collection, onSnapshot, query } from "firebase/firestore";

export const AlertContext = createContext<AlertList>({
    alerts: [],
});

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [alerts, setAlerts] = useState<AlertList>({ alerts: [] });

    useEffect(() => {
        const alertsQuery = query(collection(FIREBASE_DB, "alerts"));
        const unsubscribe = onSnapshot(alertsQuery, (snapshot) => {
            const alertsData: Alert[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Alert));
            setAlerts({ alerts: alertsData });
        });

        return () => unsubscribe();
    }, []);

    return (
        <AlertContext.Provider value={alerts}>
            {children}
        </AlertContext.Provider>
    );
}; 