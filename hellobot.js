module.exports = function(req, res, next) {
  var userName     = req.body.user_name;
  var incomingText = req.body.text;
  commands = incomingText.split(" ");
  releaseBranchName = commands[1];
  var newLine = "\n";
  var megaText = "```";
  megaText += "git checkout master\n";
  megaText += "git fetch origin\n";
  megaText += "git checkout -t -b "+ releaseBranchName + " origin/master\n";
  megaText += "\n\n";

  for (var i = 2; i < commands.length; i++) {
    var branchCommand = "git checkout -t -b " + commands[i] + " origin/" + commands[i] + "\n";
    branchCommand += "git rebase "+ releaseBranchName + " " + commands[i] + "\n";
    branchCommand += "git rebase origin/"+ commands[i] + " " + releaseBranchName + "\n";
    branchCommand += "\n\n";
    megaText += branchCommand;
  }

  for (var i = 2; i < commands.length; i++) {
    var deleteCommand = "git push origin :" + commands[i] + "\n";
    megaText += deleteCommand;
  }
  megaText += newLine;
  megaText+= "git push origin :" + releaseBranchName;
  megaText += newLine;
  megaText += "git checkout master";
  megaText += newLine;
  megaText += "git pull --rebase";
  megaText += newLine;
  megaText += "git merge --no-ff --no-commit " + releaseBranchName;
  megaText += newLine;
  megaText += "git commit";
  megaText += newLine;
  megaText += "git push origin head";

  megaText += "```"
  var botPayload = {
    text: megaText
  };

  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
}