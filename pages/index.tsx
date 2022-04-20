import Head from 'next/head'
import Header from '../components/Header'
import { sanityClient } from '../sanity'
import { Post } from '../typings'; 
import Banner from '../components/Banner';
import Posts from '../components/Posts';

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Average Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        <Posts posts={posts} />
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `
    *[_type == "post"] {
      _id,
      title,
      slug,
      author -> {
        name,
        image
      },
      description,
      mainImage,
      body
    }
  `;
  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    }
  }
};
