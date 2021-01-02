const axios = require("axios");
const fs = require("fs");

const axiosGraphql = async (variables) => {
  const result = await axios
    .post("http://localhost:4000/", {
      query: `mutation addStats($input: ZipCodeAnalytics) {
  addStats(input: $input) {
    success
    message
  }
}`,
      variables,
    })
    .then(({ data }) => {
      if (data.data.addStats.success) {
        fs.writeFile("../result.json", JSON.stringify([]), (err) => {
          if (err) {
            console.log(err.message);
          }
          return data.data.addStats;
        });
      }
      return data.data.addStats;
    })
    .catch((err) => console.log(err.message));
  return result;
};

module.exports = axiosGraphql;
