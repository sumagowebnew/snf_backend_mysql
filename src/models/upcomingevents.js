const db = require('../../db');

function getAllRecords(callback) {
    try {
        db.query('SELECT * FROM upcomingevents', callback);
    } catch (error) {
        callback(error, null);
    }
}

function createRecord(recordData, callback) {
    try {
        const { mainImage, images, ...eventData } = recordData;

        db.query('INSERT INTO upcomingevents SET ?', eventData, (err, result) => {
            if (err) return callback(err, null);

            const eventId = result.insertId;
            const mainImageUrl = mainImage ? mainImage[0].originalname : null;

            db.query('UPDATE upcomingevents SET main_image_url = ? WHERE id = ?', [mainImageUrl, eventId], (err, result) => {
                if (err) return callback(err, null);
                
                if (images && images.length > 0) {
                    const imageValues = images.map(image => [eventId, image.originalname, image.title]);
                    db.query('INSERT INTO event_images (event_id, images, imageTitles) VALUES ?', [imageValues], callback);
                } else {
                    callback(null, result);
                }
            });
        });
    } catch (error) {
        callback(error, null);
    }
}

function updateRecord(id, recordData, callback) {
    try {
        const { mainImage, images, ...eventData } = recordData;

        db.query('UPDATE upcomingevents SET ? WHERE id = ?', [eventData, id], (err, result) => {
            if (err) return callback(err, null);

            if (mainImage) {
                const mainImageUrl = mainImage[0].originalname;
                db.query('UPDATE upcomingevents SET main_image_url = ? WHERE id = ?', [mainImageUrl, id], (err, result) => {
                    if (err) return callback(err, null);
                });
            }

            if (images && images.length > 0) {
                db.query('DELETE FROM event_images WHERE event_id = ?', id, (err, result) => {
                    if (err) return callback(err, null);
                    
                    const imageValues = images.map(image => [id, image.originalname, image.title]);
                    db.query('INSERT INTO event_images (event_id, images, imageTitles) VALUES ?', [imageValues], callback);
                });
            } else {
                callback(null, result);
            }
        });
    } catch (error) {
        callback(error, null);
    }
}

function deleteRecord(id, callback) {
    try {
        db.query('DELETE FROM upcomingevents WHERE id = ?', id, callback);
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
