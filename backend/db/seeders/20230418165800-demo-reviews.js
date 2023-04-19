'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 4,
        userId: 1,
        review: 'AWESOME STAY!! I gained so much muscles and became a warrior!',
        stars: 5
      },
      {
        spotId: 6,
        userId: 1,
        review: 'AWESOME STAY!! I felt like a ninja hiding!',
        stars: 5
      },
      {
        spotId: 8,
        userId: 1,
        review: 'AWESOME STAY!! I learned some magic tricks!',
        stars: 5
      },
      {
        spotId: 10,
        userId: 1,
        review: 'AWESOME STAY!! I learned how to become a hunter!',
        stars: 5
      },
      {
        spotId: 12,
        userId: 1,
        review: 'AWESOME STAY!! ARGGGGG-uably the best!',
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Awesome stay! They gave me a free beach chair.',
        stars: 5
      },
      {
        spotId: 6,
        userId: 2,
        review: 'SUPER MEAN! Told me I am too slow but overall okay stay.',
        stars: 3
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Horrible stay... Lucas the owner made me deliver a letter to someone for a choice of a cap or headband',
        stars: 2
      },
      {
        spotId: 5,
        userId: 3,
        review: 'Super Fun running and climbing legos',
        stars: 5
      },
      {
        spotId: 4,
        userId: 4,
        review: 'HORRIBLE SERVICE... Told me I will never be strong!',
        stars: 1
      },
      {
        spotId: 7,
        userId: 4,
        review: 'BEA-UTIFUL VIEW. Was able to teleport around the tower',
        stars: 5
      },
      {
        spotId: 2,
        userId: 5,
        review: 'Very disappointed. They dropped me off on an island and never took me back.',
        stars: 1
      },
      {
        spotId: 9,
        userId: 5,
        review: 'Decent stay. Got scared because they never told me there was going to be a big fish there...',
        stars: 4
      },
      {
        spotId: 3,
        userId: 6,
        review: 'Fresh Air? Nah, FRESH FISH SMELL!',
        stars: 3
      },
      {
        spotId: 11,
        userId: 6,
        review: 'The PilotHouse looks exactly like my ship!',
        stars: 5
      },
      {
        spotId: 13,
        userId: 6,
        review: 'They called me out for eating TOO MUCH. I was only just trying to feed my crew.',
        stars: 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
