//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
// const { default: axios } = require("axios");
// const { YOUR_API_KEY } = process.env;
// const { Temperament } = require("./src/db");

// Syncing all the models at once.
// let preCarga = async () => {
//   const apiUrl = await axios.get(
//     `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
//   );
//   const listTemperament = await apiUrl.data.map((el) => el.temperament);
//   // console.log(listTemperament);

//   listTemperament.forEach(async (temp) => {
//     // console.log(temp);
//     if (temp) {
//       let arrayTemp = temp.split(", ");
//       // console.log(arrayTemp);

//       arrayTemp.forEach(async (el) => {
//         await Temperament.findOrCreate({
//           where: {
//             name: el,
//           },
//         });
//       });
//     }
//   });

//   await Temperament.findAll();
// };

conn.sync({ force: false })
.then(() => {
  // await preCarga()
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
