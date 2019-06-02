var mainSheet = "17myi-gll7b8VM9Q2N3ECbOoXUJLN2X2_a6SDR4QTV1Y";

function init() {
 Tabletop.init( { key: mainSheet,
 callback: drawTable,
 simpleSheet: false } )
}

function drawTable(sheets, tabletop) {
var sheet = sheets['Standings'],
    column_names = sheet.column_names;

var table = $("#standings");


var header = $("<thead></thead>");
$("<th scope=\"col\"></th>").text("Rank").appendTo(header);
$("<th scope=\"col\"></th>").text("Team").appendTo(header);
$("<th scope=\"col\"></th>").text("Wins").appendTo(header);
$("<th scope=\"col\"></th>").text("Points").appendTo(header);
table.append(header);

var tbody = $("<tbody></tbody>");
for(var i = 0; i < sheet.elements.length; i++) {
  var row = sheet.elements[i];
  var html_row = $("<tr></tr>");
  $("<th scope=\"row\"></th>").text((i+1).toString()).appendTo(html_row);
  for(var j = 0; j < column_names.length; j++) {
    var column_name = column_names[j];
    $("<td></td>").text(row[column_name]).appendTo(html_row);
  }
  tbody.append(html_row);
}
table.append(tbody);
var week_num = updateWeek(sheets, tabletop);
updateMatchups(week_num, sheets, tabletop);
}

function updateWeek(sheets, tabletop) {
    var sheet = sheets['Metadata'];
    var hd = $("#week-hd");
    var week_num = sheet.elements[0]['curweek'];
    hd.append("(Week " + week_num + ")");
    return week_num;
}

function updateMatchups(week_num, sheets, tabletop) {
    var sheet = sheets['Week'+week_num.toString()+'Summary'];
    var matchups = $("#matchups");
    var idx = [0,9,18];
    for (var i =0; i<idx.length;i++) {
        var j = idx[i]
        var row = sheet.elements[j];
        var card = $("<div class=\"card pad\"></div>");
        var cardrow = $("<div class=\"row\"></div>");

        var red = $("<div class=\"col-sm-5\"></div>");
        $("<h3></h3>").text(row['red']).appendTo(red);
        cardrow.append(red);

        var mid = $("<div class=\"col-sm-2\"></div>");
        $("<h4></h4>").text('vs').appendTo(mid);
        cardrow.append(mid);

        var blue = $("<div class=\"col-sm-5\"></div>");
        $("<h3 class=\"left\"></h3>").text(row['blue']).appendTo(blue);
        cardrow.append(blue);

        card.append(cardrow);
        matchups.append(card);
    }
}

window.addEventListener('DOMContentLoaded', init)
