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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var pg_1 = require("pg");
// Setup PostgreSQL connection pool
var pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'air_quality',
    password: 'postgres',
    port: 5432,
});
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// API to retrieve all data
app.get('/data', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query('SELECT * FROM pm25')];
            case 1:
                result = _a.sent();
                res.json(result.rows);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).json({ error: err_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// API to retrieve a specific data entry by ID
app.get('/data/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.query('SELECT * FROM pm25 WHERE id = $1', [id])];
            case 2:
                result = _a.sent();
                if (result.rows.length === 0) {
                    res.status(404).json({ error: 'Data not found' });
                }
                else {
                    res.json(result.rows[0]);
                }
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(500).json({ error: err_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// API to add new data
app.post('/data', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, year, latitude, longitude, pm25_level, result, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, year = _a.year, latitude = _a.latitude, longitude = _a.longitude, pm25_level = _a.pm25_level;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.query('INSERT INTO pm25 (year, latitude, longitude, pm25_level) VALUES ($1, $2, $3, $4) RETURNING *', [year, latitude, longitude, pm25_level])];
            case 2:
                result = _b.sent();
                res.status(201).json(result.rows[0]);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                res.status(500).json({ error: err_3.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// API to update data by ID
app.put('/data/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, year, latitude, longitude, pm25_level, result, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, year = _a.year, latitude = _a.latitude, longitude = _a.longitude, pm25_level = _a.pm25_level;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.query('UPDATE pm25 SET year = $1, latitude = $2, longitude = $3, pm25_level = $4 WHERE id = $5 RETURNING *', [year, latitude, longitude, pm25_level, id])];
            case 2:
                result = _b.sent();
                if (result.rows.length === 0) {
                    res.status(404).json({ error: 'Data not found' });
                }
                else {
                    res.json(result.rows[0]);
                }
                return [3 /*break*/, 4];
            case 3:
                err_4 = _b.sent();
                res.status(500).json({ error: err_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// API to delete a data entry
app.delete('/data/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.query('DELETE FROM pm25 WHERE id = $1', [id])];
            case 2:
                result = _a.sent();
                if (result.rowCount === 0) {
                    res.status(404).json({ error: 'Data not found' });
                }
                else {
                    res.status(204).send();
                }
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(500).json({ error: err_5.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// API to filter data by year, latitude, and longitude
app.get('/data/filter', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, year, lat, long, result, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, year = _a.year, lat = _a.lat, long = _a.long;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.query('SELECT * FROM pm25 WHERE year = $1 AND latitude = $2 AND longitude = $3', [year, lat, long])];
            case 2:
                result = _b.sent();
                res.json(result.rows);
                return [3 /*break*/, 4];
            case 3:
                err_6 = _b.sent();
                res.status(500).json({ error: err_6.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// API to get basic statistics (count, average, min, max)
app.get('/data/stats', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("\n            SELECT COUNT(*) as count, AVG(pm25_level) as avg, MIN(pm25_level) as min, MAX(pm25_level) as max\n            FROM pm25\n        ")];
            case 1:
                result = _a.sent();
                res.json(result.rows[0]);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.status(500).json({ error: err_7.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Start the server
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
