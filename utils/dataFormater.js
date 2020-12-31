fs = require("fs");
const unwanted = ["CA", "WA", "PR", "NY", "PR"];
const zip = require("../zipCodes.json");
const shortData = zip.forEach((el) => {
  if (!unwanted.includes(el.state)) {
    return el;
  }
});

fs.writeFile("1a.json", JSON.stringify(shortData), function (err) {
  if (err) return console.log(err);
  console.log("Hello World > helloworld.txt");
});
