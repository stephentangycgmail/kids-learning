(function (global) {
    "use strict";

    const STATIC_BASE = "";

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

    async function fetchJson(relativePath) {
        const url = buildStaticUrl(relativePath);

        const resp = await fetch(url, { cache: "no-store" });
        if (!resp.ok) {
            const text = await resp.text().catch(() => "");
            throw new Error(`fetchJson ${url} failed: ${resp.status} ${text}`);
        }
        return await resp.json();
    }

    function disabledFeature() {
        throw new Error("This feature is disabled on the static GitHub Pages site.");
    }

    global.KidsAPI = {
        buildStaticUrl,
        fetchJson,
        chatTeacher: disabledFeature,
        ask: disabledFeature,
        tts: disabledFeature,
        ttsSync: disabledFeature,
        health: disabledFeature,
    };
})(window);
