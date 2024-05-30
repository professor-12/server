const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1807352",
  key: "394cfab2676009dc69c4",
  secret: "e3056c14a60cde365d00",
  cluster: "mt1",
  useTLS: true
});

module.exports = pusher

