function to_right(str) {
  return "<span style='float:right;'>" + str + "</span>";
}
function filelink(link) {
  return "<b>" + link + "</b>"
}
const draft = "<span style = 'color:gray'>(Draft)</span>";
const todo = "<span style = 'color:red'>(Todo)</span>";
function source(link) {
  return "<font size='4'><em>" + link + "</em></font>"
}
const collection = "<span style = 'background-color:#EAB6FF;color:#7F21A6'>&nbsp;collection&nbsp;</span>";
function tag(name) {
  return "<span style = 'background-color:#7F21A6;color:#EAB6FF'>&nbsp;" + name + "&nbsp;</span>"
}
function rater(name) {
  return "<span style = 'color:#B0B0B0'>" + name + "</span>";
}
function lead(str) {
  return "<font size='3'>" + str + "</font>";
}
module.exports = { to_right, filelink, draft, todo, source, collection, tag, rater, lead };