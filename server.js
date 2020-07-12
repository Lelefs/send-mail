const app = require('./src/app');
var apiPort = process.env.PORT || 3333;

app.listen(apiPort, function () {
  console.log('🚀️ Backend is running');
});
