const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    income: String,
    expenses: String,
    description: String,
    image: String,

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model('Budget', budgetSchema);