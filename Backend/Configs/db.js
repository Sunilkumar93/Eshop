const mongoose = require("mongoose");

mongoose.set({ strictQuery: false });

const connect = mongoose.connect(process.env.DB_URL);

module.exports = { connect };
