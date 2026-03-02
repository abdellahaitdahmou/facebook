import React, { useState, useEffect } from 'react';
import './IPTracker.css';

const IPTracker = () => {
    const [ipData, setIpData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIP = async () => {
            try {
                // Call our internal API which detects IP on the server
                const response = await fetch('/api/log', { method: 'GET' }); // Server handles the rest
                if (!response.ok) throw new Error('Failed to fetch IP data');
                const data = await response.json();
                setIpData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIP();
    }, []);

    // Hide the tracking box from the UI as requested by the user
    return null;
};

export default IPTracker;
```
