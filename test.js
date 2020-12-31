const data = require("./result.json");
const { keys } = require("ramda");

console.log(data.length);

const copyData = [...data];
const sortMyData = copyData.sort((a,b) => {
   
    console.log("a", a[keys(a)][1])
    const n1 = +a[keys(a)][1].split("%").shift();
    const n2 = +b[keys(b)][1].split("%").shift();

    return n2 - n1;
})

console.log(sortMyData);