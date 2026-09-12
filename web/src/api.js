export let IDB_DB_NAME = "menighetsbladet-local";

export let IDB_STORE_NAME = "kv";

export let IDB_JSON_CACHE_KEY = "source-json-cache";

export let IDB_RECORD_STORES = ["drivers", "distributors", "addresses", "routes"];

export let idbDbPromise = null;


export function getIndexedDb() {
    if (!window.indexedDB) {
      return Promise.resolve(null);
    }
    if (idbDbPromise) {
      return idbDbPromise;
    }
    idbDbPromise = new Promise(function (resolve) {
      try {
        var req = window.indexedDB.open(IDB_DB_NAME, 2);
        req.onupgradeneeded = function (event) {
          var db = event.target.result;
          if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
            db.createObjectStore(IDB_STORE_NAME);
          }
          IDB_RECORD_STORES.forEach(function (storeName) {
            if (!db.objectStoreNames.contains(storeName)) {
              db.createObjectStore(storeName, { keyPath: "_id", autoIncrement: true });
            }
          });
        };
        req.onsuccess = function (event) {
          resolve(event.target.result);
        };
        req.onerror = function () {
          resolve(null);
        };
      } catch (e) {
        resolve(null);
      }
    });
    return idbDbPromise;
  }

export function idbGetValue(key) {
    return getIndexedDb().then(function (db) {
      if (!db) {
        return null;
      }
      return new Promise(function (resolve) {
        try {
          var tx = db.transaction(IDB_STORE_NAME, "readonly");
          var store = tx.objectStore(IDB_STORE_NAME);
          var req = store.get(key);
          req.onsuccess = function (event) {
            resolve(event.target.result || null);
          };
          req.onerror = function () {
            resolve(null);
          };
        } catch (e) {
          resolve(null);
        }
      });
    });
  }

export function idbSetValue(key, value) {
    return getIndexedDb().then(function (db) {
      if (!db) {
        return false;
      }
      return new Promise(function (resolve) {
        try {
          var tx = db.transaction(IDB_STORE_NAME, "readwrite");
          var store = tx.objectStore(IDB_STORE_NAME);
          var req = store.put(value, key);
          req.onsuccess = function () {
            resolve(true);
          };
          req.onerror = function () {
            resolve(false);
          };
        } catch (e) {
          resolve(false);
        }
      });
    });
  }

export function idbGetAll(storeName) {
    return getIndexedDb().then(function (db) {
      if (!db) {
        return [];
      }
      return new Promise(function (resolve) {
        try {
          var tx = db.transaction(storeName, "readonly");
          var store = tx.objectStore(storeName);
          var req = store.getAll();
          req.onsuccess = function (event) {
            resolve(event.target.result || []);
          };
          req.onerror = function () {
            resolve([]);
          };
        } catch (e) {
          resolve([]);
        }
      });
    });
  }

export function withoutStoreId(row) {
    var out = {};
    Object.keys(row || {}).forEach(function (key) {
      if (key !== "_id") {
        out[key] = row[key];
      }
    });
    return out;
  }

export function cleanRecordForStore(row) {
    var out = {};
    for (var key in row) {
      if (Object.prototype.hasOwnProperty.call(row, key)) {
        if (!key.startsWith("__")) {
          out[key] = row[key];
        }
      }
    }
    return out;
  }

export function looksLikeJsonText(text) {
    var trimmed = String(text == null ? "" : text).trim();
    return trimmed.indexOf("{") === 0 || trimmed.indexOf("[") === 0;
  }
