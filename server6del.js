const https = require("https");

const options = {
  host: "jsonplaceholder.typicode.com",
  path: "/users/1",
  method: "DELETE",
  headers: {
    Accept: "application/json",
  },
};

const request = https.request(options, (res) => {
  if (res.statusCode !== 200) {
    console.error(
      `Did not get a Created from the server. Code: ${res.statusCode}`
    );
    res.resume();
    return;
  }

  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("close", () => {
    console.log("Deleted user");
    console.log(JSON.parse(data));
  });
});

//   It’s important that you write data before you use the end()
// function. The end() function tells Node.js that there’s no
// more data to be added to the request and sends it.
request.end();

request.on("error", (err) => {
  console.error(
    `Encountered an error trying to make a request: ${err.message}`
  );
});
