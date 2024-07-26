const tool = require(__dirname + "/tool.js")
const personal = require(__dirname + "/personal.js");
const style = require(__dirname + "/style.js");

// properties: source, contest, cid, problem, name, tags, lead -- problem

let kenkoooo;

function contest_link(cid) {
  return "https://atcoder.jp/contests/" + cid;
}
function problem_link(cid, pid) {
  return contest_link(cid) + "/tasks/" + cid + "_" + pid.toLowerCase();
}

async function init() {
  kenkoooo = (await tool.read_or_update(__dirname + "/json/atc-kenkoooo.json",
    "https://kenkoooo.com/atcoder/resources/problem-models.json"));
  // clist = (await tool.read_or_update(__dirname + "/json/atc-clist.json",
  //   "https://clist.by/api/v4/problem/?resource=atcoder.jp" +
  //   "&limit=1000000&username=" + personal.clist_account +
  //   "&api_key=" + personal.clist_api))
  //   .objects;
}

async function add_dynamic_property(file) {
  if (!kenkoooo) await init();
  tags = [...file.tags];
  if (tool.exist_and_remove(tags, "collection")) file.collection = true;
  if (tool.exist_and_remove(tags, "todo")) file.todo = true;
  if (tool.exist_and_remove(tags, "draft")) file.draft = true;
  const pid = file.cid + "_" + file.problem.toLowerCase();
  if (kenkoooo[pid]) file.rating = Math.max(kenkoooo[pid].difficulty, 0);
  // for (i in clist) {
  //   if (clist[i].url == "https://atcoder.jp/contests/" + file.cid + "/tasks/" + pid) {
  //     file["rating-clist"] = clist[i].rating; break;
  //   }
  // }
}

function rating_style(val) {
  if (val < 400) return "color:gray"
  if (val < 800) return "color:brown"
  if (val < 1200) return "color:green"
  if (val < 1600) return "color:cyan"
  if (val < 2000) return "color:blue"
  if (val < 2400) return "color:yellow"
  if (val < 2800) return "color:orange"
  if (val < 3200) return "color:red"
  if (val < 3600) return "background-color:#DC7633;color:black"
  if (val < 4000) return "background-color:#BDC3C7;color:black"
  return "background-color:#FFFF00;color:black"
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
  { "contest-id": "abc363", "problem-id": 'A', tags: ["a", "todo", "draft", "b"] }, // negative rating
  { "contest-id": "abc363", "problem-id": 'G', tags: ["c", "todo", "d"] }, // positive rating
  { "contest-id": "abc363", "problem-id": 'H', tags: ["c", "d"] }, // not exist
]

module.exports = { contest_link, problem_link, add_dynamic_property, to_item };