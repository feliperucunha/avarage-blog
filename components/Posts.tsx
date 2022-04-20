import React from 'react'
import Link from 'next/link'
import { urlFor } from '../sanity'
import { Post } from '../typings'; 

interface Props {
  posts: [Post];
}

function Posts({ posts }: Props) {
  return (
    <>
      {posts.map(post => (
        <Link key={post._id} href={`/post/${post.slug.current}`}>
          <div className='group cursor-pointer border rounded-lg overflow-hidden'>
            {/* the ! symbol protects from empty values */}
            <img
              className='h-60 w-full object-cover group-hover:scale-105 transition-transform durantion-200 ease-in-out'
              src={urlFor(post.mainImage).url()!}
              alt={post.description}
            />
            <div className='flex justify-between p-5 bg-white'>
              <div>
                <p className='text-lg font-bold'>{post.title}</p>
                <p className='text-xs'>{post.description} by {post.author.name}</p>
              </div>

              <img
                className='h-12 w-12 rounded-full'
                src={urlFor(post.author.image).url()!}
                alt={post.author.name} 
              />
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}

export default Posts