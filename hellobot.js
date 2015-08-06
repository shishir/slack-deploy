module.exports = function(req, res, next) {
  var userName     = req.body.user_name;
  var incomingText = req.body.text
  var botPayload = {
    text: 'Namaste, ' + incomingText + '!'
  };

  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
}