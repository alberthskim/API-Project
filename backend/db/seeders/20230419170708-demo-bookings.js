'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 4,
        userId: 1,
        startDate: new Date('2020-02-17'),
        endDate: new Date('2020-02-20')
      },
      {
        spotId: 6,
        userId: 1,
        startDate: new Date('2020-02-21'),
        endDate: new Date('2020-02-24')
      },
      {
        spotId: 8,
        userId: 1,
        startDate: new Date('2020-02-25'),
        endDate: new Date('2020-02-26')
      },
      {
        spotId: 10,
        userId: 1,
        startDate: new Date('2020-03-01'),
        endDate: new Date('2020-03-03')
      },
      {
        spotId: 12,
        userId: 1,
        startDate: new Date('2020-03-05'),
        endDate: new Date('2020-03-06')
      },
      {
        spotId: 1,
        userId: 2,
        startDate: new Date('2020-05-07'),
        endDate: new Date('2020-05-10')
      },
      {
        spotId: 6,
        userId: 2,
        startDate: new Date('2020-05-12'),
        endDate: new Date('2020-05-14')
      },
      {
        spotId: 1,
        userId: 3,
        startDate: new Date('2020-06-01'),
        endDate: new Date('2020-06-03')
      },
      {
        spotId: 5,
        userId: 3,
        startDate: new Date('2020-06-05'),
        endDate: new Date('2020-06-20')
      },
      {
        spotId: 4,
        userId: 4,
        startDate: new Date('2020-06-22'),
        endDate: new Date('2020-06-24')
      },
      {
        spotId: 7,
        userId: 4,
        startDate: new Date('2020-06-30'),
        endDate: new Date('2020-07-02')
      },
      {
        spotId: 2,
        userId: 5,
        startDate: new Date('2020-08-03'),
        endDate: new Date('2020-08-05')
      },
      {
        spotId: 9,
        userId: 5,
        startDate: new Date('2020-08-07'),
        endDate: new Date('2020-08-10')
      },
      {
        spotId: 3,
        userId: 6,
        startDate: new Date('2020-09-01'),
        endDate: new Date('2020-09-15')
      },
      {
        spotId: 11,
        userId: 6,
        startDate: new Date('2020-09-20'),
        endDate: new Date('2020-09-21')
      },
      {
        spotId: 13,
        userId: 6,
        startDate: new Date('2020-10-01'),
        endDate: new Date('2020-10-07')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
