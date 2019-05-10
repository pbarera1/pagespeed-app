const mongoose = require('mongoose');
const {Schema} = mongoose;

let TemplateDataSchema = new Schema(
    {
        templateName: String,
        pageUrl: String,
        product: String,
        site: String,
        date: Date
    },
    {strict: false}
);

module.exports = mongoose.model('TemplateData', TemplateDataSchema);
