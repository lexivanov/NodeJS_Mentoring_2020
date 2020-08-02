const readline = require('readline');
const fs = require("fs");
const csv = require("csvtojson/v2");

const sourcePath = "./csv/source.csv";
const destPath = "./csv/out.txt";

fs.writeFileSync(destPath, "");

const readInterface = readline.createInterface({
    input: fs.createReadStream(sourcePath),
    console: false
});

let headers;

readInterface.on('line', line => {
    if (!headers) {
        headers = line;
        return;
    }

    csv({
        output: "json"
    }).fromString(`${headers}\n` + line.toString()).then(json => {
        const data = json[0];

        const resLineData = {
            book: data.Book,
            author: data.Author,
            price: +data.Price
        };

        fs.appendFile(destPath, JSON.stringify(resLineData) + "\n", err => { if (err) throw err; });
    });
})
