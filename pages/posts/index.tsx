import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostListProps {
  posts: any[];
}

export const getStaticProps: GetStaticProps<PostListProps> = async (
  context: GetStaticPropsContext
) => {
  // Server-side
  // Build-time
  // console.log('static props');
  const res = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
  const data = await res.json();
  // console.log(data);
  return {
    props: {
      posts: data.data,
    },
  };
};

const Post = ({ posts }: PostListProps) => {
  const router = useRouter();

  const goToPost = () => {
    router.push({
      pathname: '/posts/[data1]/[data2]',
      query: {
        data1: 'Tada',
        data2: 'Hello Tada',
      },
    });
  };

  return (
    <div>
      <h1>Posts Page</h1>

      <button onClick={goToPost}>Click here</button>

      <div>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`posts/${post.id}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Post;
