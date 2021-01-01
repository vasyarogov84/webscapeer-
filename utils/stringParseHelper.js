const { pathOr } = require("ramda");
const stringParseHelper = (text) => {
  const main = text.split("Home values in ").pop() || "";

  const estimate =
    +main
      .split("The typical Zestimate® for this ZIP code is ")
      .pop()
      .split(".")[0]
      .split("$")
      .pop()
      .split(",")
      .join("") || "";
  const rest =
    main.split("The typical Zestimate® for this ZIP code is ").shift() || "";

  const valuedString = rest.split("This home is valued ").pop().split(" ");
  const valueStringClean = +pathOr("", [0], valuedString)
    .split("%")
    .shift()
    .trim();
  const value = { [valuedString[1]]: valueStringClean };

  const cutValued =
    rest
      .split("This home is valued")
      .shift()
      .split("Zillow predicts the home values in ")
      .pop() || "";
  const next =
    cutValued
      .split(" in the next year.")
      .shift()
      .split(" will ")
      .pop()
      .split(" ") || "";
  const f12Clean = +pathOr("", [1], next).split("%").shift().trim();
  const f12 = { [next[0]]: f12Clean };

  const p12Raw = rest.split(" ") || "";
  const p12Clean = +pathOr("", [3], p12Raw).split("%").shift().trim();
  const p12 = { [p12Raw[2]]: p12Clean };
  if (!next[0]) return null;
  return { zip: estimate, val: value, p12, f12 };
};
module.exports = stringParseHelper;
