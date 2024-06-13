const db = require('../../db');

function getAllRecords(callback) {
    try {
        db.query('SELECT * FROM homesupports', callback);
    } catch (error) {
        callback(error, null);
    }
}

function createRecord(recordData, callback) {
    try {
        db.query('INSERT INTO homesupports SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}


function updateRecord(id, recordData, callback) {
    try {
        db.query('UPDATE homesupports SET ? WHERE id = ?', [recordData, id], callback);
    } catch (error) {
        callback(error, null);
    }
}

function deleteRecord(id, callback) {
    try {
        db.query('DELETE FROM homesupports WHERE id = ?', id, callback);
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
