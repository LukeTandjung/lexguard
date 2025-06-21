export interface Alert {
    id: string;
    time: string;
    email: string;
    name: string;
    violation: string;
    state: string;
    flagged_messages: string[];
}

export interface AlertList {
    alerts: Alert[];
}