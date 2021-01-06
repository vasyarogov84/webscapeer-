const axios = require("axios");
const fs = require("fs");

const axiosGraphql = async (variables, len, i) => {
console.log("🚀 ~ file: axiosGraphql.js ~ line 5 ~ axiosGraphql ~ variables", variables)
  const result = await axios
    .post("http://localhost:4000/", {
      query: `mutation createStats($input: createStatsInput!) {
                createStats(input: $input) {
                  success
                  message
                }
            }`,
      variables: { input: variables },
    })
    .then(({ data }) => {
      console.log(data.data.createStats.success);
      if (data.data.createStats.success && len === i + 1) {
        fs.writeFile("../result.json", JSON.stringify([]), (err) => {
          if (err) {
            console.log(err.message);
          }
          return data.data.createStats;
        });
      }
      return data.data.createStats;
    })
    .catch((err) => console.log(err.message));
  return result;
};

module.exports = axiosGraphql;
