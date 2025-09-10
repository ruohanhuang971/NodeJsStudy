import { useEffect, useState } from 'react'
import BookCard from '../books/BookCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { useFetchAllBooksQuery } from '../../redux/features/books/bookAPI';

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

const TopSellers = () => {
    const [selected, setSelected] = useState("Choose a genre");

    const { data } = useFetchAllBooksQuery();
    const { books = [], count = 0 } = data || {};

    const filteredBooks = selected === "Choose a genre" ? books : books.filter((book) => book.category.toLowerCase() === selected.toLowerCase());

    return (
        <div className='py-10'>
            <h2 className='text-3xl font-semibold mb-6'>Top Sellers: </h2>

            {/* category filters */}
            <div className='mb-8 flex items-center'>
                <select onChange={(e) => setSelected(e.target.value)} name='category' id='category' className='font-secondary border rounded-md bg-[#eaeaea] border-gray-300 px-4 py-2 focus:outline-none'>
                    {
                        // react need a unique identifier when rendering lists to track which items are changed
                        categories.map((category, index) => {
                            return <option className='hover:bg-amber-300' key={index} value={category}>{category}</option>
                        })
                    }
                </select>
            </div>

            <Swiper
                navigation={true}
                slidesPerView={1}
                spaceBetween={30}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    }
                }}
                modules={[Navigation]}
                className="mySwiper"
            >
                {/* display filtered books*/}
                {
                    filteredBooks.length > 0 && filteredBooks.map((book, index) => {
                        return <SwiperSlide key={index}><BookCard book={book} /></SwiperSlide>
                    })
                }
            </Swiper>
        </div>
    )
}
export default TopSellers;