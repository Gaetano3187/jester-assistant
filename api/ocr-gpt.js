export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  const { base64Image } = req.body || {};
  if (!base64Image) {
    res.status(400).send('Missing base64Image');
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
              { type: 'text', text: "Leggi lo scontrino nell'immagine e restituisci solo l'elenco dei prodotti." },
              { type: 'image_url', image_url: { url: base64Image } }
            ]
          }
        ],
        max_tokens: 300
      })
    });

    const data = await openaiRes.json();
    res.status(openaiRes.ok ? 200 : openaiRes.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
