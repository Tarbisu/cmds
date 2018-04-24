const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const fs = require("fs");
const Data = require("./Data.js");
const players = "https://en106.grepolis.com/data/players.txt";
const alliance = "https://en106.grepolis.com/data/alliances.txt";
const alliancesFight = "https://en106.grepolis.com/data/alliance_kills_all.txt";
const alliancesDef = "https://en106.grepolis.com/data/alliance_kills_def.txt";
const alliancesAtt = "https://en106.grepolis.com/data/alliance_kills_att.txt";
const playersFight = "https://en106.grepolis.com/data/player_kills_all.txt";
const playersDef = "https://en106.grepolis.com/data/player_kills_def.txt";
const playersAtt = "https://en106.grepolis.com/data/player_kills_att.txt";

const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const tableSource = new EnmapLevel({name: "allianceDataTable"});
const allianceDataTable = new Enmap({provider: tableSource});

function csvToArray (data) {
rows = data.split("\n");
return rows.map(function (row) {
return row.split(",");
	});
};


snekfetch.get(players).then(r => { let playerData = csvToArray(r.text);
snekfetch.get(alliance).then(r => { let allianceData = csvToArray(r.text);
snekfetch.get(alliancesFight).then(t => { let allianceFightData = csvToArray(t.text);
snekfetch.get(alliancesDef).then(t => { let allianceDefData = csvToArray(t.text);
snekfetch.get(alliancesAtt).then(t => { let allianceAttData = csvToArray(t.text);
snekfetch.get(playersFight).then(t => { let playerFightData = csvToArray(t.text);
snekfetch.get(playersDef).then(t => { let playerDefData = csvToArray(t.text);
snekfetch.get(playersAtt).then(t => { let playerAttData = csvToArray(t.text);


module.exports.run = async(bot, message, args) => {
  var test =  message.content;
  test = test.split(' ');


	if (test.length < 3) {
		message.channel.send("Specify the name");
	}
	var fullAllianceData = [];
	if (test[1] == "Alliance"){
		for (var i = 0; i < allianceData.length; i++) {
			if (test[2] === allianceData[i][1]) {
				fullAllianceData.push(allianceData[i]);
				break;
			}
		}
		for (var i = 0; i < allianceFightData.length; i++) {
			if (fullAllianceData[0][0] === allianceFightData[i][1]){
				fullAllianceData.push(allianceFightData[i]);
			}
		}
		for (var i = 0; i < allianceAttData.length; i++) {
			if (fullAllianceData[0][0] === allianceAttData[i][1]){
				fullAllianceData.push(allianceAttData[i]);
			}
		}
		for (var i = 0; i < allianceDefData.length; i++) {
			if (fullAllianceData[0][0] === allianceDefData[i][1]){
				fullAllianceData.push(allianceDefData[i]);
			}
		}
		var AlliancePlayers = [];
		var playerBP = [];
		var playerABP = [];
	  var	playerDBP = [];

		for (var i = 0; i < playerData.length; i++) {
			if(playerData[i][2] == fullAllianceData[0][0]){
			AlliancePlayers.push(playerData[i]);
			}
		}
		for (var i = 0; i < AlliancePlayers.length; i++) {
			for (var j = 0; j < playerFightData.length; j++) {
				if (AlliancePlayers[i][0] === playerFightData[j][1]) {
				playerBP.push(playerFightData[j]);
				}
			}
			for (var j = 0; j < playerDefData.length; j++) {
				if (AlliancePlayers[i][0] === playerFightData[j][1]) {
					playerDBP.push(playerDefData[j]);
				}
			}
			for (var j = 0; j < playerAttData.length; j++) {
				if (AlliancePlayers[i][0] === playerAttData[j][1]) {
					playerABP.push(playerFightData[j]);
				}
			}
		}
		// fullAllianceData[0][id, name, points, cities, players, rank]
		// fullAllianceData[1-3][rank, id, points]
		// AlliancePlayers[i]

		allianceDataTable.set(`${message.content.split(" ")[2]}`, {
			id: fullAllianceData[0][0],
			name: fullAllianceData[0][1],
			points: fullAllianceData[0][2],
			cities: fullAllianceData[0][3],
			players: fullAllianceData[0][4],
			tBP: fullAllianceData[1][3],
			aBP: fullAllianceData[2][3],
			dBP: fullAllianceData[3][3],
			playerData: AlliancePlayers,
			playerBP: playerBP,
			playerDBP: playerDBP,
			playerABP: playerABP
		});
} else {

}

}




});});});});});});});});



module.exports.help = {
  name: "Follow"
}
