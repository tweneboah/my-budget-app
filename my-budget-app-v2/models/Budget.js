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
    ],

   author: {
       id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'User'
       },
       username: String
   }


});

module.exports = mongoose.model('Budget', budgetSchema);

