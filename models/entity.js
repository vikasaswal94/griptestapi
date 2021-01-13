const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const entitySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please tell us the name!']
    },
    type: {
        type: String,
        required: [true, 'Please provide us the type']
    },
    timestamp: {
        type: String,
        default: Date.now(),
    },
});

autoIncrement.initialize(mongoose.connection); // initialize autoIncrement 

entitySchema.plugin(autoIncrement.plugin, {
    model: 'entity',
    field: 'id',
    startAt: 1
}); // use autoIncrement

const Entity = mongoose.model('Entity', entitySchema);

module.exports = Entity;