const { get, createServer } = require('http');
const { readFile } = require('fs');
const [,,...args] = process.argv;


get(`http://dev.markitondemand.com/Api/v2/Quote/json?symbol=${args[0]}`, res => {
	const statusCode = res.statusCode;
    const contentType = res.headers['content-type'];
    console.log(statusCode, contentType);
})
