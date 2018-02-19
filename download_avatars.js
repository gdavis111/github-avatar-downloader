var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      //ADD SECRETS
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

// function getRepoContributors(repoOwner, repoName, cb) {
//   request.get('https://api.github.com/repos/jquery/jquery/contributors')
//         .on('error', function (err) {
//           throw err;
//         })
//         .on('response', function(response) {
//           console.log('Response Status Code: ', response.statusCode);
//           console.log('Response content-type: ', response.headers['content-type']);
//         })
//         .pipe(fs.createWriteStream('./avatar.jpg'));
// }

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});