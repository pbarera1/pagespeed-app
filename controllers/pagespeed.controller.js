const Pagespeed = require('../models/pagespeed.model');
const Template = require('../models/template.model');
const mongoose = require('mongoose');

Template.find({})
    // findById(req.body.templateId)
    .populate('pagespeedData')
    .exec(function(err, template) {
        if (err) return console.log(err);
        console.log('The author is %s', template);
        // prints "The author is Ian Fleming"
        // _id: req.body.templateId
    });

exports.pagespeed_create = function(req, res) {
    let pagespeed = new Pagespeed(req.body);

    pagespeed.save(function(err) {
        if (err) {
            res.send({message: err.message});
            return;
        }
        res.send({message: 'Pagespeed Data Created successfully'});
    });
};

exports.pagespeed_get = function(req, res) {
    const templateIds = req.params.ids && req.params.ids.split(',');
    Pagespeed.find(
        {
            _id: {
                $in: templateIds
            }
        },
        function(err, pagespeed) {
            if (err) {
                res.send({message: err.message});
                return;
            }
            res.send(pagespeed);
        }
    );
};

exports.template_create = function(req, res) {
    let template = new Template(req.body);

    template.save(function(err) {
        if (err) {
            res.send({message: err.message});
            return;
        }
        res.send({message: 'Page Template Created successfully'});
    });
};

exports.template_get = function(req, res) {
    Template.find({product: req.params.product, site: req.params.site}, function(
        err,
        templates
    ) {
        if (err) {
            res.send({message: err.message});
            return;
        }
        res.send(templates);
    });
};

exports.template_get_all = function(req, res) {
    Template.find({}, function(err, templates) {
        if (err) {
            res.send({message: err.message});
            return;
        }
        res.send(templates);
    });
};

exports.template_delete = function(req, res) {
    Template.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.send({message: err.message});
            return;
        }
        res.send({message: 'Deleted successfully!'});
    });
};
