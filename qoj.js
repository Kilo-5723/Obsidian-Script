const tool = require(__dirname + "/tool.js");
const personal = require(__dirname + "/personal.js");
const style = require(__dirname + "/style.js");

// properties: source, contest, cid, problem, pid, name, tags, lead -- problem

let official, clist;

function contest_link(cid) {
  return "https://qoj.ac/contest/1708/" + cid;
}
function problem_link(cid, pid) {
  return contest_link(cid) + "/problem/" + pid;
}

const init_promise = (async function init() {
})();

async function add_dynamic_property(file) {
  await init_promise;
  if (tool.exist_and_remove(file.tags, "collection")) file.collection = true;
  if (tool.exist_and_remove(file.tags, "todo")) file.todo = true;
  if (tool.exist_and_remove(file.tags, "draft")) file.draft = true;
}

function to_item(dv, file) {
  var item = "";
  var left = "", right = "";
  const cid = file.cid, pid = file.problem;
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

  // second line: tags
  left = right = "";

  if (file.collection)
    left += "&ensp;" + style.collection;
  for (let i in file.tags)
    left += "&ensp;" + style.tag(file.tags[i]);

  if (right) left += style.to_right(right);
  if (left) item += left + "<br>";

  // third line: lead
  left = right = "";

  if (file.lead) left += style.lead(file.lead);

  if (right) left += style.to_right(right);
  if (left) item += left + "<br>";

  return item;
}

module.exports = { contest_link, problem_link, add_dynamic_property, to_item };