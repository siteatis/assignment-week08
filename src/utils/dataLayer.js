// Note: This enables dataLayer to access the env var outside the Next.js runtime.
// Or use dotenv? Revise later maybe.
import pkg from "@next/env";
const { loadEnvConfig } = pkg;
loadEnvConfig(process.cwd());

import pg from "pg";

export const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STR,
});

export const dbqry = {
  getPostsAll: "SELECT id,title FROM wk8posts ORDER BY stamp",
  getPostById: "SELECT * FROM wk8posts WHERE id=$1",
  getCommByUsr:
    "SELECT * FROM wk8comments WHERE user_id=$1 ORDER BY stamp DESC",
  getCommByPost:
    "SELECT wk8comments.id AS id, name AS user_name, stamp, subject, content FROM wk8comments LEFT JOIN wk8users ON wk8comments.user_id = wk8users.id WHERE post_id=$1 ORDER BY stamp DESC",
  postNewUsr: "INSERT INTO wk8users (name,password) VALUES($1,$2)",
  postNewComm:
    "INSERT INTO wk8comments (post_id,user_id,subject,content) VALUES($1,$2,$3,$4)",
  delCommByID: "DELETE FROM wk8comments WHERE id=$1",
};

export async function dbget(qry, args = []) {
  try {
    return Promise.resolve((await db.query(qry, args)).rows);
  } catch (er) {
    console.log(er.message);
    throw er;
  }
}

export function dbpost(qry, args = []) {
  try {
    db.query(qry, args);
  } catch (er) {
    console.log(er.message);
    throw er;
  }
}

export function dbdelete(qry, args = []) {
  try {
    db.query(qry, args);
  } catch (er) {
    console.log(er.message);
    throw er;
  }
}
