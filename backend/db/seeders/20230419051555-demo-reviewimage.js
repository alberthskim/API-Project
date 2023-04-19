'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "image url"
      },
      {
        reviewId: 2,
        url: "image url"
      },
      {
        reviewId: 3,
        url: "image url"
      },
      {
        reviewId: 4,
        url: "image url"
      },
      {
        reviewId: 5,
        url: "image url"
      },
      {
        reviewId: 6,
        url: "image url"
      },
      {
        reviewId: 7,
        url: "image url"
      },
      {
        reviewId: 8,
        url: "image url"
      },
      {
        reviewId: 9,
        url: "image url"
      },
      {
        reviewId: 10,
        url: "image url"
      },
      {
        reviewId: 11,
        url: "image url"
      },
      {
        reviewId: 12,
        url: "image url"
      },
      {
        reviewId: 13,
        url: "image url"
      },
      {
        reviewId: 14,
        url: "image url"
      },
      {
        reviewId: 15,
        url: "image url"
      },
      {
        reviewId: 16,
        url: "image url"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16] }
    }, {});
  }
};
