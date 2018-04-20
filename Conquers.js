const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const conquest = "https://en106.grepolis.com/data/conquers.txt";
const alliances = "https://en106.grepolis.com/data/alliances.txt";
const players = "https://en106.grepolis.com/data/players.txt";



function csvToArray (data) {
rows = data.split("\n");
return rows.map(function (row) {
return row.split(",");
	});
};

function bubbleSort(a)
{
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i][1] < a[i+1][1]) {
                var temp = a[i][1];
                a[i][1] = a[i+1][1];
                a[i+1][1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
		return a;
}


snekfetch.get(conquest).then(r => { let conquestData = csvToArray(r.text);
snekfetch.get(players).then(r => { let playerData = csvToArray(r.text);
snekfetch.get(alliances).then(r => { let allianceData = csvToArray(r.text);

var test1 = conquestData.reverse();
var data = [];
for (var i = 0; i < 6; i++) {
	data.push(test1[i]);
}

module.exports.run = async(bot, message, args) => {
  var test =  message.content;
  test = test.split(' ');


	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < playerData.length; j++) {

			if(data[i][2] === playerData[j][0]){
				data[i][2] = playerData[j][1];
				continue;
			}
			else if(data[i][3] === playerData[j][0]){
				data[i][3] = playerData[j][1];
				continue;
			}
		}
	}

	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < allianceData.length; j++) {

			if(data[i][4] === allianceData[j][0]){
				data[i][4] = allianceData[j][1];
				continue;
			}
			else if(data[i][5] === allianceData[j][0]){
				data[i][5] = allianceData[j][1];
				continue;
			}
		}
	}

	for (var i = 1; i < data.length; i++) {
		if (data[i][3] ===undefined){
			data[i][3] = "Ghost";
		}
		if (data[i][5] ===undefined){
			data[i][5] = "None";
		}
		if (data[i][4] ===undefined){
			data[i][4] = "None";
		}
		data[i][3] = data[i][3].replace(/[+]/g, " ");
		data[i][3] = data[i][3].replace(/%27/g, "'");
		data[i][4] = data[i][4].replace(/[+]/g, " ");
		data[i][4] = data[i][4].replace(/%27/g, "'");
		data[i][5] = data[i][5].replace(/([+])/g, " ");
		data[i][5] = data[i][5].replace(/%27/g, "'");
		data[i][2] = data[i][2].replace(/[+]/g, " ");
		data[i][2] = data[i][2].replace(/%27/g, "'");

		var finalA = Math.floor(Math.random() * (16777215 - 1)) + 1;

	message.channel.send({embed: {
			color: finalA,
		 fields: [{
				 name: "Info", value: "[town]" + data[i][0] + "[/town], owned by " + data[i][3] + " of alliance " + data[i][5] + "\nWas taken by " + data[i][2] + " of alliance " + data[i][4]
			 },{
				 name: "Points", value: "" + data[i][6]
			 },],
	 } });
}

}

});
});
});

module.exports.help = {
  name: "Conquests"
}
