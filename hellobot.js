module.exports = function(req, res, next) {
  var userName     = req.body.user_name;
  var incomingText = req.body.text;
  commands = incomingText.split(" ");
  releaseBranchName = commands[1];

  var megaText = "";
  megaText = "git checkout master\n";
  megaText += "git fetch origin\n";
  megaText += "git checkout -t -b "+ releaseBranchName + " origin/master\n";
  megaText += "\n\n\n";

  for (var i = 2; i < commands.length; i++) {
    var branchCommand = "git checkout -t -b " + commands[i] + " origin/" + commands[i] + "\n";
    branchCommand += "git rebase "+ releaseBranchName + " " + commands[i] + "\n";
    branchCommand += "git rebase origin/"+ commands[i]; + " " + releaseBranchName + "\n";
    branchCommand += "\n\n\n";
    megaText += branchCommand;
  }

  var botPayload = {
    text: megaText
  };

  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
}