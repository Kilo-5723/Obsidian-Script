const atcoder = require(__dirname + "atcoder.js");
const codeforces = require(__dirname + "codeforces.js");

async function add_dynamic_property(file) {
  if (file.source == "Codeforces") await codeforces.add_dynamic_property(file);
  if (file.source == "AtCoder") await atcoder.add_dynamic_property(file);
}
const a = [];
var list = dv.pages('"Solution"').values.filter(a => { return a[`dg-publish`] })
  .sort((a, b) => {
    var pa = a.problem ? a.problem : "A";
    var pb = b.problem ? b.problem : "A";
    return (pa > pb) - (pa < pb)
  })
  .sort((a, b) => { return (a.contest > b.contest) - (a.contest < b.contest) })
  .sort((a, b) => { return (a.source > b.source) - (a.source < b.source) })
  .sort((a, b) => {
    var pa = 0, pb = 0;
    if (a.tags.includes("draft")) pa++;
    if (a.tags.includes("todo")) pa += 2;
    if (b.tags.includes("draft")) pb++;
    if (b.tags.includes("todo")) pb += 2;
    return (pa > pb) - (pa < pb)
  });
function rating_style(src, score) {
  if (src == "Codeforces") return codeforces.rating_style(score);
  if (src == "AtCoder") return atcoder.rating_style(score);
}
var last = ""
for (let i in list) {
  // if (last && list[i].contest != last) a.push([""]);
  last = list[i].contest
  var item = "";
  var line = "";

  var link = "<b>" + dv.fileLink(list[i].file.path, false, list[i].name) + "</b>";
  if (list[i].tags && list[i].tags.includes("draft")) link += " <span style = 'color:gray'>(Draft)</span>"
  if (list[i].tags && list[i].tags.includes("todo")) link += " <span style = 'color:red'>(TODO)</span>"
  var source = (list[i].problem ? list[i].problem + ", " : "") + list[i].contest;
  line = "&nbsp;" + link + "<font size='4'><span style='float:right;'><em>" + source + "</em></span></font>"
  item += item + line + "<br>";

  line = "";
  if (list[i].tags)
    for (let j in list[i].tags) if (list[i].tags[j] != "draft" && list[i].tags[j] != "todo") {
      line += "&ensp;";
      // line += "<span style = 'color:#cc99ff'>" + list[i].tags[j] + "</span>";
      line += "<span style = 'background-color:#7F21A6;color:#EAB6FF'>&nbsp;" + list[i].tags[j] + "&nbsp;</span>";
    }
  var right = "";
  if (list[i].cf) {
    right += "<span style = 'color:#B0B0B0'>CF</span> <span style = '" + rating_style(list[i].source, list[i].cf) + "'>&nbsp;<b>" + list[i].cf + "</b>&nbsp;</span>"
    if (list[i]["cf-max"]) right += "<span style = 'color:#B0B0B0'>~</span><span style = '" + rating_style(list[i].source, list[i]["cf-max"]) + "'>&nbsp;<b>" + list[i]["cf-max"] + "</b>&nbsp;</span>"
    right += "&ensp;"
  }
  if (list[i].clist) {
    right += "<span style = 'color:#B0B0B0'>Clist</span> <span style = '" + rating_style(list[i].source, list[i].clist) + "'>&nbsp;<b>" + list[i].clist + "</b>&nbsp;</span>"
    if (list[i]["clist-max"]) right += "<span style = 'color:#B0B0B0'>~</span><span style = '" + rating_style(list[i].source, list[i]["clist-max"]) + "'>&nbsp;<b>" + list[i]["clist-max"] + "</b>&nbsp;</span>"
    right += "&ensp;"
  }
  if (right) line += "<span style='float:right;'>" + right + "</span>"
  if (line) item += line + "<br>"

  line = "";
  if (list[i].lead) line += "&nbsp;<font size='3'>" + list[i].lead + "</font>";
  if (line) item += line + "<br>";
  a.push([item])
}
dv.table([], a);