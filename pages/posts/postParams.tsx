import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostParamsProps {}

export default function PostParams(props: PostParamsProps) {
  const router = useRouter();

  return (
    <div>
      <h1>Post Params</h1>
      <p>Query: {JSON.stringify(router.query)}</p>
    </div>
  );
}
