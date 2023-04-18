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
        SpotId: 1,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        SpotId: 2,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        SpotId: 3,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        SpotId: 4,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        SpotId: 5,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        SpotId: 6,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        SpotId: 7,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        SpotId: 8,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        SpotId: 9,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        SpotId: 10,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        SpotId: 11,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        SpotId: 12,
        url: 'https://image.com/gallery',
        preview: true
      },
      {
        SpotId: 13,
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
