// frontend/js/common_api.js
// Unified API helper for kids-learning frontend
// Usage:
//   <script src="js/common_api.js"></script>
//   KidsAPI.fetchJson("data/sentences.json")
//   KidsAPI.chatTeacher(prompt)

(function (global) {
    "use strict";

    // --- Base paths ---------------------------------------------------------
    // Relative base for API endpoints (behind FastAPI)
    const API_BASE = "/api";

    // Relative base for static files (JSON, audio, etc.)
    // Since HTML files are served from /static/, using relative paths is enough,
    // e.g. "data/sentences.json" -> /static/data/sentences.json
    const STATIC_BASE = "";

    // Optional app key (for protected APIs). You can set it in HTML:
    // <script>window.KIDS_APP_KEY = "xxxx";</script>
    const APP_KEY = global.KIDS_APP_KEY || null;

    // --- Low-level helpers --------------------------------------------------

    /**
     * Internal: build full API URL from a relative path.
     * Example: buildApiUrl("chat_teacher") -> "/api/chat_teacher"
     */
    function buildApiUrl(path) {
        if (!path.startsWith("/")) {
            path = "/" + path;
        }
        return API_BASE + path;
    }

    /**
     * Internal: build static URL (for JSON or audio, relative to current HTML).
     * Example: buildStaticUrl("data/sentences.json") -> "data/sentences.json"
     */
    function buildStaticUrl(path) {
        if (!path) return "";
        if (path.startsWith("http://") || path.startsWith("https://")) {
            return path;
        }
        if (STATIC_BASE && !STATIC_BASE.endsWith("/")) {
            return STATIC_BASE + "/" + path;
        }
        return STATIC_BASE + path;
    }

    /**
     * Internal: generic API POST helper (JSON in / JSON out).
     */
    async function apiPost(path, payload) {
        const url = buildApiUrl(path);
        const headers = {
            "Content-Type": "application/json",
        };
        if (APP_KEY) {
            headers["X-App-Key"] = APP_KEY;
        }

        const resp = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload || {}),
        });

        if (!resp.ok) {
            const text = await resp.text().catch(() => "");
            throw new Error(`API POST ${url} failed: ${resp.status} ${text}`);
        }

        // Try JSON, fallback to text
        const ct = resp.headers.get("content-type") || "";
        if (ct.includes("application/json")) {
            return await resp.json();
        }
        return await resp.text();
    }

    /**
     * Internal: generic API GET helper for JSON.
     */
    async function apiGet(path) {
        const url = buildApiUrl(path);
        const headers = {};
        if (APP_KEY) {
            headers["X-App-Key"] = APP_KEY;
        }

        const resp = await fetch(url, { method: "GET", headers: headers });

        if (!resp.ok) {
            const text = await resp.text().catch(() => "");
            throw new Error(`API GET ${url} failed: ${resp.status} ${text}`);
        }

        const ct = resp.headers.get("content-type") || "";
        if (ct.includes("application/json")) {
            return await resp.json();
        }
        return await resp.text();
    }

    // --- Public helpers -----------------------------------------------------

    /**
     * Fetch a static JSON file under frontend (e.g. data/sentences.json).
     *
     * Example:
     *   const sentences = await KidsAPI.fetchJson("data/sentences.json");
     */
    async function fetchJson(relativePath) {
        const url = buildStaticUrl(relativePath);

        const resp = await fetch(url, { cache: "no-store" });
        if (!resp.ok) {
            const text = await resp.text().catch(() => "");
            throw new Error(`fetchJson ${url} failed: ${resp.status} ${text}`);
        }
        return await resp.json();
    }

    /**
     * Call main teacher endpoint (/api/chat_teacher).
     *
     * Example:
     *   const reply = await KidsAPI.chatTeacher(promptText);
     */
    async function chatTeacher(userInput, history) {
        const payload = {
            user_input: userInput || "",
            history: history || null,
        };
        const data = await apiPost("/chat_teacher", payload);
        // Compatible with different response shapes
        return (data.reply || data.answer || data.text || data.message || "").trim();
    }

    /**
     * Generic ask endpoint (/api/ask) if you need it elsewhere.
     */
    async function ask(message, history) {
        const payload = {
            message: message || "",
            history: history || null,
        };
        const data = await apiPost("/ask", payload);
        return (data.answer || data.reply || "").trim();
    }

    /**
     * Basic TTS (/api/tts): returns { audio_url, duration }.
     */
    async function tts(text) {
        const payload = { text: text || "" };
        return await apiPost("/tts", payload);
    }

    /**
     * TTS with timestamps (/api/tts_sync): returns
     * { audio_url, duration, timestamps: [{word, start_ms, end_ms}, ...] }.
     */
    async function ttsSync(text) {
        const payload = { text: text || "" };
        return await apiPost("/tts_sync", payload);
    }

    /**
     * Public health check helper (/api/health).
     */
    async function health() {
        return await apiGet("/health");
    }

    // --- Export to global ---------------------------------------------------

    global.KidsAPI = {
        // base builders (if you ever need them)
        buildApiUrl,
        buildStaticUrl,

        // generic
        fetchJson,
        apiPost,
        apiGet,

        // AI helpers
        chatTeacher,
        ask,
        tts,
        ttsSync,
        health,
    };
})(window);
