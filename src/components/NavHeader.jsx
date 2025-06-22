import Link from "next/link";
import css from "@c/NavHeader.module.css";

export default function NavHeader() {
  return (
    <>
      <nav className="flex justify-center gap-2 p-5 font-[--font-rale-hdr]">
        <Link className={css.link} href={"/"}>
          Welcome
        </Link>
        <Link className="text-[color:--link-colour]" href={"/blog"}>
          {/* TODO! */}
          Blog
        </Link>
        <Link className={css.link} href={"/user"}>
          User
          {/* TODO: Should say "log in" if not logged in */}
        </Link>
      </nav>
    </>
  );
}
