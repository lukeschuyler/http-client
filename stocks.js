const { get, createServer } = require('http');
const { readFile } = require('fs');
const [,,...args] = process.argv;


get(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${args[0]}`, res => {
	const statusCode = res.statusCode;
    const contentType = res.headers['content-type'];


    let error;
    if (statusCode !== 200) {
    	error = new Error(`Request Failed.\n` +
                      `Status Code: ${statusCode}`);
    } else if (!/^text\/javascript/.test(contentType)) {
   	    error = new Error(`Invalid content-type.\n` +
                      `Expected text/javascript but received ${contentType}`);
    }
    if (error) {
    	console.log(error.message);
    	res.resume();
    return;
    }
    let body = '';
	  res.on('data', (buff) => {
	    console.log("status?", statusCode);
	    body += buff.toString()
	  });
	  res.on('end', () => {
	    console.log(JSON.parse(body));
	  });
})
