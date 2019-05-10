const mongoose = require('mongoose');
const {Schema} = mongoose;

let PagespeedDataSchema = new Schema(
    {
        loadingExperience: String,
        originLoadingExperience: String,
        lighthousePerformanceScore: Number,
        date: Date,
        site: String,
        product: String,
        pageUrl: String,
        tempateId: String
    },
    {strict: false}
);

module.exports = mongoose.model('PagespeedData', PagespeedDataSchema);
