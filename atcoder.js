const tool = require(__dirname + "/tool.js")
const personal = require(__dirname + "/personal.js");

// properties: contest-name, contest-id, problem-name, problem-id, tags, lead
// or: contest-name, contest1-id, contest2-id,
//     problem-name, problem1-id, problem2-id, tags, lead

let kenkoooo, clist;

const init_promise = (async function init() {
  kenkoooo = (await tool.read_or_update(__dirname + "/json/atc-kenkoooo.json",
    "https://kenkoooo.com/atcoder/resources/problem-models.json"));
  clist = (await tool.read_or_update(__dirname + "/json/atc-clist.json",
    "https://clist.by/api/v4/problem/?resource=atcoder.jp" +
    "&limit=1000000&username=" + personal.clist_account +
    "&api_key=" + personal.clist_api))
    .objects;
})();

async function add_dynamic_property(file) {
  await init_promise;
  if (tool.exist_and_remove(file.tags, "collection")) file.collection = true;
  if (tool.exist_and_remove(file.tags, "todo")) file.todo = true;
  if (tool.exist_and_remove(file.tags, "draft")) file.draft = true;
  const pid = file["contest-id"] + "_" + file["problem-id"].toLowerCase();
  if (kenkoooo[pid]) file["rating-kenkoooo"] = Math.max(kenkoooo[pid].difficulty, 0);
  for (i in clist) {
    if (clist[i].url == "https://atcoder.jp/contests/" + file["contest-id"] + "/tasks/" + pid) {
      file["rating-clist"] = clist[i].rating; break;
    }
  }
}

function rating_style(file) {
  if (score < 400) return "color:gray"
  if (score < 800) return "color:brown"
  if (score < 1200) return "color:green"
  if (score < 1600) return "color:cyan"
  if (score < 2000) return "color:blue"
  if (score < 2400) return "color:yellow"
  if (score < 2800) return "color:orange"
  if (score < 3200) return "color:red"
  if (score < 3600) return "background-color:#DC7633;color:black"
  if (score < 4000) return "background-color:#BDC3C7;color:black"
  return "background-color:#FFFF00;color:black"
}

problems = [
  { "contest-id": "abc363", "problem-id": 'A', tags: ["a", "todo", "draft", "b"] }, // negative rating
  { "contest-id": "abc363", "problem-id": 'G', tags: ["c", "todo", "d"] }, // positive rating
  { "contest-id": "abc363", "problem-id": 'H', tags: ["c", "d"] }, // not exist
]

module.exports = { add_dynamic_property, rating_style };