export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.statusCode = 500;
    res.end('Missing OPENAI_API_KEY');
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end('Method Not Allowed');
    return;
  }

  let body = req.body;
  if (!body) {
    let data = '';
    for await (const chunk of req) data += chunk;
    body = JSON.parse(data || '{}');
  }

  if (!body.base64Image) {
    res.statusCode = 400;
    res.end('base64Image required');
    return;
  }

  // Per ora restituiamo un JSON di esempio
  const sample = {
    store: 'Supermercato Demo',
    date: new Date().toISOString().slice(0, 10),
    items: [
      { name: 'latte', qty: 2, price: 3.20 },
      { name: 'uova',  qty: 1, price: 2.50 }
    ],
    total: 5.70
  };

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(sample));res.end(JSON.stringify({ ok: true }));
}
