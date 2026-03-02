export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { ip, city, region, country_name } = req.body;
    const webhookUrl = 'https://discord.com/api/webhooks/1477832242129666110/8QnLpB39E68xVJCXeU_Dfi9cM8SpNY76L8wLkCq0BPJlnlvUYSpEq5ymKkEJq4R7st38';

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: `📍 **New visitor tracked!**\n**IP**: ${ip || 'Unknown'}\n**Location**: ${city || 'Unknown'}, ${region || 'Unknown'}, ${country_name || 'Unknown'}\n**Time**: ${new Date().toLocaleString()}`
            })
        });

        if (!response.ok) {
            throw new Error(`Discord API responded with ${response.status}`);
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Logging error:', error);
        return res.status(500).json({ error: 'Failed to log data' });
    }
}
