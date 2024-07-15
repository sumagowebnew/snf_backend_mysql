// models/event_imagesModel.js

const db = require("../../db"); // Adjust path as needed

// Create a new event image record
function createEventImage(eventImage, callback) {
  try {
    db.query("INSERT INTO event_images SET ?", eventImage, callback);
  } catch (error) {
    callback(error, null);
  }
}

// Retrieve all event images
function getAllEventImages(callback) {
  try {
    db.query("SELECT * FROM event_images", callback);
  } catch (error) {
    callback(error, null);
  }
}

// Update an event image record by ID
function updateEventImage(id, eventImage, callback) {
  try {
    db.query("UPDATE event_images SET ? WHERE id = ?", [eventImage, id], callback);
  } catch (error) {
    callback(error, null);
  }
}

// Delete an event image record by ID
function deleteEventImage(id, callback) {
  try {
    db.query("DELETE FROM event_images WHERE id = ?", id, callback);
  } catch (error) {
    callback(error, null);
  }
}

module.exports = {
  createEventImage,
  getAllEventImages,
  updateEventImage,
  deleteEventImage,
};
