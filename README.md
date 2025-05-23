
# 🎙️ Podcast Summarization UI (RAG)

This is the **frontend** for the Podcast Summarization project using **LLM + RAG (Retrieval-Augmented Generation)**. It lets users:

- Upload a transcript (`.txt`)
- Or fetch subtitles from a YouTube video
- Ask questions about the content
- View responses powered by OpenAI & vector search (FAISS)

👉 **Live demo:**  
[https://albertshih.github.io/podcast-sum-ui](https://albertshih.github.io/podcast-sum-ui)

---

## 🚀 Tech Stack

- ⚛️ React + Vite
- 🎨 Tailwind CSS
- 🔗 Connects to a FastAPI backend (LLM + FAISS)
- 🌐 Deployed via GitHub Pages

---

## 🛠️ Local Development

```bash
git clone https://github.com/your-username/podcast-sum-ui.git
cd podcast-sum-ui
npm install
npm run dev
```

> Backend API should run locally on `http://localhost:8000`.

---

## 🔄 Deployment to GitHub Pages

```bash
npm run build
npm run deploy
```

> This pushes the `dist/` folder to the `gh-pages` branch.

Make sure your `vite.config.ts` has the correct `base`:

```ts
base: "/podcast-sum-ui/",
```

---

## ⚙️ Configuration

Update backend API endpoint in your env file:

```
VITE_API_BASE_URL=http://localhost:8000
```
