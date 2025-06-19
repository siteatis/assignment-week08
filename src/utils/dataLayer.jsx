import pg from "pg";

export const db = new pg.Pool({
  connectionString: process.env.NEXT_DB_CONN_STR,
});

// TODO: If this approach turns out to work, add the remaining queries
export const dbqry = {
  getPostsAll: "SELECT * FROM posts",
  getPostById: "SELECT * FROM posts WHERE id=$1",
  getCommByUsr: "SELECT * FROM comments WHERE user_id=$1",
};
