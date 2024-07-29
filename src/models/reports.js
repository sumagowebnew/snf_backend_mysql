const db = require('../../db');

function getAllRecords(callback) {
    try {
        db.query('SELECT * FROM reports', callback);
    } catch (error) {
        callback(error, null);
    }
}

function createRecord(recordData, callback) {
    try {
        db.query('INSERT INTO reports SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}


function updateRecord(id, recordData, callback) {
    try {
        db.query('UPDATE reports SET ? WHERE id = ?', [recordData, id], callback);
    } catch (error) {
        callback(error, null);
    }
}

function deleteRecord(id, callback) {
    try {
        db.query('DELETE FROM reports WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    getAllRecords,
    createRecord,
    updateRecord,
    deleteRecord
};
