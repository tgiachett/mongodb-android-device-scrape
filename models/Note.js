const mongoose = require("mongoose");
var Schema = mongoose.Schema;

// const connection = mongoose.createConnection('mongodb://localhost/andTabDatabase');
// autoIncrement = require('mongoose-auto-increment');
const NoteSchema = new Schema({
  
  title: String,
 
  body: String
});

// ArticleSchema.plugin(autoIncrement.plugin, 'Note');
const Note = mongoose.model("Note", NoteSchema);


module.exports = Note;
