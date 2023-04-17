'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Beginner',
        lastName: 'Class',
        email: 'WhatToBe@user.io',
        username: 'IneedAJob',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Warrior',
        lastName: 'Class',
        email: 'ArmAndHammer@user.io',
        username: 'DoYouEvenLiftBro',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Thief',
        lastName: 'Class',
        email: 'NinjaStars@user.io',
        username: 'IamANinjaaa',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Magician',
        lastName: 'Class',
        email: 'Healer123@user.io',
        username: 'Healer123',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Bowman',
        lastName: 'Class',
        email: 'BowmanMaster123@user.io',
        username: 'BowAndArrow',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Pirate',
        lastName: 'Class',
        email: 'argggggg@user.io',
        username: 'PirateBoy',
        hashedPassword: bcrypt.hashSync('password6')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['IneedAJob', 'DoYouEvenLiftBro', 'IamANinjaaa', 'Healer123', 'BowAndArrow', 'PirateBoy'] }
    }, {});
  }
};
