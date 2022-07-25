const Pusher = require('pusher');

module.exports = new Pusher({
  appId: "1441888",
  key: "674b641b12ad7499b603",
  secret: "4bd74398e305fe33d582",
  cluster: "us3",
  useTLS: true
});