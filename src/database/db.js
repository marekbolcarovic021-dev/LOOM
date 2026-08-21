import Dexie from "dexie";

const db = new Dexie("LOOMDatabase");

db.version(1).stores({
  goals: "++id, name",
  investments: "++id, name",
});

export default db;
