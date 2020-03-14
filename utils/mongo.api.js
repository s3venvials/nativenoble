const create = async (model, data = {}) => {

    let response = { Error: null, Message: null, Item: null };

    try {

        if (!model) {
            response.Error = "Please provide a model.";
            return Promise.resolve(response);
        }

        if (Object.keys(data).length === 0) {
            response.Error = "Please provide data to be saved.";
            return Promise.resolve(response);
        }

        let newEntry = new model(data);

        await newEntry.save();

        response.Item = newEntry;
        response.Message = "Item was saved successfully!";

    } catch (error) {
        response.Error = error.toString();

    }

    return Promise.resolve(response);
};

let readOne = async (model, data = {}) => {

    let response = { Error: null, Message: null, Item: null };

    try {

        if (!model) {
            response.Error = "Please provide a model.";
            return Promise.resolve(response);
        }

        if (Object.keys(data).length === 0) {
            response.Error = "Please provide a search filter.";
            return Promise.resolve(response);
        }

        response.Item = await model.findOne(data);

        if (response.Item === null) {
            response.Error = "No item could be found with the provided search filter.";
        } else {
            response.Message = "Item was found successfully!";
        }

    } catch (error) {
        response.Error = error.toString();
    }

    return Promise.resolve(response);
}

let readAll = async (model) => {

    let response = { Error: null, Message: null, Users: null };

    try {

        if (!model) {
            response.Error = "Please provide a model.";
            return Promise.resolve(response);
        }

        response.Users = await model.find({});

        if (response.Users === null) {
            response.Error = "No item could be found with the provided search filter.";
        } else {
            response.Message = "Items were found successfully!";
        }

    } catch (error) {
        response.Error = error.toString();
    }

    return Promise.resolve(response);
}

let updateOne = async (model, filter = {}, update = {}) => {

    let response = { Error: null, Message: null, Item: null };

    try {

        if (!model) {
            response.Error = "Please provide a model.";
            return Promise.resolve(response);
        }

        if (Object.keys(filter).length === 0) {
            response.Error = "Please provide a search filter.";
            return Promise.resolve(response);
        }

        if (Object.keys(update).length === 0) {
            response.Error = "Please provide a key value pair to update.";
            return Promise.resolve(response);
        }

        let itemToUpdate = await model.findOne(filter);

        if (itemToUpdate === null) {
            response.Error = "No item could be found to update with the provided data.";
            return Promise.resolve(response);
        }

        let keys = Object.keys(update);

        for (let i = 0; i < keys.length; i++) {
            itemToUpdate[keys[i]] = update[keys[i]]
        };

        response.Item = await itemToUpdate.save();
        response.Message = "Item was updated successfully!";

    } catch (error) {
        response.Error = error.toString();
    }

    return Promise.resolve(response);
}

let updateAll = async (model, filter = {}, update = {}) => {

    let response = { Error: null, Message: null, Item: null };

    try {

        if (!model) {
            response.Error = "Please provide a model.";
            return Promise.resolve(response);
        };

        if (Object.keys(filter).length === 0) {
            response.Error = "Please provide a search filter.";
            return Promise.resolve(response);
        }

        if (Object.keys(update).length === 0) {
            response.Error = "Please provide a key value pair to update.";
            return Promise.resolve(response);
        };

        response.Item = await model.updateMany(filter, update);

        if (response.Item.n === 0) {
            response.Error = "No items could be found to update.";
            return Promise.resolve(response);
        }

        response.Message = "Items were updated successfully!";

    } catch (error) {
        response.Error = error.toString();
    }

    return Promise.resolve(response);
}

let deleteOneItem = async (model, filter = {}) => {

    let response = { Error: null, Message: null, Item: null };

    try {

        if (!model) {
            response.Error = "Please provide a model.";
            return Promise.resolve(response);
        };

        if (Object.keys(filter).length === 0) {
            response.Error = "Please provide a search filter.";
            return Promise.resolve(response);
        }

        response.Item = await model.deleteOne(filter);

        if (response.Item.n === 0) {
            response.Error = "No item could be found to remove.";
            return Promise.resolve(response);
        }

        response.Message = "Item was deleted successfully!";

    } catch (error) {
        response.Error = error.toString();
    }

    return Promise.resolve(response);
}

let deleteAllItems = async (model, filter = {}) => {

    let response = { Error: null, Message: null, Item: null };

    try {

        if (!model) {
            response.Error = "Please provide a model.";
            return Promise.resolve(response);
        };

        if (Object.keys(filter).length === 0) {
            response.Error = "Please provide a search filter.";
            return Promise.resolve(response);
        }

        response.Item = await model.deleteMany(filter);

        if (response.Item.n === 0) {
            response.Error = "No items could be found to remove.";
            return Promise.resolve(response);
        };

        response.Message = "Items were deleted successfully!";

    } catch (error) {
        response.Error = error.toString();
    }

    return Promise.resolve(response);
}

module.exports = {
    create,
    readOne,
    readAll,
    updateOne,
    updateAll,
    deleteOneItem,
    deleteAllItems
};