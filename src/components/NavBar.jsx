import axios from "axios"
import { useState } from "react"
import { useGlobalContext } from "../contexts/GlobalContext"

function NavBar() {

    const [searchValue, setSearchValue] = useState("")
    const { setMoviesArr, moviesArr } = useGlobalContext()

    const onChange = (event) => {
        setSearchValue(event.target.value)
    }

    const handleSubmit = async (event) => {
        // try {
            event.preventDefault()
            const [movies, tv] = await Promise.all([
                axios
                    .get("https://api.themoviedb.org/3/search/movie",
                        {
                            params: {
                                api_key: "9d5235dee5556b95d050a5c00ecfc6fc",
                                query: searchValue
                            }
                        })
                    .then((resp) => {
                        console.log(resp);
        
                        setMoviesArr(resp.data.results)
                    }),
        
                axios
                    .get("https://api.themoviedb.org/3/search/tv",
                        {
                            params: {
                                api_key: "9d5235dee5556b95d050a5c00ecfc6fc",
                                query: searchValue
                            }
                        }
                    )
                    .then((resp) =>{
                        setMoviesArr(...moviesArr, resp.data.results)
                    })
                ])
                // } 
            // )
        } 
            
        
    return (

        <header>
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchValue} onChange={onChange} />
                <button type="submit" className="btn btn-primary">
                    Cerca
                </button>
            </form>
        </header>

    )
}

export default NavBar