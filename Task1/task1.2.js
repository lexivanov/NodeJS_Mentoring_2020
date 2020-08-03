const fs = require("fs");
const csv = require("csvtojson/v2");
const { pipeline } = require('stream');

const sourcePath = "./csv/source.csv";
const destPath = "./csv/out.txt";

fs.writeFileSync(destPath, "");

const csvToJsonOptions = {
    output: 'json',
    noheader: false,
    delimiter: [","],
    colParser: {
        Book: "string",
        Author: "string",
        Amount: "omit",
        Price: v => +v,
    }
}

const readStream = fs.createReadStream(sourcePath);
const writeStream = fs.createWriteStream(destPath);

pipeline(
    readStream,
    csv(csvToJsonOptions),
    writeStream,
    err => err && console.log(err)
);

