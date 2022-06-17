import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostDetailProps {
  post: any;
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('\nGet static paths: ');
  const res = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
  const data = await res.json();

  return {
    paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostDetailProps> = async (
  context: GetStaticPropsContext
) => {
  console.log('\nGet static props: ', context.params?.postId);

  const postId = context.params?.postId;

  if (!postId) return { notFound: true };

  const res = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
  const data = await res.json();
  // console.log(data);
  return {
    props: {
      post: data,
    },
  };
};

export default function PostDetail({ post }: PostDetailProps) {
  const router = useRouter();

  if (!post) return null;

  return (
    <div>
      <h1>Post detail</h1>

      <p>Query: {JSON.stringify(router.query)}</p>

      <p>
        <h5>Title: </h5>
        {post.title}
      </p>
      <p>
        <h5>Author: </h5>
        {post.author}
      </p>
      <p>
        <h5>Description: </h5>
        {post.description}
      </p>
      <p>
        <a href={post.imageUrl}>Go to image</a>
      </p>
      <div>
        <Image src={post.imageUrl} alt={`Image of ${post.author}`} width={300} height={150} />
      </div>
    </div>
  );
}
