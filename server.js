  
const express = require('express');
const path = require('path');

const app = express();
const publicPath = (path.join(__dirname, '..', 'public'));

// Serve only the static files form the dist directory
app.use(express.static(publicPath));

app.get('/*', function(req,res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8050);