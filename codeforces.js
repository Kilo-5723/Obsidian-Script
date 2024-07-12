// properties: contest-id, contest-name, problem-id, problem-name, tags, lead

const fs = require('fs');

function update() {
  fs.writeFile('output.txt', content, (err) => {
    if (err) {
      console.error('Error writing to the file: ' + err);
      return;
    }
    console.log('Data has been written to the file.');
  });
}
async function update() {
  const response = await fetch("https://codeforces.com/api/problemset.problems");
  if (!response.ok)
    throw new Error(`Fetch from codeforces FAILED!`);
  const json=(await response.text())
  console.log(json);
}
async function update2() {
  const response = await fetch("https://clist.by/api/v4/problem/?resource=codeforces.com&limit=200000&username=Kilo_5723&api_key=9b497246c7f50135a36db275533cf2480b9ab9ad");
  if (!response.ok)
    throw new Error(`Fetch from clist FAILED!`);
  const json=(await response.text())
  console.log(json);
}
// https://clist.by/api/v4/problem/?limit=1000000
// console.log("hello");
update2();
// console.log("end");