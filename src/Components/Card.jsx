import React from "react";

const Card = ({ pokemon, loading, infoPokemon }) => { // this displays the information of a pokemon on the RHS if the user clicks on a card
  // console.log(pokemon)
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((item) => {
          return (
            <>
                <div className="card" key={item.id} onClick={() => {infoPokemon(item)}}> 
                  {/* // adding a key to uniquely identify */}
                <h2>{item.id}</h2>
{/* images are in the sprite component on the console (browser) */}
                <img src={item.sprites.front_default}   alt="" />
                <h2>{item.name}</h2>
              </div>
            </>
          );
        })
      )}
    </>
  );
};

export default Card;
