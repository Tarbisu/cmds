const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const followData = require("./Follow.js");

function csvToArray (data) {
rows = data.split("\n");
return rows.map(function (row) {
return row.split(",");
	});
};

function difference(a,b ){
	a = parseInt(a);
	b = parseInt(b);
	var c = a - b;
	if (c < 0){
		return c;
	}
	if (c > 0){
		return "+" + c;
	}
	if (c === 0){
		return "Equivalent: " + b;
	}
}

var aId, aName, aPoints, aCities, aTBP, aABP, aDBP, aPlayerCount, aPlayers = [];

			function makeChannel(message){
				var server = message.guild;
				var name = "bot-updates";

				server.createChannel(name, "text");
			}

			function gData(tD, iD, cD, pD, pFD, pAD, pDD, aD, aFD, aAD, aDD){
				let fA = followData.followedAlliances;
				let fP = followData.followedPlayers;
				var followedAllianceList = fA.followedAlliances;
				var followedPlayerList = fP.followedPlayers;

				for (var i = 0; i < followedAllianceList.length; i++) {

					for (var j = 0; j < aD.length; j++) {
						if (followedAllianceList[i][0] == aD[j][1]) {
							for (var k = 0; k < aFD.length; k++) {
								if (followedAllianceList[i][0] == aFD[k][1]) {
								for (var l = 0; l < aAD.length; l++) {
									if (followedAllianceList[i][0] == aAD[l][1]) {
									for (var z = 0; z < aDD.length; z++) {
										if (followedAllianceList[i][0] == aDD[z][1]) {

										aId[i].push(aD[j][0]);
										aName[i].push(aD[j][1]);
										aPoints[i].push(aD[j][2]);
										aCities[i].push(aD[j][3]);
										aPlayers[i].push(aD[j][4]);
										aTBP[i].push(aFD[k][2]);
										aABP[i].push(aAD[l][2]);
										aDBP[i].push(aDD[z][2]);

										for (var x = 0; x < pD.length; x++) {
											if (pD[x][2] == aId[i][0]){
												aPlayers[i].push(pD[x]);
											}
										}

											}
										}
									}
								}
							}
						}
					}
						else{
							console.log("The alliance on the follow list: " + followedAllianceList[i][0] + " failed to load!");
						}
					}



				}

			}
			function pData(){
				if (counter <= 1) {
					return 0;
				}
				// if the program has never been run before
				else{




				}
			}


			var counter = 0;
	module.exports.run = async(bot, message, args) => {
		counter++;
		let test = message.content.split(" ");

		if (test.length < 2){
			console.log(test.length);
			message.channel.send("Please Submit a World ID, keep in mind, you have to wait 7 days after a server opens for the Data to be fully loaded! \n(E.i. en107)!");
		}
		else{
				if (!message.guild.channels.exists("name", "bot-updates")) {
						makeChannel(message);
					}

					const worldID = test[1];

				const alliance = `https://${worldID}.grepolis.com/data/alliances.txt`;
				const allianceFight = `https://${worldID}.grepolis.com/data/alliance_kills_all.txt`;
				const allianceDef = `https://${worldID}.grepolis.com/data/alliance_kills_def.txt`;
				const allianceAtt = `https://${worldID}.grepolis.com/data/alliance_kills_att.txt`;
				const players = `https://${worldID}.grepolis.com/data/players.txt`;
				const playersFight = `https://${worldID}.grepolis.com/data/player_kills_all.txt`;
				const playersDef = `https://${worldID}.grepolis.com/data/player_kills_def.txt`;
				const playersAtt = `https://${worldID}.grepolis.com/data/player_kills_att.txt`;
				const conquest = `https://${worldID}.grepolis.com/data/conquers.txt`;
				const island = `https://${worldID}.grepolis.com/data/islands.txt`;
				const town = `https://${worldID}.grepolis.com/data/towns.txt`;

	let msg = await message.guild.channels.find("name", "bot-updates").send("Loading...");
	let playerFightData = csvToArray((await snekfetch.get(playersFight)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 1/11");
	let playerDefData = csvToArray((await snekfetch.get(playersDef)).text)
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 2/11");
	let playerAttData = csvToArray((await snekfetch.get(playersAtt)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 3/11");
	let conquestData = csvToArray((await snekfetch.get(conquest)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 4/11");
	let islandData = csvToArray((await snekfetch.get(island)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 5/11");
	let playerData = csvToArray((await snekfetch.get(players)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 6/11");
	let allianceAttData = csvToArray((await snekfetch.get(allianceAtt)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 7/11");
	let allianceDefData = csvToArray((await snekfetch.get(allianceDef)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 8/11");
	let allianceFightData = csvToArray((await snekfetch.get(allianceFight)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 9/11");
	let townData = csvToArray((await snekfetch.get(town)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 10/11");
	let allianceData = csvToArray((await snekfetch.get(alliance)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 11/11");

	module.exports.townData = {townData}
	module.exports.islandData = {islandData}
	module.exports.conquestData = {conquestData}
	module.exports.playerData = {playerData}
	module.exports.playerFightData = {playerFightData}
	module.exports.playerAttData = {playerAttData}
	module.exports.playerDefData = {playerDefData}
	module.exports.allianceData = {allianceData}
	module.exports.allianceFightData = {allianceFightData}
	module.exports.allianceDefData = {allianceDefData}
	module.exports.allianceAttData = {allianceAttData}

	// pData();
	// gData(townData, islandData, conquestData, playerData, playerFightData, playerDefData, playerAttData, allianceData, allianceDefData, allianceAttData);

	msg.delete();
	message.guild.channels.find("name", "bot-updates").send("Re-Loaded Data!");
	}
}

module.exports.help = {
  name: "Reload"
}
