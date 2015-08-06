module.exports = function(req, res, next) {
  var userName     = req.body.user_name;
  var incomingText = req.body.text;
  commands = incomingText.split(" ");
  releaseBranchName = commands[1];

  // for (var i = 2; i < commands.lenght; i++) {

  // }
  var megaText = "";
  megaText = "git checkout master\n";
  megaText += "git fetch origin\n";
  megaText += "git checkout -t -b "+ releaseBranchName + " origin/master\n";


  var botPayload = {
    text: megaText
  };

  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
}