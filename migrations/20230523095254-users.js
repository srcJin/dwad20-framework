'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('users',{
    id: { type: 'int', primaryKey:true, unsigned: true, autoIncrement:true},
    username: { type: 'string', length:100, notNull:true},
    email: {type: 'string', length:320, notNull:true},
    password: {type: 'string', length:255, notNull:true}
})
};

exports.down = function(db) {
return db.dropTable('users');
};


exports._meta = {
  "version": 1
};
