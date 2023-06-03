const https = require('https');

const options = {
    host: 'jsonplaceholder.typicode.com',
    path: '/users?_limit=2',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
    }
};

const request = https.request(options, (res) => {
    if (res.statusCode !== 201) {
        console.error(`Did not get a Created from the server. Code: ${res.statusCode}`);
        res.resume();
        return;
    }

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('close', () => {
        console.log('Addedd new user');
        console.log(JSON.parse(data));
    });
});

const requestData = {
    name: 'Canice Mike',
    username: 'digitalocean',
    email: 'user@digitalocean.com',
    address: {
      street: 'North Pole',
      city: 'Murmansk',
      zipcode: '12345-6789',
    },
    phone: '555-1212',
    website: 'digitalocean.com',
    company: {
      name: 'DigitalOcean',
      catchPhrase: 'Welcome to the developer cloud',
      bs: 'cloud scale security'
    }
  };

  request.write(JSON.stringify(requestData));

//   It’s important that you write data before you use the end() 
// function. The end() function tells Node.js that there’s no 
// more data to be added to the request and sends it.
  request.end();

  request.on('error', (err) => {
    console.error(`Encountered an error trying to make a request: ${err.message}`);
  })