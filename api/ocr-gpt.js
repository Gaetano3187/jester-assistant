export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { base64Image } = req.body || {};
  if (!base64Image) {
    res.status(400).send('Missing image data');
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).send('Missing OPENAI_API_KEY');
    return;
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Elenca i prodotti presenti nello scontrino:' },
              { type: 'image_url', image_url: { url: base64Image } }
            ]
          }
        ],
        max_tokens: 200
      })
    });

    if (!openaiRes.ok) {
      const text = await openaiRes.text();
      res.status(500).send(text);
      return;
    }

    const data = await openaiRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
