import { client } from "../../libs/client";
import sytles from "../../styles/Home.module.scss";

//SSG
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });
  return {
    props: {
      blog: data,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return {
    paths,
    fallback: false,
  };
};

export default function BlogID({ blog }) {
  return (
    <main className={sytles.main}>
      <h1 className={sytles.title}>{blog.title}</h1>
      <p className={sytles.publishedAt}>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{ __html: `${blog.body}` }}
        className={sytles.post}
      ></div>
    </main>
  );
}
