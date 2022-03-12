var mongoose = require('mongoose');
dbUrl="mongodb://root:root@cluster0-shard-00-00.dqte6.mongodb.net:27017,cluster0-shard-00-01.dqte6.mongodb.net:27017,cluster0-shard-00-02.dqte6.mongodb.net:27017/uploadImage?ssl=true&replicaSet=atlas-j2zamj-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect(dbUrl,{ useNewUrlParser: true, useUnifiedTopology: true });
 
var imageSchema = new mongoose.Schema({
    name: String,
    email: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
 
 
module.exports = new mongoose.model('Image', imageSchema);