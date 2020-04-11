"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mongoose_1 = require("mongoose");
/**
 * Create Database Connection does exactly what you think it would.
 * @export
 * @param  {string} url
 * @return Promise<typeof mongoose>
 */
function createDatabaseConnection(url) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, mongoose_1["default"].connect(url, { useNewUrlParser: true, useUnifiedTopology: true })];
                case 1:
                    connection = _a.sent();
                    return [2 /*return*/, connection];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, err_1];
                case 3:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
exports.createDatabaseConnection = createDatabaseConnection;
;
/**
 * Creates a Model Factory function
 * @param connection
 */
function createModelFactory(connection) {
    return function (name, schema) {
        return connection.model(name, schema);
    };
}
exports.createModelFactory = createModelFactory;
/**
 * Create sync is a synchronus version of mongoose's create method.
 * It "decallbackify's" the function.
 * @export
 * @param  {Model<any>} model
 * @param  {*} data
 * @return Promise<any>
 */
function createSync(model, data) {
    return new Promise(function (resolve, reject) {
        model.create(data, function (err, created) {
            if (err)
                reject(err);
            resolve(created);
        });
    });
}
exports.createSync = createSync;
;
/**
 * Find Sync is a synchronus version of mongoose's find method.
 * It "decallbackify's" the function.
 * @export
 * @param  {Model<any>} model
 * @param  {*} data
 * @return Promise<any>
 */
function findSync(model, data) {
    return new Promise(function (resolve, reject) {
        model.find(data, function (err, res) {
            if (err)
                reject(err);
            resolve(res);
        });
    });
}
exports.findSync = findSync;
;
/**
 * Update Sync is a synchronus version of mongoose's update method.
 * It "decallbackify's" the function.
 * @export
 * @param  {Model<any>} model
 * @param  {*} data
 * @return Promise<any>
 */
function updateSync(model, data) {
    return new Promise(function (resolve, reject) {
        model.findByIdAndUpdate(data._id, data, function (err, res) {
            if (err)
                reject(err);
            resolve(res);
        });
    });
}
exports.updateSync = updateSync;
;
/**
 * Update Where Sync is a synchronus version of mongoose's update and where mothods.
 * It "decallbackify's the function".
 * @export
 * @param  {Model<any>} model
 * @param  {*} where
 * @param  {*} data
 * @return Promise<any>
 */
function updateWhereSync(model, where, data) {
    return new Promise(function (resolve, reject) {
        model.where(where).update(data, function (err, res) {
            if (err)
                reject(err);
            resolve(res);
        });
    });
}
exports.updateWhereSync = updateWhereSync;
/**
 * Delete Sync is a synchronus version of mongoose's delete method.
 * It "decallbackify's" the function.
 * @export
 * @param  {Model<any>} model
 * @param  {*} data
 * @return Promise<any>
 */
function deleteSync(model, data) {
    return new Promise(function (resolve, reject) {
        model.deleteMany(data, function (err) {
            if (err)
                reject(err);
            resolve(true);
        });
    });
}
exports.deleteSync = deleteSync;
;
/**
 * Create Interaction creates a connection between a model and the database connection.
 * If the model is not loaded yet or is broken we catch that so we dont have to check
 * every time we want interact with a model.
 * @export
 * @param  {(Model<any> | undefined)} model
 * @param  {Function} func
 * @return Function
 */
function createInteraction(func, modelName, schema, db) {
    return function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, func(createModelFactory(db)(modelName, schema), data)];
                    case 1:
                        result = _a.sent();
                        if (result)
                            return [2 /*return*/, [result]];
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 3];
                    case 3:
                        db.connection.close();
                        return [2 /*return*/, []];
                }
            });
        });
    };
}
exports.createInteraction = createInteraction;
;
/**
 * Creates a new interaction factory
 * @param modelName
 * @param schema
 */
function createInteractionFactory(modelName, schema, db) {
    return function (func) {
        return createInteraction(func, modelName, schema, db);
    };
}
exports.createInteractionFactory = createInteractionFactory;
