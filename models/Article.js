const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// const connection = mongoose.createConnection('mongodb://localhost/andTabDatabase');
// autoIncrement = require('mongoose-auto-increment');
const ArticleSchema = new Schema({

  
  title: {
    type: String,
    required: true
  },
  
  url: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
  


 });

//  ArticleSchema.plugin(autoIncrement.plugin, 'Article');
 const Article = mongoose.model('Article', ArticleSchema);

 module.exports = Article;