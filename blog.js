const atcoder = require(__dirname + "/atcoder.js");
const codeforces = require(__dirname + "/codeforces.js");
const qoj = require(__dirname + "/qoj.js");

function get_ref(cur) {
  if (cur.source == "Codeforces") return codeforces;
  if (cur.source == "AtCoder") return atcoder;
  if (cur.source == "QOJ") return qoj;
}
function contest(ref, name, cid) {
  return "[" + name + "](" + ref.contest_link(cid) + ")";
}
function problem(ref, cid, pid) {
  return "[Problem " + pid + "](" + ref.problem_link(cid, pid) + ")";
}
function problem_diy(ref, name, cid, pid) {
  return "[Problem " + name + "](" + ref.problem_link(cid, pid) + ")";
}

// codeforces, atcoder
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
function other_single(dv, name, cid, pid) {
  let cur = dv.current(), ref = get_ref(cur);
  if (!ref) return;
  dv.header(3, problem_diy(ref, name, cid, pid));
}

// qoj
function problem_header2(dv) {
  let cur = dv.current(), ref = get_ref(cur);
  if (!ref) return;
  dv.header(1, cur.name);
  dv.header(2, problem_diy(ref, cur.problem, cur.cid, cur.pid) + ", " + contest(ref, cur.contest, cur.cid));
}

module.exports = { problem_header, collect_header, problem_single, other_single, problem_header2 };