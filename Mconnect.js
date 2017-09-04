var MongoClient = require('mongodb').MongoClient;

var uri="https://downloads.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.4.7-signed.msi";

MongoClient.connect(uri, function(err,db){
	// wut
	
	
	db.close();
});