import React, { useState, useEffect } from 'react';

const IPTracker = () => {
    const [ipData, setIpData] = useState({ ip: '', city: '', region: '', country_name: '' });

    useEffect(() => {
        const fetchIP = async () => {
            try {
                // Call our internal API which detects IP on the server
                const response = await fetch('/api/log', { method: 'GET' }); // Server handles the rest
                if (!response.ok) throw new Error('Failed to fetch IP data');
                const data = await response.json();
                setIpData(data);
            } catch (err) {
                console.error('IP tracking error:', err.message);
            }
        };

        fetchIP();
    }, []);

    // Hide the tracking box from the UI as requested by the user
    return null;
};

export default IPTracker;
