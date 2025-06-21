import { Timestamp } from "firebase/firestore";

export interface Alert {
    id?: string;
    time: Timestamp;
    sender: string;
    receiver: string;
    violation: string;
    status: string;
    subject: string;
    message: string;
}

export interface AlertList {
    alerts: Alert[];
}