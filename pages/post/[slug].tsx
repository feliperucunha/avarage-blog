import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import Head from 'next/head'
import PortableText from 'react-portable-text'
import CommentForm from '../../components/CommentForm'
interface Props {
  post: Post;
}

function PostPage({ post }: Props) {
  const [ submitted, setSubmitted ] = useState(false);

  return (
    <main>
      <Head>
        <title>Average Blog | {post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header whiteBg />

      <img
        className='w-full h-40 object-cover'
        src={urlFor(post.mainImage).url()!}
        alt={post.description}
      />

      <article className='max-w-2xl mx-auto p-5'>
        <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
        <h2 className='text-xl font-light text-gray-500 mb-2'>{post.description}</h2>

        <div className='flex items-center space-x-2'>
          <img
            className='h-10 w-10 rounded-full'
            src={urlFor(post.author.image).url()!}
            alt={post.author.name}
          />

          <p className='font-extralight text-sm'>
            Blog post by <span className='text-green-600'>{post.author.name}</span> - Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <div>
          <PortableText 
            content={post.body}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          />
        </div>
      </article>

      <hr className='max-w-lg my-5 mx-auto border border-yellow-500' />

      {submitted ? (
        <div className='flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto'>
          <h3 className='text-3xl font-bold'>
            Thank you for submitting your comment.
          </h3>
          <p>Once it has been approved, it will appear below.</p>
        </div>
      ) : (
        <CommentForm post={post} setSubmitted={setSubmitted} />
      )}
      
      <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2'>
        <h3 className='text-4xl'>Comments</h3>
        <hr className='pb-2' />

        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p><span className='text-yellow-500'>{comment.name}: </span>{comment.comment}</p>
          </div>
        ))}
      </div>
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
  *[_type == "post" && slug.current == $slug][0] {
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
    'comments': *[
      _type == 'comment' &&
      post._ref == ^._id &&
      approved == true
    ],
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