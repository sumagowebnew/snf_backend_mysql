
const db = require('../../db');

function getAllEventDetails(callback) {
    try {
        db.query('SELECT * FROM upcomingevents', callback);
    } catch (error) {
        callback(error, null);
    }
}

function createEventDetail(eventData, callback) {
    try {
        db.query('INSERT INTO upcomingevents SET ?', eventData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updateEventDetail(id, eventData, callback) {
    try {
        db.query('UPDATE upcomingevents SET ? WHERE id = ?', [eventData, id], callback);
    } catch (error) {
        callback(error, null);
    }
}

function deleteEventDetail(id, callback) {
    try {
        db.query('DELETE FROM upcomingevents WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    getAllEventDetails,
    createEventDetail,
    updateEventDetail,
    deleteEventDetail
};
