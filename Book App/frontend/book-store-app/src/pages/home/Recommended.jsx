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

const Recommended = () => {
    const [books, setBooks] = useState([]);

    // useEffect(..., []): runs once on component load	
    // fetch("books.json"): Loads data from books.json	
    // .then(res => res.json()): once receive, convert to json
    useEffect(() => {
        fetch("books.json").then(res => res.json()).then((data) => setBooks(data));
    }, []);

    return (
        <div className='py-16'>
            <h2 className='text-3xl font-semibold mb-6'>Recommended for you:</h2>
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
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    }
                }}
                modules={[Navigation]}
                className="mySwiper"
            >
                {/* display filtered books*/}
                {
                    books.length > 0 && books.slice(8, 16).map((book, index) => {
                        return <SwiperSlide><BookCard key={index} book={book} /></SwiperSlide>
                    })
                }
            </Swiper>
        </div>
    )
}

export default Recommended