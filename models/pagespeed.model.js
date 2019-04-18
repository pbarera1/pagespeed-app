const mongoose = require('mongoose');
const {Schema} = mongoose;

let PagespeedDataSchema = new Schema(
    {
        loadingExperience: String,
        originLoadingExperience: String,
        lighthousePerformanceScore: Number,
        date: Date,
        googleId: String,
        template: [{type: Schema.Types.ObjectId, ref: 'Template'}]
    },
    {strict: false}
);

module.exports = mongoose.model('PagespeedData', PagespeedDataSchema);
