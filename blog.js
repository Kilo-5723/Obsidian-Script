const atcoder = require(__dirname + "/atcoder.js");
const codeforces = require(__dirname + "/codeforces.js");

function get_ref(cur) {
  if (cur.source == "Codeforces") return codeforces;
  else if (cur.source == "AtCoder") return atcoder;
}
function contest(ref, name, cid) {
  return "[" + name + "](" + ref.contest_link(cid) + ")";
}
function problem(ref, cid, pid) {
  return "[Problem " + pid + "](" + ref.problem_link(cid, pid) + ")";
}

function problem_header(dv) {
  let cur = dv.current(), ref = get_ref(cur);
  if (!ref) return;
  dv.header(1, cur.name);
  dv.header(2, problem(ref, cur.cid, cur.problem) + ", " + contest(ref, cur.contest, cur.cid));
}

function collect_header(dv) {
  let cur = dv.current(), ref = get_ref(cur);
  if (!ref) return;
  dv.header(1, cur.name);
  dv.header(2, contest(ref, cur.contest, cur.cid));
}

function problem_single(dv, pid) {
  let cur = dv.current(), ref = get_ref(cur);
  if (!ref) return;
  dv.header(3, problem(ref, cur.cid, pid));
}

function other_single(dv, cid, pid) {
  let cur = dv.current(), ref = get_ref(cur);
  if (!ref) return;
  dv.header(3, problem(ref, cid, pid));
}

module.exports = { problem_header, collect_header, problem_single, other_single };