import React from 'react'

export function Card({image, name, temperaments, weight_men, weight_may, height_men, height_may}) {
  // console.log(temperaments)
  return (
    <div>
      <h3>{name}</h3>
      <h5>Temperamentos: {Array.isArray(temperaments) ? temperaments.join(', ') : temperaments}</h5>
      <h5>Peso menor: {weight_men}</h5>
      <h5>Peso mayor: {weight_may}</h5>
      <h5>Altura menor: {height_men}</h5>
      <h5>Altura mayor: {height_may}</h5>
      <img src={image} alt="imagen no encontrada" width="200px" height="250px" />
    </div>
  )
}