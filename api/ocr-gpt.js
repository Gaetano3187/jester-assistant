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

  // Here would normally call OpenAI API
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ ok: true }));
}
