var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;

var pool = {
    _collections: {}
};


pool.getCollection = function (name) {
    if (!this._collections[name]) {
        this._collections[name] = db.collection(name);
    }
    return this._collections[name];
};

/**
 * Connects to the MongoDB Database with the provided URL
 */
exports.connect = function (url,callback)
{
    MongoClient.connect(url, function(err, _db){
        if (err)
        {
            throw new Error('Could not connect: '+err);
        }
        db = _db;
        connected = true;
        callback();
    });
};


/**
 * Returns the collection on the selected database
 */
exports.collection = function (name) {

    return pool.getCollection(name);

};
