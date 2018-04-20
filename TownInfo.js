const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const town = "https://en106.grepolis.com/data/towns.txt";
const players = "https://en106.grepolis.com/data/players.txt";
const alliance = "https://en106.grepolis.com/data/alliances.txt";

function csvToArray (data) {
rows = data.split("\n");
return rows.map(function (row) {
return row.split(",");
	});
};


snekfetch.get(alliance).then(r => { let allianceData = csvToArray(r.text);
snekfetch.get(players).then(r => { let playerData = csvToArray(r.text);
snekfetch.get(town).then(r => { let townData = csvToArray(r.text);


module.exports.run = async(bot, message, args) => {
  var test =  message.content;
  function getSecondPart(str) {
  return str.split(' ')[1];
  }
  test = getSecondPart(test);

  test = test.split('[town]')[1];
  test = test.split('[/town]')[0];

  var TownInfo = [];

  for (var i = 0; i < townData.length; i++) {
    if (test === townData[i][0]){
      TownInfo.push(townData[i]);
      break;
    }
  }

  for (var i = 0; i < playerData.length; i++) {
    if (TownInfo[0][1] === playerData[i][0]){
      TownInfo.push(playerData[i]);
      break;
    }
  }


  for (var i = 0; i < allianceData.length; i++) {
    if (TownInfo[1][2] === allianceData[i][0]){
      TownInfo.push(allianceData[i]);
      break;
    }
  }

	if (TownInfo[1] == ''){
		TownInfo[1] = ["Ghost City", "Ghost City"];
	}
	if (TownInfo[2] == null || TownInfo[2] == ''){
		TownInfo[2] = ["No Alliance", "No Alliance"];
	}

	console.log(TownInfo);
  TownInfo[1][1] = TownInfo[1][1].replace(/[+]/g, " ");
  TownInfo[1][1] = TownInfo[1][1].replace(/%27/g, "'");
  TownInfo[2][1] = TownInfo[2][1].replace(/[+]/g, " ");
  TownInfo[2][1] = TownInfo[2][1].replace(/%27/g, "'");
  TownInfo[0][2] = TownInfo[0][2].replace(/[+]/g, " ");
  TownInfo[0][2] = TownInfo[0][2].replace(/%27/g, "'");

	// TownInfo[1][1] == player
	// TownInfo[2][1] == alliance
	if (TownInfo[1][1] === "Ghost City"){
		message.channel.send({embed: {
	      color: 3447003,
	    title: TownInfo[0][2],
	    description: "\n[town]" + TownInfo[0][0] + "[/town]",
	     fields: [{
	       name: "Points", value: "" + TownInfo[0][6]
	     }, {
	         name: "Player", value: "Ghost Town"
	       }, ],
	   } });
	}
	else if (TownInfo[2][1] === "No Alliance"){
		var finalA = Math.floor(Math.random() * (100000 - 1)) + 1;

		message.channel.send({embed: {
	      color: finalA,
	    title: TownInfo[0][2],
	    description: "\n[town]" + TownInfo[0][0] + "[/town]",
	     fields: [{
	       name: "Points", value: "" + TownInfo[0][6]
	     }, {
	         name: "Player", value: "" + TownInfo[1][1]
	       },{
	         name: "BBCode", value: "[player]" + TownInfo[1][1] + "[/player]"
	       },  ],
	   } });
	}
	else{
		var finalA = Math.floor(Math.random() * (16777215 - 1)) + 1;

  message.channel.send({embed: {
      color: finalA,
    title: TownInfo[0][2],
    description: "\n[town]" + TownInfo[0][0] + "[/town]",
     fields: [{
       name: "Points", value: "" + TownInfo[0][6]
     }, {
         name: "Player and Alliance", value: "" + TownInfo[1][1] + " from the alliance " + TownInfo[2][1]
       },{
         name: "BBCodes", value: "[player]" + TownInfo[1][1] + "[/player]  -  [ally]" + TownInfo[2][1] + "[/ally]"
       },  ],
   } });
 }
}


 });});});

module.exports.help = {
  name: "TownInfo"
}
