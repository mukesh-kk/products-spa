import { useState, useEffect } from 'react';

const useSessionStorage = (key, initialValue) => {
    // Retrieve the initial value from session storage or use the provided initial value
    const [value, setValue] = useState(() => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    // Update session storage whenever the value changes
    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

export default useSessionStorage;