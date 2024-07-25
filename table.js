const atcoder = require(__dirname + "/atcoder.js");
const codeforces = require(__dirname + "/codeforces.js");

async function add_dynamic_property(file) {
  if (file.source == "Codeforces") await codeforces.add_dynamic_property(file);
  if (file.source == "AtCoder") await atcoder.add_dynamic_property(file);
}

function to_item(dv, file) {
  if (file.source == "Codeforces") return codeforces.to_item(dv, file);
  if (file.source == "AtCoder") return atcoder.to_item(dv, file);
}

module.exports = { add_dynamic_property, to_item };