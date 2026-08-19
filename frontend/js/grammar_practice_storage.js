(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.GrammarPracticeStorage = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const DB_NAME = "kidsLearningGrammarPractice";
  const DB_VERSION = 1;
  const STORE_NAME = "sessions";
  const FALLBACK_KEY = "kidsLearning.grammarPractice.sessions.v1";
  const LOCKED = new Set(["submitted", "abandoned"]);

  function clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function validateSession(session) {
    if (!session || typeof session !== "object") throw new Error("Invalid practice record.");
    if (typeof session.sessionId !== "string" || !session.sessionId) throw new Error("Practice record has no ID.");
    if (session.schemaVersion !== 1) throw new Error("Unsupported practice record version.");
    if (!["in_progress", "submitted", "abandoned"].includes(session.status)) throw new Error("Invalid practice status.");
    if (!["short_long", "rearrangement", "mixed", "choice_practice", "choice_quiz"].includes(session.mode)) throw new Error("Invalid practice mode.");
    if (typeof session.topic !== "string" || !session.topic) throw new Error("Practice record has no topic.");
    if (!session.answers || typeof session.answers !== "object" || Array.isArray(session.answers)) {
      throw new Error("Practice record has invalid answers.");
    }
    if (!Array.isArray(session.questionIds) || !Array.isArray(session.questionSnapshots)) {
      throw new Error("Practice record has invalid question data.");
    }
    if (session.questionIds.length !== session.questionSnapshots.length) {
      throw new Error("Practice record question data is incomplete.");
    }
    if (!session.questionIds.every((id, index) => id === session.questionSnapshots[index].id)) {
      throw new Error("Practice record question IDs do not match its snapshots.");
    }
    if (!Number.isInteger(session.currentQuestionIndex)
        || session.currentQuestionIndex < 0
        || (session.questionSnapshots.length && session.currentQuestionIndex >= session.questionSnapshots.length)) {
      throw new Error("Practice record has an invalid current question.");
    }
    if (!session.startedAt || Number.isNaN(new Date(session.startedAt).getTime())) {
      throw new Error("Practice record has an invalid start time.");
    }
    if (!session.lastSavedAt || Number.isNaN(new Date(session.lastSavedAt).getTime())) {
      throw new Error("Practice record has an invalid save time.");
    }
    if (session.status === "submitted" && (!session.submittedAt || !session.scoreSummary || !Array.isArray(session.review))) {
      throw new Error("Submitted practice record is incomplete.");
    }
    if (session.status === "abandoned" && !session.abandonedAt) {
      throw new Error("Abandoned practice record has no abandon time.");
    }
    return session;
  }

  function safeRecord(record) {
    try {
      return clone(validateSession(record));
    } catch (error) {
      console.error("Ignoring an invalid Grammar Practice record.", error);
      return null;
    }
  }

  function assertMutable(existing, next) {
    if (!existing) return;
    if (LOCKED.has(existing.status)) {
      const unchanged = JSON.stringify(existing) === JSON.stringify(next);
      if (!unchanged) throw new Error("Submitted or abandoned practice records are read-only.");
    }
    if (existing.status === "in_progress" && next.status === "in_progress") return;
    if (existing.status === "in_progress" && LOCKED.has(next.status)) return;
    if (existing.status !== next.status) throw new Error("Invalid practice status change.");
  }

  function createMemoryStore(initialRecords) {
    const records = new Map((initialRecords || []).map((item) => [item.sessionId, clone(item)]));
    return {
      kind: "memory",
      async init() { return this; },
      async get(sessionId) { return safeRecord(records.get(sessionId)) || null; },
      async getAll() {
        return Array.from(records.values()).map(safeRecord).filter(Boolean).sort((a, b) =>
          new Date(b.startedAt) - new Date(a.startedAt)
        );
      },
      async getActive() {
        const all = await this.getAll();
        return all.find((item) => item.status === "in_progress") || null;
      },
      async save(session) {
        validateSession(session);
        const existing = records.get(session.sessionId);
        assertMutable(existing, session);
        records.set(session.sessionId, clone(session));
        return clone(session);
      },
    };
  }

  function localStorageDriver(storage) {
    function read() {
      try {
        const parsed = JSON.parse(storage.getItem(FALLBACK_KEY) || "[]");
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error("Grammar Practice local storage data could not be read.", error);
        return [];
      }
    }
    function write(records) {
      storage.setItem(FALLBACK_KEY, JSON.stringify(records));
    }
    return {
      kind: "localStorage",
      async get(sessionId) {
        const item = read().find((record) => record.sessionId === sessionId);
        return safeRecord(item) || null;
      },
      async getAll() {
        return read().map(safeRecord).filter(Boolean).sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
      },
      async getActive() {
        const records = await this.getAll();
        return records.find((item) => item.status === "in_progress") || null;
      },
      async save(session) {
        validateSession(session);
        const records = read();
        const index = records.findIndex((item) => item.sessionId === session.sessionId);
        assertMutable(index >= 0 ? records[index] : null, session);
        if (index >= 0) records[index] = clone(session);
        else records.push(clone(session));
        write(records);
        return clone(session);
      },
    };
  }

  function openDatabase(indexedDBApi) {
    return new Promise((resolve, reject) => {
      const request = indexedDBApi.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          const store = database.createObjectStore(STORE_NAME, { keyPath: "sessionId" });
          store.createIndex("status", "status", { unique: false });
          store.createIndex("startedAt", "startedAt", { unique: false });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("IndexedDB could not be opened."));
      request.onblocked = () => reject(new Error("IndexedDB upgrade is blocked by another tab."));
    });
  }

  function indexedDbDriver(database) {
    function request(method, value) {
      return new Promise((resolve, reject) => {
        const transaction = database.transaction(STORE_NAME, method === "put" ? "readwrite" : "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const dbRequest = method === "put" ? store.put(value) : store[method](value);
        dbRequest.onsuccess = () => resolve(clone(dbRequest.result));
        dbRequest.onerror = () => reject(dbRequest.error || new Error("IndexedDB request failed."));
      });
    }
    return {
      kind: "indexedDB",
      async get(sessionId) { return safeRecord(await request("get", sessionId)) || null; },
      async getAll() {
        const records = await request("getAll");
        return records.map(safeRecord).filter(Boolean).sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
      },
      async getActive() {
        const records = await this.getAll();
        return records.find((item) => item.status === "in_progress") || null;
      },
      async save(session) {
        validateSession(session);
        const existing = await this.get(session.sessionId);
        assertMutable(existing, session);
        await request("put", clone(session));
        return clone(session);
      },
    };
  }

  async function createBrowserStore(environment) {
    const host = environment || (typeof window !== "undefined" ? window : {});
    let driver;
    if (host.indexedDB) {
      try {
        driver = indexedDbDriver(await openDatabase(host.indexedDB));
      } catch (error) {
        console.error("Grammar Practice IndexedDB is unavailable; using local storage.", error);
      }
    }
    if (!driver && host.localStorage) driver = localStorageDriver(host.localStorage);
    if (!driver) throw new Error("Practice records cannot be saved in this browser.");
    return driver;
  }

  return {
    DB_NAME,
    DB_VERSION,
    FALLBACK_KEY,
    STORE_NAME,
    assertMutable,
    createBrowserStore,
    createMemoryStore,
    validateSession,
  };
});
