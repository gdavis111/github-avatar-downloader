var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });


}

getRepoContributors("jquery", "jquery", function(err, result) {
  var parsedResult = JSON.parse(result);
  parsedResult.forEach(function(obj) {
  downloadImageByURL(obj.avatar_url, obj.id);
  });
});

function downloadImageByURL(url, filePath) {
  request.get(url, filePath)
        .on('error', function (err) {
          throw err;
        })
        .on('response', function(response) {
          console.log('Response Status Code: ', response.statusCode);
          console.log('Response content-type: ', response.headers['content-type']);
        })
        .pipe(fs.createWriteStream(filePath + '.jpg'));
}



