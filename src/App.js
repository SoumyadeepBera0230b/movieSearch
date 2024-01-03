import React, {useState} from 'react'
import axios from "axios"

const App = () => {
  let [movieName, setMovieName] = useState()
  let [arr, setArr] = useState([])
  let [see, setSee] = useState(false)
  let [networkError, setNetworkError] = useState(false)
  
  let url = `https://www.omdbapi.com/?apikey=4768ae48&s=${movieName}`

    async function fetchData(e) {
        e.preventDefault()
        try {
          let response = await axios.get(url)
          if (response){
          // setMovies(response.data)
              console.log("The result are found" , response.data.Search)
              setArr(response.data.Search)
              console.log("The arr is ",arr)
              setSee(true)
              // return (response.data)
          } else {
              alert("Error with the API")
          }

        } catch(err) {
            setNetworkError(true)
            alert(err)
        }
    }
  function handleChange(e) {
      setMovieName(e.target.value)
      console.log(e.target.value)

  }
  return (
    <>
      {
        networkError?<div>Network Error please check your internet...</div>:

    <div className="navbar-container">
        <div className="navbar-inner-container">
                <div clasName="navbar-right-container">
                    LOGO
                </div>
                <div clasName="navbar-left-container">
                  <form onSubmit={fetchData}>
                    <input onChange={handleChange} className="search" type="text" placeholder="Search any movies here"/>
                    
                    <button type="submit" className="search btn">Search</button>
                    

                  </form>
                </div>
        </div>
        {see && typeof arr !== "undefined"? <div className="display-movie">

          {console.log("movie displaying", arr)}
                {
                    arr.map((index) => {
                        return (
                            
                              index.Poster !== "N/A"&&
                                    <div className="display-img">
                                    <img src={index.Poster} alt=""/>
              
                              </div>
                            
                        )
                    })
                }
        </div> : 
        <div>Wrong Input value</div>
        }
    </div>
      }
      </>
  )
}


export default App
