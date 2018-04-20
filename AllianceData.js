const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const players = "https://en106.grepolis.com/data/players.txt";
const alliancesFight = "https://en106.grepolis.com/data/alliance_kills_all.txt";
const alliancesDef = "https://en106.grepolis.com/data/alliance_kills_def.txt";
const alliancesAtt = "https://en106.grepolis.com/data/alliance_kills_att.txt";
const alliance = "https://en106.grepolis.com/data/alliances.txt";



function csvToArray (data) {
rows = data.split("\n");
return rows.map(function (row) {
return row.split(",");
	});
};

	snekfetch.get(alliance).then(r => { let allianceData = csvToArray(r.text);
	snekfetch.get(alliancesFight).then(t => { let allianceFightData = csvToArray(t.text);
	snekfetch.get(alliancesDef).then(t => { let allianceDefData = csvToArray(t.text);
	snekfetch.get(alliancesAtt).then(t => { let allianceAttData = csvToArray(t.text);

	module.exports.run = async(bot, message, args) => {

	 								allianceData.sort(function(a,b) {
	 									return a[0]-b[0]
	 							});
	 							allianceData.sort(function(a,b) {
	 								return a[5]-b[5]
	 						});

	            T12ID = [];
							T12AllyID = [];
	            T12FightRank = [];
	            T12Fight = [];
	            T12DefRank = [];
	            T12Def = [];
	            T12AttRank = [];
	            T12Att = [];
							T12PlayerCount = [];


	            for (var l = 1; l < 13; l ++){
	               T12ID.push(allianceData[l][0]);
								 T12AllyID.push(allianceData[l][2]);
								 T12PlayerCount.push(allianceData[l][4])
	            }

	            for (var i = 0; i < 12; i++) {
	              for (var j = 0; j < allianceFightData.length; j++) {
	                if(T12ID[i] === allianceFightData[j][1]){
	                  T12FightRank.push(allianceFightData[j][0]);
	                  T12Fight.push(allianceFightData[j][2]);
										break;
	                }
	                continue;
	              }

	            }
	            for (var i = 0; i < 12; i++) {
	              for (var j = 0; j < allianceDefData.length; j++) {
	                if(T12ID[i] === allianceDefData[j][1]){
	                  T12DefRank.push(allianceDefData[j][0]);
	                  T12Def.push(allianceDefData[j][2]);
										break;
	                }
	                continue;
	              }
	            }

	            for (var i = 0; i < 12; i++) {
	              for (var j = 0; j < allianceAttData.length; j++) {
	                if(T12ID[i] === allianceAttData[j][1]){
	                  T12AttRank.push(allianceAttData[j][0]);
	                  T12Att.push(allianceAttData[j][2]);
										break;
	                }

	                continue;
	              }
	            }

	 	for (var k = 1; k < 13; k++) {
			allianceData[k][1] = allianceData[k][1].replace(/[+]/g, " ");
			allianceData[k][1] = allianceData[k][1].replace(/%27/g, "'");

			var finalA = Math.floor(Math.random() * (16777215 - 1)) + 1;


	 	message.channel.send({embed: {
	 			color: finalA,
			title: "Top Twelve Alliances!",
	     description: "\nNm: " + k + "\n" + allianceData[k][1],
	     fields: [{
	         name: "Points",
					 value: "Rank: " + allianceData[k][5] + "\nPoints: " + allianceData[k][3]
	       },
						{
	  					name: "Battle Points",
							value: "Fighting: " + T12FightRank[k - 1] + "  -  " + T12Fight[k - 1] + "bp\n" + "Attacking: " + T12AttRank[k - 1] + "  -  " + T12Att[k - 1] + "bp\n"  +   "Defending: " + T12DefRank[k - 1] + "  -  " + T12Def[k - 1] + "bp"

	  				}, {
	 			        name: "Cities",
								value: allianceData[k][3],
								"inline": true
	 			    },{
							name: "Members",
							value: T12PlayerCount[k-1],
							"inline": true
						},],
	   } });

	 }
	}

	} );
	} );
	} );

	} );
module.exports.help = {
  name: "T12AllianceData"
}
