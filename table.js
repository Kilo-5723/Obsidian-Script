const atcoder = require(__dirname + "/atcoder.js");
const codeforces = require(__dirname + "/codeforces.js");
const qoj = require(__dirname + "/qoj.js");

function get_ref(cur) {
  if (cur.source == "Codeforces") return codeforces;
  if (cur.source == "AtCoder") return atcoder;
  if (cur.source == "QOJ") return qoj;
}

async function add_dynamic_property(file) {
  let ref = get_ref(file);
  if (!ref) return;
  await ref.add_dynamic_property(file);
}

function to_item(dv, file) {
  let ref = get_ref(file);
  if (!ref) return "Unsupported Document: " + file.file.name;
  return ref.to_item(dv, file);
}

module.exports = { add_dynamic_property, to_item };