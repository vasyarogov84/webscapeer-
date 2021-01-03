const fs = require("fs");
const zip = require("../data/zipCodes.json");
const sortedPop = require("../data/zipCodesSortedByPopulation.json");
const veryExpensiveStates = [
  "CA",
  "WA",
  "PR",
  "NY",
  "PR",
  "AK",
  "HI",
  "CO",
  "MA",
  "NJ",
  "MD",
  "VA",
  "OR",
];
const expensiveStates = [
  "ME",
  "VT",
  "NH",
  "RI",
  "CT",
  "DE",
  "UT",
  "NV",
  "MN",
  "MT",
];

const shortData = zip.filter((el) => {
  if (
    !(
      expensiveStates.includes(el.state) ||
      veryExpensiveStates.includes(el.state)
    ) &&
    sortedPop.includes(el.zip_code)
  ) {
    return el;
  }
});
console.log(zip.length);
console.log(zip.length);
console.log(shortData.length);

const rmLatLong = shortData.map(({ zip_code, city, state, county }) => {
  return {
    zip_code,
    city,
    state,
  };
});

fs.writeFile("scrapeData.json", JSON.stringify(rmLatLong), function (err) {
  if (err) return console.log(err);
  console.log("Hello World > helloworld.txt");
});
