const http = require('http');

let app = http.createServer((req, res) => {
  console.log(req.url);
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  let resObject = {
    posts: [
      {
        fullName: "Nitzan Moyal",
        message: "I ate apple today",
        likes: 5
      },
      {
        fullName: "Guy Moyal",
        message: "I ate apple tommorow",
        likes: 10
      }
    ]
  };

  res.end(JSON.stringify(resObject));
});

app.listen(3000, '127.0.0.1');
console.log('Server is running');
