const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { default: axios } = require("axios");
const { YOUR_API_KEY } = process.env;
const { Breed, Temperament } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//funciones que necesitare
//traer informacion de la api

const getApiInfo = async () => {
  const urlApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
  );
  const getInfoApi = await urlApi.data.map((el) => {
    const breed = {
      id: el.id,
      name: el.name,
      weight_men: el.weight.metric.split(' - ')[0],
      weight_may: el.weight.metric.split(' - ')[1],
      height_men: el.height.metric.split(' - ')[0],
      height_may: el.height.metric.split(' - ')[1] ? el.height.metric.split(' - ')[1] : el.height.metric.split(' - ')[0],
      life_span: el.life_span,
      image: el.image.url,
      temperaments: el.temperament
    };
    return breed;
  });
  // console.log(getInfoApi)
  return getInfoApi;
};
// getApiInfo()

//traer informacion de la db

const getDbInfo = async () => {
  let infoDb = await Breed.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  infoDb = infoDb.map(
    ({ id, name, weight_men, weight_may, height_men, height_may, life_span, image, temperaments }) => ({
      id,
      name,
      weight_men,
      weight_may,
      height_men,
      height_may,
      life_span,
      image,
      temperaments: temperaments.map((el) => (el.name)),
    })
    // console.log(infoDb)
  );
  return infoDb;
};

//traer informacion api + db

const getAllInfo = async () => {
  const api = await getApiInfo();
  const db = await getDbInfo();
  const all = api.concat(db);
  // console.log(all)
  return all;
};
// getAllInfo()

//RUTAS

// router.get("/dogs", async (req, res) => {
//   // Obtener un listado de las razas de perro
//   // Debe devolver solo los datos necesarios para la ruta principal
//   const listBeed = await getAllInfo();
//   res.status(200).send(listBeed);
// });

router.get("/dogs", async (req, res) => {
  // Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
  // Si no existe ninguna raza de perro mostrar un mensaje adecuado
  try {
    const { name } = req.query;
    const listBeed = await getAllInfo();

    if (name) {
      const breedName = await listBeed.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      breedName.length
        ? res.status(200).send(breedName)
        : res.status(404).send("No se encontro nombre de raza");
    } else res.status(200).send(listBeed);
  } catch (e) {
    console.log("Error en el GET /dogs");
  }
});

router.get("/dogs/:id", async (req, res) => {
  // Obtener el detalle de una raza de perro en particular
  // Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
  // Incluir los temperamentos asociados
  try {
    const { id } = req.params;
    const listBeed = await getAllInfo();
    if (id) {
      let breedId = await listBeed.filter((el) => el.id == id);
      breedId.length
        ? res.status(200).json(breedId)
        : res.status(404).send("No se encontro la raza de perro");
    }
  } catch (e) {
    console.log("Error en el GET /dogs/{id}");
  }
});

router.get("/temperament", async (req, res) => {
  // Obtener todos los temperamentos posibles
  // En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
  try {
    const apiUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
    );
    const listTemperament = await apiUrl.data.map((el) => el.temperament);
    // console.log(listTemperament);

    listTemperament.forEach(async (temp) => {
      // console.log(temp);
      if (temp) {
        let arrayTemp = temp.split(", ");
        // console.log(arrayTemp);

        arrayTemp.forEach(async (el) => {
          await Temperament.findOrCreate({
            where: {
              name: el,
            },
          });
        });
      }
    });

    let temperamentAll = await Temperament.findAll();
    // console.log(temperamentAll);
    res.status(200).send(temperamentAll);
  } catch (e) {
    console.log("Error en el GET /temperament");
  }
});

router.post("/dogs", async (req, res) => {
  // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
  // Crea una raza de perro en la base de datos
  try {
    const { name, weight_men, weight_may, height_men, height_may, life_span, createdDb, image, temperaments } =
      req.body;
    const createdBreed = await Breed.create({
      name,
      weight_men,
      weight_may,
      height_men,
      height_may,
      life_span,
      createdDb,
      image,
    });
    if (temperaments) {
      let arrayTemps = temperaments.split(", ");
      arrayTemps.forEach(async (temp) => {
        // console.log(temp)
        //no puedo utilizar un findOrCreate porque antes debeo crear el temperamento con un id respectivo
        let temperamentDb = await Temperament.findAll({
          where: {
            name: temp,
          },
        });
        // console.log(temperamentDb)
        createdBreed.addTemperament(temperamentDb);
        //aqui tengo que traer de alguna manera la informacion junta
      });
    }
    res.status(200).send("Raza de perro creado correctamente");
  } catch (e) {
    console.log("Error en el POST /dogs");
  }
});

module.exports = router;
