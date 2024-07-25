const fs = require("fs");

// file is up to date
async function up_to_date(fname) {
  return new Promise((resolve, reject) => {
    fs.stat(fname, (err, stats) => {
      if (err) { resolve(false); return; } // file not exist
      resolve((Date.now() - stats.mtimeMs) / 1000 < 1); // one hour
    });
  });
}

// read a local file, reload it from url if outdated
async function read_or_update(fname, url) {
  if (await up_to_date(fname)) {
    return new Promise((resolve, reject) => {
      fs.readFile(fname, "utf8", (err, data) => {
        if (err) { console.error(err); return; }
        resolve(JSON.parse(data));
      });
    });
  } else {
    var response = await fetch(url);
    if (!response.ok) throw new Error("Fetch from " + url + " FAILED!");
    var res = await response.text();
    fs.writeFile(fname, res, err => { if (err) { console.error(err); } });
    return JSON.parse(res);
  }
}

// remove element from an array
function exist_and_remove(arr, val) {
  if (!arr) return false; // if not exist, return
  const id = arr.indexOf(val);
  if (id != -1) arr.splice(id, 1);
  return id != -1;
}

module.exports = { up_to_date, read_or_update, exist_and_remove };