const TrackedData = require('../models/trackedData');

module.exports = {

  /**
   * This is going to be used for save tracked data and aint to be an endpoint
   */
  saveTrackedData: async (trackedData) => {
    try {
      const newTrackedData = new TrackedData(trackedData);
      const tracked = await newTrackedData.save();
      return tracked;
    } catch (error) {
      return error;
    }
  }
}  