import { useEffect, useState } from 'react'
import BookCard from '../books/BookCard';

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

const TopSellers = () => {
    const [books, setBooks] = useState([]);
    const [selected, setSelected] = useState("Choose a genre");

    // useEffect(..., []): runs once on component load	
    // fetch("books.json"): Loads data from books.json	
    // .then(res => res.json()): once recieve, convert to json
    useEffect(() => {
        fetch("books.json").then(res => res.json()).then((data) => setBooks(data));
    }, []);

    const filteredBooks = selected === "Choose a genre" ? books : books.filter((book) => book.category === selected.toLowerCase());

    console.log("ljkhdfljkasfjkldsljkhsadfjklj")
    console.log(filteredBooks)

    return (
        <div className='py-10'>
            <h2 className='text-3xl font-semibold mb-6'>Top Sellers: </h2>

            {/* category filters */}
            <div className='mb-8 flex items-center'>
                <select onChange={(e) => setSelected(e.target.value)} name='category' id='category' className='font-secondary border rounded-md bg-[#eaeaea] border-gray-300 px-4 py-2 focus:outline-none'>
                    {
                        // react need a unqiue identifier when rendering lists to track which items are changed
                        categories.map((category, index) => {
                            return <option className='hover:bg-amber-300' key={index} value={category}>{category}</option>
                        })
                    }
                </select>
            </div>

            {/* display filtered books*/}
            {
                filteredBooks.map((book, index) => {
                    return <BookCard key={index} book={book} />
                })
            }
        </div>
    )
}
export default TopSellers;