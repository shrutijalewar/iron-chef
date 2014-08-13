'use strict';
var Mongo = require('mongodb');
function Recipe(o){
  strip(o);
  this.name = o.name || 'Food';
  this.photo = o.photo || 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSKy9Yz4SKfROxQEzFlfZ6HKe3PV7xrVANXRNMlhgh96xa1jdrz';
  this.created = new Date();
  this.category = o.category;
  this.ingredients = o.ingredients || 'fruits, meat, eggs';
  this.directions = o.directions || 'Cut, Clean, Pick, Cook';
  this.ingredients = this.ingredients.split(',').map(function(i){return i.trim();});
  this.directions = this.directions.split(',').map(function(i){return i.trim();});
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipes');}
});

Recipe.all = function(cb){
  Recipe.collection.find().sort({created:-1}).toArray(cb);
};

Recipe.create = function(o , cb){
  var r = new Recipe(o);
  Recipe.collection.save(r, cb);
};

Recipe.removeById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Recipe.collection.remove({_id:_id}, cb);
};

module.exports = Recipe;

//private Function//

function strip(o){
//stripping leading and following spaces from all properties inside of o that are strings

  var properties = Object.keys(o);
  properties.forEach(function(property){
    if(typeof o[property] === 'string'){
      o[property] = o[property].trim();
    }
  });
}
