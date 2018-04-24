const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const alliance = "https://en106.grepolis.com/data/alliances.txt";
const allianceFight = "https://en106.grepolis.com/data/alliance_kills_all.txt";
const allianceDef = "https://en106.grepolis.com/data/alliance_kills_def.txt";
const allianceAtt = "https://en106.grepolis.com/data/alliance_kills_att.txt";
const players = "https://en106.grepolis.com/data/players.txt";
const playersFight = "https://en106.grepolis.com/data/player_kills_all.txt";
const playersDef = "https://en106.grepolis.com/data/player_kills_def.txt";
const playersAtt = "https://en106.grepolis.com/data/player_kills_att.txt";
const conquest = "https://en106.grepolis.com/data/conquers.txt";
const island = "https://en106.grepolis.com/data/islands.txt";
const town = "https://en106.grepolis.com/data/towns.txt";

function csvToArray (data) {
rows = data.split("\n");
return rows.map(function (row) {
return row.split(",");
	});
};


	module.exports.run = async(bot, message, args) => {
			if (!message.guild.channels.exists("name", "bot-updates")) {
					makeChannel(message);
				}
	let msg = await message.guild.channels.find("name", "bot-updates").send("Loading...");
	let playerFightData = csvToArray((await snekfetch.get(playersFight)).text);
	let playerDefData = csvToArray((await snekfetch.get(playersDef)).text)
	let playerAttData = csvToArray((await snekfetch.get(playersAtt)).text);
	let conquestData = csvToArray((await snekfetch.get(conquest)).text);
	let islandData = csvToArray((await snekfetch.get(island)).text);
	let playerData = csvToArray((await snekfetch.get(players)).text);
	let allianceAttData = csvToArray((await snekfetch.get(allianceAtt)).text);
	let allianceDefData = csvToArray((await snekfetch.get(allianceDef)).text);
	let allianceFightData = csvToArray((await snekfetch.get(allianceFight)).text);
	let townData = csvToArray((await snekfetch.get(town)).text);
	let allianceData = csvToArray((await snekfetch.get(alliance)).text);

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

	msg.delete();
	message.guild.channels.find("name", "bot-updates").send("Re-Loaded Data!");

			function makeChannel(message){
    		var server = message.guild;
    		var name = "bot-updates";

    		server.createChannel(name, "text");
			}
	}





module.exports.help = {
  name: "Reload"
}
