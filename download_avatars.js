var request = require('request');
var fs = require('fs');
var secrets = require('./secrets'); // requires token from secret file


console.log('Welcome to the GitHub Avatar Downloader!'); // welcome greeting

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors", // specifies domain and path to get to the avatar picture
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN // secret token not included in directory for privacy reasons
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  if (process.argv[2] === undefined || process.argv[3] === undefined) {  // checks to make sure 2 arguments are passed
    console.log('You need to input 2 valid arguments'); // runs if there are not 2 arguments passed
  } else {
    var parsedResult = JSON.parse(result);  // converts JSON to object
    parsedResult.forEach(function(obj) {
    downloadImageByURL(obj.avatar_url, obj.id); // takes object avatar_url and id as arguments
    });
  }
});

function downloadImageByURL(url, filePath) {  // takes url and filepath and creates write stream
  request.get(url, filePath)                  // to save avatar picture to a file in the same directory
        .on('error', function (err) {
          throw err;
        })
        .on('response', function(response) {
          console.log('Response Status Code: ', response.statusCode);
          console.log('Response content-type: ', response.headers['content-type']);
        })
        .pipe(fs.createWriteStream(filePath + '.jpg')); // creates image in directory using filepath for name + .jpeg
}



