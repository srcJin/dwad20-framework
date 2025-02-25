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

exports.up = function (db) {
  return db.createTable('products_tags', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      product_id: {
          type: 'int',  // important: type match
          notNull: true,
          unsigned: true,  // important
          foreignKey: {
              name: 'products_product_tags_fk',
              table: 'products',
              rules: {
                  onDelete: 'CASCADE',
                  onUpdate: 'RESTRICT'
              },
              mapping: 'id'  // id column in the products table
          }
      },
      tag_id: {
          type: 'int',
          notNull: true,
          unsigned:true,
          foreignKey: {
              name: 'tags_products_tag_fk',
              table: 'tags',
              rules: {
                  onDelete: 'CASCADE',
                  onUpdate: 'RESTRICT'
              },
              mapping: 'id'
          }
      }
  });

}

exports.down = function (db) {
  return db.dropTable('products_tags');
};

exports._meta = {
  "version": 1
};
