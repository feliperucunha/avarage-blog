import React from 'react'

function Banner() {
  return (
    <div className='flex justify-between items-center border-y border-black border-t-0 bg-yellow-500 py-10 lg:py-0'>
      <div className='px-10 space-y-5'>
        <h1 className='text-7xl font-bold max-w-xl font-serif'>
          Stay Curious.
        </h1>
        <h2 className='text-xl'>
          Discover stories, thinking, and expertise <br /> from writers on any topic.
        </h2>
        <h3 className='text-white border w-48 text-center px-3 py-2 rounded-full border-black bg-black'>Start Reading</h3>
      </div>
      <img className='hidden md:inline-flex h-32 lg:h-full' src="/images/m.png" alt="m logo" />
    </div>
  )
}

export default Banner