import Image from "next/image";
import rollercoasterpic from "@p/29ROLLERCOASTER-02-lwgc-jumbo.webp";

// TODO: HTTP404: import { redirect } from "next/navigation";

export default function RootPage() {
  return (
    <>
      <h1>Homepage</h1>
      <Image src={rollercoasterpic} alt="decorative" placeholder="blur" />
      {/*<Image
        // src="https://picsum.photos/1600/1200"
        src="https://static.scientificamerican.com/sciam/cache/file/6284F581-96A1-4D49-9F1B9F22EA328189_source.jpg?w=1200"
        alt="needs alt text"
        width={800}
        height={500}
      />*/}
    </>
  );
}
