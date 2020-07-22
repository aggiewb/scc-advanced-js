const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.CONNECTION_STRING_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('open', () => console.log('Mongoose connected'));
mongoose.connection.on('error', err => console.log(`Mongoose could not connect: ${err}`));

const employeeSchema = mongoose.Schema({
    name: {type: String, required: true},
    title: String,
    years: Number,
    salary: Number
});

module.exports = mongoose.model('Employee', employeeSchema);