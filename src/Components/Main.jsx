import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";

const Main = () => {
    
    const [ pokeData, setPokeData ] = useState([ ])
    const [ loading, setLoading ] = useState(true);
    const [ url, setUrl ] = useState("https://pokeapi.co/api/v2/pokemon/") 
    const [ nextUrl, setNextUrl ] = useState();
    const [ prevUrl, setPrevUrl ] = useState();
    const [ pokeDex, setPokeDex ] = useState();


    const pokeFun = async() => {
        setLoading(true);
        const res = await axios.get(url);
        // console.log(res.data.results);
        setNextUrl(res.data.next); // this data.next is coming from api..and setNextUrl loads the next 20 pokemon
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results)
        setLoading(false); // calling the setLoading function and keeping it false
        // console. log(pokeData)

    }
    const getPokemon = async(res) => {
        res.map( async (item) => { // here we are passing the array
            const result = await axios.get(item.url)
            // console.log(result.data)
            setPokeData(state=> {
                state = [...state, result.data]// creating a new array..first we are storing all the elements of the existing array and then adding the new items in the array
                state.sort((a, b) => a.id > b.id ? 1: -1)
                return state;
            }) // storing all the data that from result in setPokeData
        })
    }
    useEffect(() => {
         pokeFun();
    }, [url]) // useEffect always executes whenever our application will render and if we pass the empty array as 2nd arguement, that will make sure useeffect only runs when the page is loaded and if we pass the url (state variable..above)..this would mean that whenever this url updates, the useEffect will run and our application will render again.
   
   return (
        <>
        
        <div className="container">
            <div className="left-content"> 
                {/* // in the left-content, we will add our card component */}
                <Card pokemon = {pokeData} loading = {loading} infoPokemon={poke => setPokeDex(poke)}/>
                <div className="btn-group">
                    {prevUrl && <button onClick={() => { // prevUrl && : here we are checking if the previous data is available or not, if not available and according to the && properties, if first section is false, then it will not check for the second part..so button will not be visible
                       setPokeData([]) // passing the setPokeData with empty array we are able to display current pages 20 pokemon ie it is not continuing from 1 to 40 rather than 20 to 40, when we click on next button
                        setUrl(prevUrl) // calling the setUrl and passing the prevUrl
                    }}>Previous</button>}
                    
                   { nextUrl && <button onClick={() => {
                        setPokeData([])
                        setUrl(nextUrl)
                    }}>Next</button>}
                </div>
            </div>
            <div className="right-content">
                 {/* // in the right-content, we will add our pokeinfo component */}
                <Pokeinfo data = {pokeDex}/>
                {/* // passing the props in Pokeinfo component */}
            </div>
        </div>

        </>
    )
}

export default Main;