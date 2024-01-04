import React, {useState, CSSProperties} from 'react'
import {ClipLoader, PulseLoader} from "react-spinners";
import axios from "axios"

const override: CSSProperties = {
  borderColor: "green",
};

const App = () => {
  let [movieName, setMovieName] = useState()
  let [name, setName] = useState()
  let [arr, setArr] = useState([])
  let [see, setSee] = useState(false)
  let [count, setCount] = useState(true)
  let [loading, setLoading] = useState(false)
  
  let url = `https://www.omdbapi.com/?apikey=4768ae48&s=${movieName}`

    async function fetchData(e) {
        setName(movieName)
        e.preventDefault()
        try {
          setLoading(true)
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
            setTimeout(() => {
              setCount(false)
              setLoading(false)
            
          }, 1500);

        } catch(err) {
            alert(err)
        }
    }
  function handleChange(e) {
      setMovieName(e.target.value)
      console.log(e.target.value)
  }
  return (
    <>
      
    <div className="navbar-container">
        <div className="navbar-inner-container">
                <div clasName="navbar-right-container">
                    <h2>MyTube</h2>
                </div>
                <div clasName="navbar-left-container">
                  <form onSubmit={fetchData}>
                    <input onChange={handleChange} className="search" type="text" placeholder="Search any movies here"/>
                    
                      <button type="submit" className="search btn" style={loading?{backgroundColor: "gray"}: null}>
                        {loading ? "loading...": "Search"}
                        </button>
                    
                    

                  </form>
                </div>
        </div>
        { !count?
        (see && typeof arr !== "undefined"? 
        (loading?
        <div className="loading-container">
          <ClipLoader
          loading={loading}
          color= "#0000"
          cssOverride={override}
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
          />
          <p>Loading...</p>
        </div>
        :
        <div>
        <div className="result-title">
          <h2 >Here are the ({arr.length}) results for "{name.toUpperCase()}"</h2>
        </div>
        <div className="display-movie">

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
        </div>
        </div>) : 
        <div style={{width: "80%", margin: "auto"}}>Wrong Input value</div>)
        :
        <div>Please enter the value</div>
        }
    </div>
      </>
  )
}


export default App
