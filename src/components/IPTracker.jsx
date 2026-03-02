import React, { useState, useEffect } from 'react';
import './IPTracker.css';

const IPTracker = () => {
    const [ipData, setIpData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIP = async () => {
            try {
                // Using ipapi.co for IP and location data
                const response = await fetch('https://ipapi.co/json/');
                if (!response.ok) throw new Error('Failed to fetch IP data');
                const data = await response.json();
                setIpData(data);

                // Log to a webhook (Example: Discord Webhook)
                // Set VITE_WEBHOOK_URL in your Vercel/Local environment
                const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
                if (webhookUrl) {
                    await fetch(webhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            content: `📍 **New visitor tracked!**\n**IP**: ${data.ip}\n**Location**: ${data.city}, ${data.region}, ${data.country_name}\n**Time**: ${new Date().toLocaleString()}`
                        })
                    });
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIP();
    }, []);

    if (loading) return <div className="ip-tracker loading">Detecting secure connection...</div>;
    if (error) return null; // Silently fail to not break UI

    return (
        <div className="ip-tracker">
            <div className="ip-badge">
                <span className="ip-label">Secure Access from:</span>
                <span className="ip-value">{ipData.ip}</span>
            </div>
            <div className="ip-location">
                {ipData.city}, {ipData.region}, {ipData.country_name}
            </div>
        </div>
    );
};

export default IPTracker;
