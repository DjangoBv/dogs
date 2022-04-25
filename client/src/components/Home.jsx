import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds } from "../action";
import { Link } from "react-router-dom";
import { Card } from "./Card";

export function Home() {
  const dispatch = useDispatch();
  const allBreeds = useSelector((state) => state.breeds);

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
        {/* temperamento value='el mismo valor de Api'*/}
        <select></select>

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
                    temperament={el.temperament}
                    weight={el.weight}
                  />
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
