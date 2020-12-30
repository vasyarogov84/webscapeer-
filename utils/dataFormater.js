fs = require("fs");

const zip = require("../zipCodeShort.json");
const shortData = zip.map((el) => el.zip_code);

fs.writeFile("onlyZipcodes.json", JSON.stringify(shortData), function (err) {
  if (err) return console.log(err);
  console.log("Hello World > helloworld.txt");
});
