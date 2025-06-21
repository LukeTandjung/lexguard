import { Timestamp } from "firebase/firestore";

export interface Alert {
    id?: string;
    time: Timestamp;
    sender: string;
    receiver: string;
    name: string;
    violation: string;
    status: string;
    title: string;
    content: string[];
}

export interface AlertList {
    alerts: Alert[];
}