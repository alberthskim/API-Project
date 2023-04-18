'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://image.com/gallery',
        preview: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
    }, {});
  }
};
