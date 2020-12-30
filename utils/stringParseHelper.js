const { isEmpty } = require("ramda");

const stringParseHelper = (text) => {
  const main = text.split("Home values in ").pop();

  const estimate = main
    .split("The typical Zestimate® for this ZIP code is ")
    .pop()
    .split(".")[0];
  const rest = main
    .split("The typical Zestimate® for this ZIP code is ")
    .shift();

  const valuedString = rest.split("This home is valued ").pop().split(" ");
  const valued = { [valuedString[1]]: valuedString[0] };

  const cutValued = rest
    .split("This home is valued")
    .shift()
    .split("Zillow predicts the home values in ")
    .pop();
  const next = cutValued
    .split(" in the next year.")
    .shift()
    .split(" will ")
    .pop()
    .split(" ");
  const pred = { [next[0]]: next[1] };

  const history = rest.split(" ");
  const past = { [history[2]]: history[3] };
  if (!next[0]) return null;
  return [pred, past];
};
module.exports = stringParseHelper;
