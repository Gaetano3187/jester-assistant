# Jester Assistant

Assistente vocale con OCR e GPT che consente di trasformare immagini di scontrini o liste della spesa in testo, gestire una lista e interagire tramite voce.

## Requisiti

- **Node.js 18+** (o versione LTS più recente)
- **npm** o **pnpm**
- Account **OpenAI** con chiave API
- Account **Vercel** (per il deploy)

## Installazione locale

```bash
# clona il progetto
git clone https://github.com/Gaetano3187/jester-assistant.git
cd jester-assistant

# installa le dipendenze
npm install

# avvia in modalità sviluppo
npx vercel dev
```

Apri <http://localhost:3000> per vedere l'app.

## Variabili d'ambiente

| Nome | Descrizione |
|------|-------------|
| `OPENAI_API_KEY` | Chiave API di OpenAI |

In locale puoi creare un file `.env` (che resta ignorato dal repo) con:

```env
OPENAI_API_KEY=la_tua_chiave
```

## Struttura del progetto

```
├─ api/                # Funzioni serverless (Vercel)
│  └─ ocr-gpt.js       # OCR + GPT
├─ index.html          # Front‑end statico
├─ serviceWorker.js    # PWA / offline
├─ package.json        # Dipendenze e script
├─ vercel.json         # Configurazione Vercel
└─ README.md           # Questo file
```

## Deploy su Vercel

1. Collega il repository al tuo account Vercel.
2. Imposta la variabile **OPENAI_API_KEY** in *Project → Settings → Environment Variables*.
3. Clicca **Deploy**. Vercel installerà le dipendenze e pubblicherà l'app.

## Script npm

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia `vercel dev` in locale |
| `npm run build` | (Nessuna build necessaria per ora) |

## Licenza

MIT
