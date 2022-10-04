const mongoose = require('mongoose');

class MongoService {

    constructor(model) {
        this.model = model;
    }

    /**
     * create
     * @param {*} values 
     */
    create(values) {
        return this.model.create(values);
    }

    /**
     * update data
     * @param {*} filters 
     * @param {*} values 
     */
    update(filters, values, operator = "$set") {
        const match = {};
        for (let val of filters) {
            match[val.field] = val.value;
        }
        return this.model.findOneAndUpdate(
            match,
            { [operator]: values },
            { new: true }
        );
    }

    /**
     * delete data
     * @param {*} id 
     */
    delete(value) {
        switch (typeof value) {
            case 'number':
            case 'string':
                return this.model.deleteOne({ _id: mongoose.Types.ObjectId(value) });
            case 'object':
                return this.model.deleteOne(value);
            case 'array':
                return this.model.deleteMany(query);
        }
    }

    /**
     * find by id
     * @param {*} id 
     */
    findById(id) {
        return this.model.findOne({ _id: mongoose.Types.ObjectId(id) });
    }

    /**
     * find one by filter
     * @param {*} fields 
     * @param {*} project 
     */
    findOne(fields, project = null) {
        return project ? this.model.findOne(fields, project) : this.model.findOne(fields);
    }

    /**
     * find by query
     * @param {*} query 
     */
    aggregate(query) {
        return this.model.aggregate(query);
    }

    /**
     * get count
     * @param {*} query 
     */
    count(query) {
        return this.model.count(query);
    }

    length(query) {
        return new Promise(async (Resolve, Reject) => {
            try {
                const data = await this.model.aggregate(query);
                Resolve(data.length);
            } catch (err) {
                Reject(0)
            }
        });
    }

    /**
     * set value
     * @param {*} value
     */
    setValue(value) {
        const isValid = mongoose.isValidObjectId(value);
        return isValid ? mongoose.Types.ObjectId(value) : value;
    }

    /**
     * convert string to object id
     * @param {*} value 
     */
    static toObjectId(value) {
        return mongoose.Types.ObjectId(value)
    }

    /**
     * match value to query
     * @param {*} query 
     * @param {*} prop 
     * @param {*} value 
     */
    static queryMatch(query, prop, value) {
        if (query[0]['$match']) {
            query[0]['$match'][prop] = value;
        } else {
            query.unshift({ $match: { [prop]: value } })
        }
    }

}

module.exports = MongoService;