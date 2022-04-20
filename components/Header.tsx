import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Header(props: any) {
  const [navbarColor, setNavbarColor] = useState(false);

  const changeBackgroundColor = () => {
    if (window.scrollY >= 479 ) {
      setNavbarColor(true)
    }
    if (window.scrollY < 479 ) {
      setNavbarColor(false)
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackgroundColor)
  });

  return (
    <header className={`${navbarColor ? '!bg-white ' : 'bg-yellow-500 '}flex justify-between p-5 max-w-7xl mx-auto ${props.whiteBg ? '!bg-white' : 'bg-yellow-500 border-y border-black sticky top-0 z-50'}`}>
      <div className='flex items-center space-x-5'>
        <Link href="/"> 
          <div className='flex object-contain items-center cursor-pointer'>
            <img 
              className="w-20"
              src="/images/logo.png"
              alt="logo"
            />
            <h1 className='text-4xl font-serif font-bold'>Average</h1>
          </div>
        </Link>
      </div>
      <div className='flex items-center space-x-5 text-black'>
        <div className='hidden md:inline-flex items-center space-x-5'>
          <h3>Our Story</h3>
          <h3>Membership</h3>
          <h3>Write</h3>
        </div>
        <h3 className='hidden md:inline-flex'>Sign In</h3>
        <h3 className='text-white border px-4 py-2 rounded-full border-black bg-black'>Get Started</h3>
      </div>
    </header>
  )
}

export default Header