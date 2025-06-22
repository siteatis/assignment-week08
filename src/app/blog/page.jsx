import { dbqry, dbget } from "@u/dataLayer";
import Link from "next/link";

const sort = (s, a) => (s === "desc" ? a.reverse() : a); // Reverse array if sort is desc

export default async function PostsPage({ searchParams }) {
  const sp = await searchParams;
  // in next, the server is doing the HTTP GET/PUT/etc request as part of the render
  // TODO: error handling to be dealt with later

  const posts = sort(sp.sort, await dbget(dbqry.getPostsAll));
  //const response = await fetch("https://jsonplaceholder.typicode.com/posts"); // call the API
  //const posts = await response.json(); // parse the response as JSON

  // TODO: tidy & style sort links
  // TODO: Use slug instead of id?
  return (
    <>
      <h1>This is the posts page</h1>
      <Link href="/blog?sort=asc">Sort ^^</Link> -
      <Link href="/blog?sort=desc">Sort vv</Link>
      {posts.map((x) => (
        <div key={x.id}>
          <Link href={`/blog/${x.id}`}>{(asDateTime(x.stamp), x.subject)}</Link>
        </div>
      ))}
    </>
  );
}
