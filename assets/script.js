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

function readMatchupDataFromRow(data, idx, team) {
    var teamDict = {}
    teamDict['name'] = data[idx][team];
    teamDict['namePts'] = data[idx][team+'pts'];
    teamDict['top'] = data[idx+1][team];
    teamDict['topPts'] = data[idx+1][team+'pts'];
    teamDict['jg'] = data[idx+2][team];
    teamDict['jgPts'] = data[idx+2][team+'pts'];
    teamDict['mid'] = data[idx+3][team];
    teamDict['midPts'] = data[idx+3][team+'pts'];
    teamDict['adc'] = data[idx+4][team];
    teamDict['adcPts'] = data[idx+4][team+'pts'];
    teamDict['sup'] = data[idx+5][team];
    teamDict['supPts'] = data[idx+5][team+'pts'];
    teamDict['flex'] = data[idx+6][team];
    teamDict['flexPts'] = data[idx+6][team+'pts'];
    teamDict['team'] = data[idx+7][team];
    teamDict['teamPts'] = data[idx+7][team+'pts'];
    return teamDict
}

function updateMatchups(week_num, sheets, tabletop) {
    var sheet = sheets['Week'+week_num.toString()+'Summary'];
    var matchups = $("#matchups");
    var idx = [0,9,18];
    var data = sheet.all();
    for (var i =0; i<idx.length;i++) {
        var j = idx[i]
        var redData = readMatchupDataFromRow(data, j, 'red')
        var blueData = readMatchupDataFromRow(data, j, 'blue')

        var card = $("<div class=\"card\"></div>");

        var cardHeader=$("<div class=\"card-header\" data-toggle=\"collapse\" href=\"#match" + i.toString() + "\"></div>");

        var cardHeaderRow = $("<div class=\"row\"></div>");
        var redHeader = $("<div class=\"col-md-3\"></div>");
        $("<h3></h3>").text(redData['name']).appendTo(redHeader);
        cardHeaderRow.append(redHeader);

        var redPtsHeader = $("<div class=\"col-md-2\"></div>");
        $("<h3 class=\"left\"></h3>").text(redData['namePts']).appendTo(redPtsHeader);
        cardHeaderRow.append(redPtsHeader);

        var mid = $("<div class=\"col-sm-2\"></div>");
        $("<h4 style=\"text-align:center\"></h4>").text('vs').appendTo(mid);
        cardHeaderRow.append(mid);

        var blueHeader = $("<div class=\"col-md-3\"></div>");
        $("<h3></h3>").text(blueData['name']).appendTo(blueHeader);
        cardHeaderRow.append(blueHeader);

        var bluePtsHeader = $("<div class=\"col-md-2\"></div>");
        $("<h3 class=\"left\"></h3>").text(blueData['namePts']).appendTo(bluePtsHeader);
        cardHeaderRow.append(bluePtsHeader);
        cardHeader.append(cardHeaderRow);
        card.append(cardHeader);

        if (i == 0) {
            var cardrow = $("<div class=\"row collapse pad show\" id=\"match" + i.toString() +"\"></div>");
        } else {
            var cardrow = $("<div class=\"row collapse pad \" id=\"match" + i.toString() +"\"></div>");
        }


        var red = $("<div class=\"col-md-3\"></div>");
        $("<p></p>").text(redData['top']).appendTo(red);
        $("<p></p>").text(redData['jg']).appendTo(red);
        $("<p></p>").text(redData['mid']).appendTo(red);
        $("<p></p>").text(redData['adc']).appendTo(red);
        $("<p></p>").text(redData['sup']).appendTo(red);
        $("<p></p>").text(redData['flex']).appendTo(red);
        $("<p></p>").text(redData['team']).appendTo(red);
        cardrow.append(red);

        var redPts = $("<div class=\"col-md-2\"></div>");
        $("<p class=\"left\"></p>").text(redData['topPts']).appendTo(redPts);
        $("<p class=\"left\"></p>").text(redData['jgPts']).appendTo(redPts);
        $("<p class=\"left\"></p>").text(redData['midPts']).appendTo(redPts);
        $("<p class=\"left\"></p>").text(redData['adcPts']).appendTo(redPts);
        $("<p class=\"left\"></p>").text(redData['supPts']).appendTo(redPts);
        $("<p class=\"left\"></p>").text(redData['flexPts']).appendTo(redPts);
        $("<p class=\"left\"></p>").text(redData['teamPts']).appendTo(redPts);
        cardrow.append(redPts);

        var mid = $("<div class=\"col-md-2\"></div>");
        cardrow.append(mid);

        var blue = $("<div class=\"col-md-3\"></div>");
        $("<p></p>").text(blueData['top']).appendTo(blue);
        $("<p></p>").text(blueData['jg']).appendTo(blue);
        $("<p></p>").text(blueData['mid']).appendTo(blue);
        $("<p></p>").text(blueData['adc']).appendTo(blue);
        $("<p></p>").text(blueData['sup']).appendTo(blue);
        $("<p></p>").text(blueData['flex']).appendTo(blue);
        $("<p></p>").text(blueData['team']).appendTo(blue);
        cardrow.append(blue);

        var bluePts = $("<div class=\"col-md-2\"></div>");
        $("<p class=\"left\"></p>").text(blueData['topPts']).appendTo(bluePts);
        $("<p class=\"left\"></p>").text(blueData['jgPts']).appendTo(bluePts);
        $("<p class=\"left\"></p>").text(blueData['midPts']).appendTo(bluePts);
        $("<p class=\"left\"></p>").text(blueData['adcPts']).appendTo(bluePts);
        $("<p class=\"left\"></p>").text(blueData['supPts']).appendTo(bluePts);
        $("<p class=\"left\"></p>").text(blueData['flexPts']).appendTo(bluePts);
        $("<p class=\"left\"></p>").text(blueData['teamPts']).appendTo(bluePts);
        cardrow.append(bluePts);

        card.append(cardrow);
        matchups.append(card);
    }
}

window.addEventListener('DOMContentLoaded', init)
