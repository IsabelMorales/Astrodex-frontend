var requests = require('requests');
var axios = require ('axios');

function geoCode(country,estate,city){

    /*requests("https://api.opencagedata.com/geocode/v1/json?q=Rua+Cafel%C3%A2ndia%2C+Carapicu%C3%ADba%2C+Brasil&key=37222f6656c044859905d898d1e7583a")
	.on('data', function (chunk) {
	  //console.log(chunk)
		console.log(chunk);
	})
	.on('end', function (err) {
	  if (err) return console.log('connection closed due to errors', err);
	 
	  console.log('end');
	});

    //const res = axios.get('https://api.opencagedata.com/geocode/v1/json?q=Rua+Cafel%C3%A2ndia%2C+Carapicu%C3%ADba%2C+Brasil&key=37222f6656c044859905d898d1e7583a');
	//console.log(res);*/
	
	var apikey = '37222f6656c044859905d898d1e7583a';
  //var latitude = '51.0';
  //var longitude = '7.0';
	var cosa;
  var api_url = 'https://api.opencagedata.com/geocode/v1/json'

  var request_url = api_url
    + '?'
    + 'key=' + apikey
    + '&q=' + encodeURIComponent(city + ',' + estate+','+country)
    + '&pretty=1'
    + '&no_annotations=1';

  // see full list of required and optional parameters:
  // https://opencagedata.com/api#forward

  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function() {
    // see full list of possible response codes:
    // https://opencagedata.com/api#codes

    if (request.status == 200){ 
      // Success!
	  var data = JSON.parse(request.responseText);
	  cosa = data.results[0].geometry;
	  //alert(data.results[0].formatted);
	  console.log (cosa);
	  

    } else if (request.status <= 500){ 
      // We reached our target server, but it returned an error
                           
      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log(data.status.message);
    } else {
      console.log("server error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");        
  };
  
  request.send();  // make the request
  console.log(cosa);
  return cosa;
}

exports.geoCode = geoCode;