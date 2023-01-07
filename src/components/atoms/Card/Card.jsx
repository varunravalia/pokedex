import React from "react";
import "./Card.css";
function Card({ pokemonData, openModal, noDiscription = false }) {
  const { Imageurl, name, pokemonId } = pokemonData;
  return (
    <section
      key={Imageurl}
      className="card flex flex-col"
      onClick={() => openModal(pokemonData, true)}
      style={pokemonData.bg || {}}
    >
      <img className="card-image" src={Imageurl} alt={name} />
      {!noDiscription && (
        <section className="flex flex-col align-center">
          <h3 className="card-title">{name}</h3>
          <h4 className="card-Id">{pokemonId}</h4>
        </section>
      )}
    </section>
  );
}
export default Card;
