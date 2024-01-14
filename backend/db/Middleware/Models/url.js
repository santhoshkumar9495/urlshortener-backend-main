const mongoose = require('mongoose');

/**
 * MONGOOSE SCHEMA 
 */
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        require: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        require: true,
        unique: true,
    },
    visitHistry: [{timestamp: {type: Number } }],
    },
    {timestamp: true}
);

const URL = mongoose.model("urls", urlSchema);

module.exports = URL;