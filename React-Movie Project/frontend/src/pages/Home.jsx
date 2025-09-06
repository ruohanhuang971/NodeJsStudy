import MovieCard from "../components/MovieCard"
import { useState } from "react"

function Home() {
    // searchQuery [name of state], setSearchQuery [update state]
    // when a state change occurs, the entire components is reran or re-rendered
    // the value of the state is presisted at each re-render, unlike a normal variable
    // will be reset at website refresh
    const [searchQuery, setSearchQuery] = useState("")

    const movies = [
        { id: 1, title: "John Wick", release_date: "2020" },
        { id: 2, title: "Terminator", release_date: "1999" },
        { id: 3, title: "The Matrix", release_date: "1998" },
    ]

    const handleSearch = (e) => {
        // prevents the default behavior of refreshing the page after hitting the submit button and losing the input
        e.preventDefault()
        alert(searchQuery)
        // manual changes the search bar state to '--------', so after submit, the search bar will display '--------'
        // setSearchQuery('--------')
    }

    return (
        < div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery} /*saves state of input box*/
                    /*calls function, state is updated with updates the page*/
                    onChange={(e) => setSearchQuery(e.target.value)}
                ></input>
                <button type="submit" className="search-btn">Search</button>
            </form>

            <div className="movies-grid">
                {movies.map(
                    (movie) =>
                        (movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())) && (
                            <MovieCard movie={movie} key={movie.id} />
                        )
                )}
            </div>
        </div >
    )
}

export default Home