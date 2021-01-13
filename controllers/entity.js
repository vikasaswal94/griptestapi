/**
 * @author vikas aswal
 */
const catchAsync = require('../utils/catchAsync');
const Entity = require('./../models/entity');

exports.getAllEntities = catchAsync(async (req, res, next) => {
    let condition = {};
    if(req.query.search){
        condition = { name : new RegExp(req.query.search, 'i')}
    }
    const trades = await Entity.find(condition);
    res.status(200).json(trades);
});

exports.createEntity = catchAsync(async (req, res, next) => {
    const entity = await Entity.create({
        name: req.body.name,
        type: req.body.type,
        timestamp: Date.now()
    });
    res.status(201).json(entity);
});
