const { Schema, model } = require('mongoose');
const moment = require('moment');
const ReactionSchema = require("./Reaction")

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function (createdAt) {
            return moment(createdAt).format("m/d/YYYY HH:MM:SS");
        }
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        ReactionSchema
    ]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
});

// A virtual that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;