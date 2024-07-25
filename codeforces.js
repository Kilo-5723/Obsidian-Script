const tool = require(__dirname + "/tool.js");
const personal = require(__dirname + "/personal.js");
const style = require(__dirname + "/style.js");

// properties: source, contest, cid, problem, name, tags, lead -- problem

let official, clist;

function contest_link(cid) {
  return "https://codeforces.com/contest/" + cid;
}
function problem_link(cid, pid) {
  return contest_link(cid) + "/problem/" + pid;
}

const init_promise = (async function init() {
  official = (await tool.read_or_update(
    __dirname + "/json/cf-official.json",
    "https://codeforces.com/api/problemset.problems"))
    .result.problems;
  // clist = (await tool.read_or_update(
  //   __dirname + "/json/cf-clist.json",
  //   "https://clist.by:443/api/v4/json/problem/?" +
  //   "limit=10000000&resource=codeforces.com&username=" + personal.clist_account +
  //   "&api_key=" + personal.clist_api))
  //   .objects;
})();

async function add_dynamic_property(file) {
  await init_promise;
  tags = [...file.tags];
  if (tool.exist_and_remove(tags, "collection")) file.collection = true;
  if (tool.exist_and_remove(tags, "todo")) file.todo = true;
  if (tool.exist_and_remove(tags, "draft")) file.draft = true;
  for (i in official)
    if (official[i].contestId == file.cid
      && official[i].index == file.problem) {
      file.rating = official[i].rating; break;
    }
  // for (i in clist) {
  //   if (clist[i].url == "https://codeforces.com/contest/" +
  //     file["contest-id"] + "/problem/" + file["problem-id"]) {
  //     file["rating-clist"] = clist[i].rating; break;
  //   }
  // }
}

function rating_style(val) {
  if (val < 1200) return "color:gray"
  if (val < 1400) return "color:green"
  if (val < 1600) return "color:cyan"
  if (val < 1900) return "color:blue"
  if (val < 2100) return "color:violet"
  if (val < 2400) return "color:orange"
  if (val < 3000) return "color:red"
  return "background-color:red;color:black"
}

function rating(val) {
  return "<span style = '" + rating_style(val) + "'>&nbsp;<b>" + val + "</b>&nbsp;</span>"
}

function to_item(dv, file) {
  var item = "";
  var left = "", right = "";
  const cid = file.cid, pid = file.problem;

  tags = [...file.tags];
  if (tool.exist_and_remove(tags, "collection")) file.collection = true;
  if (tool.exist_and_remove(tags, "todo")) file.todo = true;
  if (tool.exist_and_remove(tags, "draft")) file.draft = true;

  // first line: File link, (todo), (draft), (problem link), contest link
  left += style.filelink(dv.fileLink(file.file.path, false, file.name));
  if (file.draft) left += " " + style.draft;
  if (file.todo) left += " " + style.todo;

  var source = "";
  if (!file.collection)
    source += "[Problem " + pid + "](" + problem_link(cid, pid) + "), ";
  source += "[" + file.contest + "](" + contest_link(cid) + ")";
  right += style.source(source);

  if (right) left += style.to_right(right);
  if (left) item += left + "<br>";

  // second line: tags, CF rating, Clist rating
  left = right = "";

  if (file.collection)
    left += "&ensp;" + style.collection;
  for (let i in tags)
    left += "&ensp;" + style.tag(tags[i]);

  if (file.rating)
    right += style.rater("Rating") + (file.collection ? " ~" : " ") + rating(file.rating) + "&ensp;";
  // if (file["rating-clist"])
  //   right += style.rater("Clist") + (file.collection ? " ~" : " ") + rating(file["rating-clist"]) + "&ensp;";

  if (right) left += style.to_right(right);
  if (left) item += left + "<br>";

  // third line: lead
  left = right = "";

  if (file.lead) left += style.lead(file.lead);

  if (right) left += style.to_right(right);
  if (left) item += left + "<br>";

  return item;
}

problems = [
  { "contest-id": "1994", "problem-id": 'H', tags: ["a", "todo", "draft", "b"] }, // no rating currently
  { "contest-id": "1989", "problem-id": 'F', tags: ["c", "todo", "d"] }, // 3000
  { "contest-id": "1984", "problem-id": 'B' }, // 1100
  // { "contest-id": 1982, "problem-id": 'H' }, // problem not exist
  { "contest-id": "1955", "problem-id": 'D', tags: ["c", "e", "d"] }, // old problem
]

async function test() {
  for (item in problems) await add_dynamic_property(problems[item]);
  console.log(problems);
  // for (item in problems) console.log(await rating_clist(problems[item]));
}

module.exports = { contest_link, problem_link, add_dynamic_property, to_item };