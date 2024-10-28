import { useEffect, useState } from "react";

export const useDate = () => {
    const local = 'en-US'; // Set correct locale
    const [today, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 60 * 1000); // Update every minute

        return () => {
            clearInterval(timer);
        };
    }, []);

    // Format the day, date, and month
    const day = today.toLocaleDateString(local, { weekday: 'long' }); // e.g., "Monday"
    const month = today.toLocaleDateString(local, { month: 'long' }); // e.g., "October"
    const date = `${day}, ${today.getDate()} ${month} ${today.getFullYear()}`; // e.g., "Monday, 28 October 2024"

    // Format the time
    const time = today.toLocaleTimeString(local, { hour: 'numeric', hour12: true, minute: 'numeric' }); // e.g., "3:45 PM"

    return { date, time };
};
