import mongoose, { Model } from 'mongoose';

/**
 * Create Database Connection does exactly what you think it would.
 * @export
 * @param  {string} url 
 * @return Promise<typeof mongoose> 
 */
export async function createDatabaseConnection(url: string): Promise<typeof mongoose> {
    try {
        const connection: typeof mongoose = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        return connection;
    } catch (err) {
        return err;
    };
};

/**
 * Creates a Model Factory function
 * @param connection 
 */
export function createModelFactory(connection: typeof mongoose): (name: string, schema: mongoose.Schema) => Model<any> {
    return function (name: string, schema: mongoose.Schema): Model<any> {
        return connection.model(name, schema);
    }
}

/**
 * Create sync is a synchronus version of mongoose's create method. 
 * It "decallbackify's" the function.
 * @export
 * @param  {Model<any>} model 
 * @param  {*} data 
 * @return Promise<any> 
 */
export function createSync(model: Model<any>, data: any): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
        model.create(data, (err: Error, created: any) => {
            if (err) reject(err);
            resolve(created);
        });
    });
};


/**
 * Find Sync is a synchronus version of mongoose's find method. 
 * It "decallbackify's" the function.
 * @export
 * @param  {Model<any>} model 
 * @param  {*} data 
 * @return Promise<any> 
 */
export function findSync(model: Model<any>, data: any): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
        model.find(data, (err: Error, res: any) => {
            if (err)
                reject(err);
            resolve(res);
        });
    });
};


/**
 * Update Sync is a synchronus version of mongoose's update method. 
 * It "decallbackify's" the function.
 * @export
 * @param  {Model<any>} model 
 * @param  {*} data 
 * @return Promise<any> 
 */
export function updateSync(model: Model<any>, data: any): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
        model.findByIdAndUpdate(data._id, data, (err: Error, res: any) => {
            if (err)
                reject(err);
            resolve(res);
        });
    });
};

/**
 * Update Where Sync is a synchronus version of mongoose's update and where mothods.
 * It "decallbackify's the function".
 * @export
 * @param  {Model<any>} model 
 * @param  {*} where 
 * @param  {*} data 
 * @return Promise<any> 
 */
export function updateWhereSync(model: Model<any>, where: any, data: any): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
        model.where(where).update(data, (err: Error, res: any) => {
            if (err)
                reject(err);
            resolve(res);
        });
    });
}

/**
 * Delete Sync is a synchronus version of mongoose's delete method. 
 * It "decallbackify's" the function.
 * @export
 * @param  {Model<any>} model 
 * @param  {*} data 
 * @return Promise<any> 
 */
export function deleteSync(model: Model<any>, data: any): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
        model.deleteMany(data, (err: Error) => {
            if (err)
                reject(err);
            resolve(true);
        });
    });
};


/**
 * Create Interaction creates a connection between a model and the database connection.
 * If the model is not loaded yet or is broken we catch that so we dont have to check
 * every time we want interact with a model.
 * @export
 * @param  {(Model<any> | undefined)} model 
 * @param  {Function} func 
 * @return Function 
 */
export function createInteraction(func: Function, modelName: string, schema: mongoose.Schema, db: mongoose): Function {
    return async function (data: any): Promise<any[]> {
        try {
            const result = await func(createModelFactory(db)(modelName, schema), data);
            if (result)
                return [result];

        } catch (err) {
            console.log(err);
        }
        db.connection.close();
        return [];
    };
};

/**
 * Creates a new interaction factory
 * @param modelName 
 * @param schema 
 */
export function createInteractionFactory(modelName: string, schema: mongoose.Schema, db: mongoose): Function {
    return function (func: Function): Function {
        return createInteraction(func, modelName, schema, db);
    }
}