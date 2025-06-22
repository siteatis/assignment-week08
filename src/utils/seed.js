import { db, dbqry, dbget } from "./dataLayer.js";
import { encodePassword } from "./security.js";

async function doSeeding() {
  for (let q of [
    `BEGIN`,
    `DROP TABLE IF EXISTS wk8posts, wk8comments, wk8users`,
    `CREATE TABLE wk8posts (
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title VARCHAR(255) NOT NULL,
      stamp TIMESTAMP DEFAULT now(),
      text TEXT
    )`,
    `CREATE TABLE wk8users (
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(40) NOT NULL,
      password INT NOT NULL
    )`,
    `CREATE TABLE wk8comments (
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      post_id INT,
      user_id INT,
      stamp TIMESTAMP DEFAULT now(),
      subject VARCHAR(255) NOT NULL,
      content TEXT
    )`,
    `CREATE INDEX idx_postid_stamp ON wk8comments(post_id,stamp)`,
    `CREATE INDEX idx_userid_stamp ON wk8comments(user_id,stamp)`,
    `INSERT INTO wk8posts (title,text) VALUES
      ('Blog Post #1', 'This is the first post in the blog and contains some text.'),
      ('Blog Post #2', 'This is the second post in the blog and contains some more text.'),
      ('Blog Post #3', 'This is the third post in the blog and contains some other more text.')`,
    `INSERT INTO wk8users (name,password) VALUES ('owner',${encodePassword(
      process.env.OWNER_PASSWORD
    )})`,
    `INSERT INTO wk8comments (post_id, user_id, subject, content) (SELECT MIN(wk8posts.id) AS post_id, MIN(wk8users.id) AS user_id, 'Superb post' AS subject, 'This surely must be the best post in the history of blogging' AS content FROM wk8posts, wk8users)`,
    `INSERT INTO wk8comments (post_id, user_id, subject, content) (SELECT MIN(wk8posts.id) AS post_id, MIN(wk8users.id) AS user_id, 'Questionable post' AS subject, 'I have reported this post to the relevant authorities' AS content FROM wk8posts, wk8users)`,
    `COMMIT`,
  ])
    await db.query(q);
  console.log(await dbget(dbqry.getCommByPost, [1]));
  console.log("Seed data created successfully!");
}
doSeeding();

/*
    `END TRY`,
    `BEGIN CATCH`,
    `ROLLBACK`,
    `SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage`,
    `END CATCH`,
*/
