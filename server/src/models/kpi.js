const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { EvaluationSchema } = require('./evaluation');
const TaskSchema = require('./task').schema;

const KPISchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['one-time', 'recurring'],
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    frequency: {
        type: String,
        enum: ['weekly', 'monthly', 'quarterly', 'yearly', 'bi-monthly'],
        required: function() {
            return this.type === 'recurring';
        }
    },
    evaluations: [EvaluationSchema],
    tasks: [TaskSchema]
});

const KPI = mongoose.model('KPI', KPISchema);

module.exports = KPI;