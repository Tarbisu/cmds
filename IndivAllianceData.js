const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const players = "https://en106.grepolis.com/data/players.txt";
const alliancesFight = "https://en106.grepolis.com/data/alliance_kills_all.txt";
const alliancesDef = "https://en106.grepolis.com/data/alliance_kills_def.txt";
const alliancesAtt = "https://en106.grepolis.com/data/alliance_kills_att.txt";
const alliances = "https://en106.grepolis.com/data/alliances.txt";
const conquestData = "https://en106.grepolis.com/data/conquers.txt";
const town = "https://en106.grepolis.com/data/towns.txt";
const island = "https://en106.grepolis.com/data/islands.txt";
const Data = require("./Data.js");


function csvToArray (data) {
rows = data.split("\n");
return rows.map(function (row) {
return row.split(",");
	});
};


	snekfetch.get(players).then(r => { let playerData = csvToArray(r.text);
	snekfetch.get(alliances).then(r => { let allianceData = csvToArray(r.text);
	snekfetch.get(alliancesFight).then(t => { let allianceFightData = csvToArray(t.text);
	snekfetch.get(alliancesDef).then(t => { let allianceDefData = csvToArray(t.text);
	snekfetch.get(alliancesAtt).then(t => { let allianceAttData = csvToArray(t.text);
	snekfetch.get(conquestData).then(t => {let conquestData = csvToArray(t.text);
	snekfetch.get(town).then(r => { let townData = csvToArray(r.text);
	snekfetch.get(island).then(r => { let islandData = csvToArray(r.text);

	module.exports.run = async(bot, message, args) => {
		var test =  message.content;
		function getSecondPart(str) {
    return str.split(' ')[1];
	}
		test = getSecondPart(test);
		// defining arrays used for sifting through data

		allianceDetails = [];
		allianceFight = [];
		allianceFightRank = [];
		allianceDef = [];
		allianceDefRank = [];
		allianceAtt = [];
		allianceAttRank = [];
		//code for testing whether the message correlates with a alliances name in the server (needs to be hard-coded as of now)

		for (var j = 0; j < allianceData.length; j++) {
			if(test === allianceData[j][1]){
				allianceDetails = allianceData[j];
				var allianceID = allianceData[j][0];
				break;
			}
			continue;
		}

		for (var j = 0; j < allianceDefData.length; j++) {
			if(allianceDetails[0] === allianceDefData[j][1]){
				allianceDef.push(allianceDefData[j][2]);
				allianceDefRank.push(allianceDefData[j][0]);
				break;
			}
			continue;
		}
		for (var j = 0; j < allianceFightData.length; j++) {
			if(allianceDetails[0] === allianceFightData[j][1]){
				allianceFight.push(allianceFightData[j][2]);
				allianceFightRank.push(allianceFightData[j][0]);
				break;
			}
			continue;
		}
		for (var j = 0; j < allianceAttData.length; j++) {
			if(allianceDetails[0] === allianceAttData[j][1]){
				allianceAtt.push(allianceAttData[j][2]);
				allianceAttRank.push(allianceAttData[j][0]);
				break;
			}
			continue;
		}

		allyTakes=[];
		allyInternals=[];
		allyLosses=[];
		allyHandovers=[];

		for (var j = 0; j < conquestData.length; j++) {
			if(allianceDetails[0] === conquestData[j][4] && allianceDetails[0] != conquestData[j][5]){
				allyTakes.push(conquestData[j]);
			}
			if (allianceDetails[0] === conquestData[j][4] && allianceDetails[0] === conquestData[j][5]){
				allyInternals.push(conquestData[j]);
			}
			if(allianceDetails[0] === conquestData[j][5] && allianceDetails[0] != conquestData[j][4]){
				allyLosses.push(conquestData[j]);
			}
			if (allianceDetails[0] === conquestData[j][5] && allianceDetails[0] === conquestData[j][4]){
				allyHandovers.push(conquestData[j]);
			}

			continue;
		}



		if(allianceDetails[1] == null){
			message.channel.send("Invalid alliance Name (Remember this search is; Case Sensitive, Spaces must be replaced with '+', and ' must be replaced with a %27)");
		}

		allianceDetails[1] = 	allianceDetails[1].replace(/[+]/g, " ");
		allianceDetails[1] = allianceDetails[1].replace(/%27/g, "'");

		var finalA = Math.floor(Math.random() * (16777215 - 1)) + 1;

		message.channel.send({embed: {
	 			color: finalA,
			title: allianceDetails[1],
	     description: "Details about " + allianceDetails[1],
	     fields: [{
	         name: "Ranks",
					 value: "Points: " + allianceDetails[5] + "\nFighter: " + allianceFightRank + "\nAttacker: " + allianceAttRank + "\nDefender: " + allianceDefRank,
					 "inline": true
	       },	{
						name: "Points",
						value: "Points: " + allianceDetails[2] + "\nTotal Points: " + allianceFight + " bp\nAttacker Points: " + allianceAtt + " bp\nDefender Points: " + allianceDef + " bp",
						"inline": true
					},{
									name: "Conquests",
									value: "Taken Cities: " + allyTakes.length + "\n" + "Lost Cities: " + allyLosses.length
								},
								{
		 								name: "Handovers",
										value: "Internals: " + allyInternals.length,
										"inline": true
		 							},{
					 			        name: "Cities",
												value: allianceDetails[3],
												"inline": true

					 			    },{
											name: "Players",
											value: allianceDetails[4],
											"inline": true
										},

						],
	   } });




}
});});});});});});});});

module.exports.help = {
  name: "AllianceData"
}
