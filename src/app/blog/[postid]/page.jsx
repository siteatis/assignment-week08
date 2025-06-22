import { dbqry, dbget, dbpost } from "@u/dataLayer";
import { notFound } from "next/navigation";
import { asDateTime } from "@/utils/utils";

export default async function PostPage({ params }) {
  const id = (await params).postId; // TODO: or postid?
  const post = (await dbget(dbqry.getPostById, [id]))[0];
  const comments = (await dbget(dbqry.getCommByPost, [id]))[0];
//const response = await fetch(
//    `https://jsonplaceholder.typicode.com/posts/${slug.id}` ); // include the params.id value from the URL
//const post = await response.json(); // parse the response as JSON
  // TODO: notfound if there's no such row!
  // TODO: get the entry data from the database for each individual post to render them dynamically
  // TODO: implement a delete button
  // TODO: test it notfounds if post missing
  return (
    (!post) ? (notFound()) : // throw 404 if no such post
    <>
      <h1>This is the post page</h1>
      <p>{`This is post #${post.id} saying: ${post.content}.`}</p>
      <CommentsForm/>
            {comments.map((x) => (
        <div key={x.id}>{==> asDateTime(x.stamp),subject, and content}
        </div>
      ))}

    </>
  );
}

export default async function RollercoasterPage({ params }) {
  return (
    <>
      <h1>Rollercoaster Page</h1>
      <p>{`Rollercoaster #${data.id} called ${data.name}`}</p>
    </>
  );
}

