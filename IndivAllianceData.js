const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const Data = require("./Data.js");


function csvToArray (data) {
rows = data.split("\n");
return rows.map(function (row) {
return row.split(",");
	});
};


	module.exports.run = async(bot, message, args) => {
		let pData = Data.playerData;
		playerData = pData.playerData;
		let aData = Data.allianceData;
		allianceData = aData.allianceData;
		let afData = Data.allianceFightData;
		allianceFightData = afData.allianceFightData;
		let aaData = Data.allianceAttData;
		allianceAttData = aaData.allianceAttData;
		let adData = Data.allianceDefData;
		allianceDefData = adData.allianceDefData;
		let cData = Data.conquestData;
		conquestData = cData.conquestData;
		let tData = Data.townData;
		townData = tData.townData;
		let iData = Data.islandData;
		islandData = iData.islandData;


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


module.exports.help = {
  name: "AllianceData"
}
