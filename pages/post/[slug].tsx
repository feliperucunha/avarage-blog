import { GetStaticProps } from 'next'
import React from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'

interface Props {
  post: Post;
}

function PostPage({ post }: Props) {
  return (
    <main>
      <Header />

      <img src={urlFor(post.mainImage).url()!} alt="" />
    </main>
  )
}

export default PostPage;

export const getStaticPaths = async () => {
  const query = `
    *[_type == "post"] {
      _id,
      slug {
        current
      }
    }
  `;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
  *[_type == "post" && slug.current == 'best-macos-apps'][0] {
    _id,
    _createdAt,
    title,
    description,
    mainImage,
    body,
    author -> {
      name,
      image
    },
    slug,
  }
  `;
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true
    }
  };

  return {
    props: {
      post,
    }
  }
}