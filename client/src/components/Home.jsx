import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds } from "../action";
import { Link } from "react-router-dom";
import { Card } from "./Card";

export function Home() {
  const dispatch = useDispatch();
  const allBreeds = useSelector((state) => state.breeds);
  const [currentPage, setCurrentPage] = useState(1);
  const [breedPage, setBreedPage] = useState(6);
  const indexLastBreed = currentPage * breedPage;
  const indexFirstBreed =  indexLastBreed - breedPage;
  const currentBreed = allBreeds.slice(indexFirstBreed, indexLastBreed)

  useEffect(() => {
    dispatch(getBreeds());
  }, [dispatch]);

  const handleClickReturn = (e) => {
    e.preventDefault();
    dispatch(getBreeds());
  };

  return (
    <div>
      <Link to="/dogs">Crear raza</Link>
      <h1>Razas</h1>
      <button onClick={(e) => handleClickReturn(e)}>
        Volver a cargar todas las razas
      </button>
      <div>
        <select>
          <option value="asc">Ascendente</option>
          <option value="des">Descendente</option>
        </select>
        {/* temperamento value='el mismo valor de Api'* ---> usa el SELECT MULTIPLE PARA RENDEIDZAR MAS DE UN BOTON*/}
        <select>
          {
          // allBreeds &&
          //   allBreeds.map(breed => {
          //     <option value={breed.temperaments}> </option>
          //   })
          console.log(allBreeds)
          }
        </select>

        <select>
          <option value="all">Todos</option>
          <option value="">Creados</option>
          <option value="">Existentes</option>
        </select>

        {allBreeds &&
          allBreeds.map((el) => {
            return (
              <div key={el.id}>
                <Link to={"/home/" + el.id}>
                  <Card
                    name={el.name}
                    image={el.image}
                    temperaments={Array.isArray(el.temperaments) ? el.temperaments.join(', ') : el.temperaments}
                    weight_men={el.weight_men}
                    weight_may={el.weight_may}
                    height_men={el.height_men}
                    height_may={el.height_may}
                  />
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
