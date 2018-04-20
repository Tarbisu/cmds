const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  var finalA = Math.floor(Math.random() * (16777215 - 1)) + 1;

  message.channel.send({embed: {
      color: finalA,
    title: "Commands",
     fields: [{
       name: "Syntax", value: "Case Sensitive, Spaces must be replaced with '+', and ' must be replaced with a %27" + "\nFor Example, My Name's, turns into My+Name%27s"
     },
     {
         name: "Without Input", value: "!T12PlayerData\n!T12AllianceData\n!Conquests"
       },
       {
           name: "With Input", value: "!PlayerData {name of player}\n!AllianceData {name of alliance} \n!GhostFinder {city ID} \n!MoraleCalc {attackerName} {defenderName}\n!TownInfo {id}\n!MoraleCalcA {attackingAllianceName} {defenderName}\n!IslandInfo {id}\n"
         },
         {
             name: "To Be Done", value: "!Follow {alliance/player, name} {name}\n!RemoveFollow {alliance/player} {name}\n!Territories\n!Territory {Ocean}\n!CompareA {alliance, alliance2, alliance3... etc} vs {alliance, alliance2, alliance3}\n!CompareP {player, player2, player3... etc} vs {player, player2, player3}"
           },{
             name: "Utility", value: "!Math, operational signs are, +, -, *, /, %, ^, =?"
           }
          ],
   } });
 }



module.exports.help = {
  name: "Help"
}
