import { useState } from 'react'
import { Link } from 'react-router'

import { useSelector } from 'react-redux'

import { GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { FiUserCheck } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { LiaShoppingCartSolid } from "react-icons/lia";

const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Orders', href: '/orders' },
    { name: 'Cart Page', href: '/cart' },
    { name: 'Check Out', href: '/checkout' },
]

const Navbar = () => {

    const [isDropDownOpen, setDropDownOpen] = useState(false); // state default is false

    // get shopping cart info with redux
    const cartItems = useSelector(state => state.cart.cartItems);

    const currentUser = false;

    return (
        <header className='max-w-screen-2xl mx-auto px-2 py-6'>  {/* border of the navbar*/}
            {/* // evenly spaced items take up whole container and centered vertically */}
            <nav className='flex justify-between items-center'> {/* actual navbar contents */}
                {/* left side: logo + search bar*/}
                <div className='flex items-center md:gap-16 gap-4'>
                    <Link to='/'>
                        <GoHome className='size-8' />
                    </Link>

                    {/* search input */}
                    {/*position relative to container, responsive width, and horizontal spacing between children*/}
                    <div className='relative sm:w-72 w-40 space-x-2'>
                        {/* absolute position to ancestor, can inline with text */}
                        <IoSearch className='absolute inline-block left-2 inset-y-2' /> {/* search icon */}
                        <input type='text' placeholder='Search for your next read' className='bg-gray-200 w-full py-1 md:px-8 px-6 rounded-md focus:outline-blue-100' />
                    </div>
                </div>

                {/* right side: login*/}
                <div className='relative flex items-center px-2 md:space-x-3 space-x-2'>
                    <div>
                        {
                            currentUser ? <>
                                {/* onclick, call setDropDownOpen and toggle isDropDownOpen*/}
                                <button onClick={() => setDropDownOpen(!isDropDownOpen)}>
                                    <FiUserCheck className='relative translate-y-0.5 size-6' />
                                </button>
                                {/* show dropdowns */}
                                {
                                    isDropDownOpen && (
                                        <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                                            <ul className='py-2'>
                                                {navigation.map((item) => (
                                                    // hide dropdown once an option is picked
                                                    <li key={item.name} onClick={() => setDropDownOpen(false)}>
                                                        <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )
                                }
                            </> : <Link to='/login'><FiUser className='size-7' /></Link>
                        }
                    </div>

                    <button className='hidden sm:block'> {/* heart not visible on small screen*/}
                        <FaRegHeart className='size-6' />
                    </button>

                    <Link to='/cart' className='bg-primary p-1 sm:px-4 px-2 py-1 flex items-center rounded-sm'> {/* 'rounded-sm': applies small border-radius, round corners*/}
                        <LiaShoppingCartSolid className='size-7' />
                        <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span> {/* span wrap inline element */}
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;