import { useState } from "react"

function App() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const [documents, setDocuments] = useState([])

  const API = import.meta.env.VITE_API_BASE_URL

  const uploadTranscript = async () => {
    if (!file) return alert("Choose a file")
    const formData = new FormData()
    formData.append("file", file)
    setLoading(true)
    const res = await fetch(`${API}/upload-transcript`, { method: "POST", body: formData })
    const data = await res.json()
    alert(data.message || data.error)
    setLoading(false)
  }

  const uploadYouTube = async () => {
    if (!url) return alert("Enter YouTube URL")
    setLoading(true)
    const res = await fetch(`${API}/upload-youtube`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
    const data = await res.json()
    alert(data.message || data.error)
    setLoading(false)
  }

  const transcribeYouTubeWhisper = async () => {
    if (!url) return alert("Enter YouTube URL")
    setLoading(true)
    const res = await fetch(`${API}/transcribe-youtube-whisper`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
    const data = await res.json()
    alert(data.message || data.error)
    setLoading(false)
  }

  const ask = async () => {
    if (!question) return alert("Enter question")
    setLoading(true)
    const res = await fetch(`${API}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    })
    const data = await res.json()
    setAnswer(data.answer || data.error)
    setLoading(false)
  }

  const fetchDocuments = async () => {
    const res = await fetch(`${API}/documents`)
    const data = await res.json()
    setDocuments(data.documents || [])
  }

  return (
    <div className="max-w-xl mx-auto p-6 font-sans space-y-6">
      <h2 className="text-2xl font-bold">🎙️ Podcast Summarization</h2>

      {/* Upload transcript */}
      <div className="space-y-2">
        <h4 className="font-medium">Upload Transcript</h4>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button onClick={uploadTranscript} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Upload
        </button>
      </div>

      {/* YouTube input */}
      <div className="space-y-2">
        <h4 className="font-medium">Or Paste YouTube URL</h4>
        <div className="text-sm text-gray-600 mb-2">
          <p>Choose how to process the YouTube video:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li className="text-green-600">
              <strong>With Subtitles:</strong> Uses existing subtitles (manual or auto-generated) from the video
            </li>
            <li className="text-blue-600">
              <strong>With Whisper:</strong> Downloads audio and transcribes it using OpenAI's Whisper model
            </li>
          </ul>
          <p className="mt-2 text-gray-500">
            Note: Whisper transcription may take longer but works even if the video has no subtitles
          </p>
        </div>
        <input className="w-full border rounded px-3 py-2" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." />
        <button onClick={uploadYouTube} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Submit YouTube (with subtitles)
        </button>
        <button onClick={transcribeYouTubeWhisper} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Transcribe with Whisper
        </button>
      </div>

      {/* Ask a question */}
      <div className="space-y-2">
        <h4 className="font-medium">Ask a Question</h4>
        <input className="w-full border rounded px-3 py-2" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="What is this about?" />
        <button onClick={ask} disabled={loading} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          Ask
        </button>
      </div>

      {/* Show answer */}
      {answer && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}

      {/* Trigger List Documents */}
      <div className="space-y-2">
        <h4 className="font-medium">🗂 Documents</h4>
        <button onClick={fetchDocuments} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          📄 List Documents from FAISS
        </button>
        {documents.length > 0 && (
          <div className="mt-4 bg-yellow-50 border border-yellow-300 rounded p-3">
            <strong>Total Documents: {documents.length}</strong>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-1">
              {documents.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
