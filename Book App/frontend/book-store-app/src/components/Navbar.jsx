import { Link } from 'react-router'
import { GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
    return (
        <header className='max-w-screen-2xl mx-auto px-4 py-6'>  {/* border of the navbar*/}
            {/* // evenly spaced items take up whole container and centered verticly */}
            <nav className='flex justify-between items-center'> {/* actual navbar contents */}
                {/* left side: logo + search bar*/}
                <div className='flex items-center md:gap-16 gap-4'>
                    <Link to='/'>
                        <GoHome className='size-8' />
                    </Link>

                    {/* search input */}
                    {/*position relative to container, responsive width, and horizontal spacing between children*/}
                    <div className='relative sm:w-72 w-40 space-x-2'>
                        {/* absolute postion to acestor, can inline with text */}
                        <IoSearch className='absolute inline-block left-2 inset-y-2' /> {/* search icon */}
                        <input type='text' placeholder='Search for your next read' className='bg-gray-200 w-full py-1 md:px-8 px-6 rounded-md focus:outline-blue-100' />
                    </div>
                </div>

                {/* right side: login*/}
                <div className='relative flex items-center md:space-x-3 space-x-2'>
                    <FaRegUser className='size-6' />
                    <button className='hidden sm:block'> {/* heart not visible on small screen*/}
                        <FiHeart className='size-6' />
                    </button>

                    <Link to='/cart' className='bg-primary p-1 sm:px-6 px-2 py-2 flex items-center rounded-sm'> {/* 'rounded-sm': applies small border-radius, round corners*/}
                        <FiShoppingCart className='' />
                        <span className='text-sm font-semibold sm:ml-1'>0</span> {/* span wrap inline element */}
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;