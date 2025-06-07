#  JESTER – OCR GPT (Vercel Ready)

Questa applicazione permette di caricare uno scontrino e inviarlo a GPT-4 Vision per l'estrazione automatica dei prodotti.

## ✅ Funzionalità
- Caricamento immagini da fotocamera
- Invio a OpenAI GPT-4 Vision tramite endpoint /api/ocr-gpt
- Visualizzazione elenco prodotti riconosciuti
- Design responsive e mobile-first

## 🚀 Deploy su Vercel
1. Carica questo progetto su Vercel oppure usa `vercel deploy`.
2. In **Settings → Environment Variables** aggiungi:
   ```
   OPENAI_API_KEY = sk-xxxxx
   ```
3. Esegui il deploy e apri il dominio.

### Endpoint API
Una volta su Vercel l'endpoint `/api/ocr-gpt` sarà disponibile. Esegue una **POST** con
body JSON:

```json
{ "base64Image": "data:image/png;base64,...." }
```

Il serverless function invia l'immagine a GPT‑4 Vision tramite la tua chiave OpenAI e
restituisce la risposta JSON del modello.

Ricordati di impostare l'`OPENAI_API_KEY` anche per l'ambiente di sviluppo se usi
`vercel dev` in locale.

## 🧠 Modello
Usa `gpt-4-vision-preview` per il riconoscimento visivo.
