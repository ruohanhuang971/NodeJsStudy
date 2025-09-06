- React is based on components
    - components are reusable blocks and are javascript functions

- jsx code:
    - name is capitalized
    - css + javascript code
    - need have a single parent/root element
        - if need to return multiple div, use fragment '<></>'

- Component basics
    ```js
    function App() {
        return (
            <>
            <Text display='hello world' /> {/*calls the dummy component*/}
            <Text display='yippie'></Text>
            </>
        )
    }

    // dummy component
    function Text({ display }) {
        return (
            <div>
            <p>{display}</p>
            </div>
        )
    }
    ```

- using imported custom component and conditional rendering based on movideNumber variable
    ```js
      {movieNumber === 1 ? (
        <MovieCard movie={{ title: "tim's film", release_date: "2024" }} />
      ) : (
        <MovieCard movie={{ title: "joe's film", release_date: "2023" }} />
      )}
    ```