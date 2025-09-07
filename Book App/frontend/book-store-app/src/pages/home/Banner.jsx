import React from 'react'
import bannerImg from "../../assets/books-1.jpg"

const Banner = () => {
    return (
        <div className='flex md:flex-row-reverse flex-col py-16 justify-between items-center gap-12'>
            {/* right side: image*/}
            <div className='md:w-1/2 w-full'>
                <img src={bannerImg} alt="stacks of books"></img>
            </div>

            {/* left side: info text*/}
            <div className='md:w-1/2 w-full'>
                <h1 className='md:text-5xl text-3xl font-medium mb-7'>New Releases This Week</h1>
                <p className='mb-10 font-secondary'>
                    Dive into the freshest stories hitting the shelves this week! From gripping thrillers and heartfelt romances to inspiring biographies and captivating fantasy worlds, these new books are ready to keep you turning pages. Discover your next favorite read today!
                </p>

                <button className='btn-primary'>Dive in</button>
            </div>
        </div >
    )
}

export default Banner