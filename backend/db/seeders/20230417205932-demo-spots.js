'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Rainbow Street',
        city: 'Amherst',
        state: 'Maple Island',
        country: 'Maple World',
        lat: 300.6534,
        lng: 355.4252,
        name: "Lucas' Home",
        description: 'Miss being young and reckless? Come stay at my home where you can forget about being old! Close proximity to Snail Park.',
        price: 100,
      },
      {
        ownerId: 1,
        address: '123 Maple Road',
        city: 'SouthPerry',
        state: 'Maple Island',
        country: 'Maple World',
        lat: 213.4215,
        lng: 322.2512,
        name: 'Biggs Wooden Ship',
        description: 'Need a cruise? Come ABOARD the ship to Maple Island!',
        price: 500,
      },
      {
        ownerId: 1,
        address: '123 Harbor Beach',
        city: 'Lith Harbor',
        state: 'Victoria Island',
        country: 'Maple World',
        lat: 80.543,
        lng: 100.343,
        name: "John The Fisherman's Beach Home",
        description: 'Need some fresh air? Come stay at my beach house!',
        price: 500,
      },
      {
        ownerId: 2,
        address: '123 Perion Street',
        city: 'Perion',
        state: 'Victoria Island',
        country: 'Maple World',
        lat: 55.412,
        lng: 143.987,
        name: "Dances with Balrog's Warrior Sanctuary",
        description: 'Want to dance and have some fun while being the strongest? Come stay at my sanctuary and get some GAINS!',
        price: 1000,
      },
      {
        ownerId: 2,
        address: '123 Lego Boulevard',
        city: 'Ludibrium',
        state: 'Ludas Lake',
        country: 'Ossyria',
        lat: 212.244,
        lng: 251.641,
        name: "Geanie's Potion Room",
        description: 'Planning to enjoy legoland? Stay the night and grab free vitalizers on us!',
        price: 5000,
      },
      {
        ownerId: 3,
        address: '123 Kerning Blvd',
        city: 'Kerning City',
        state: 'Victoria Island',
        country: 'Maple World',
        lat: 100.1321,
        lng: 155.5242,
        name: "Dark Lord's Secret Hideout",
        description: "Want to run away and not be found? Come stay here at the secret hideout. As John Cena says... YOU CAN'T SEE ME",
        price: 1000,
      },
      {
        ownerId: 3,
        address: '123 Orbis Tower',
        city: 'Orbis',
        state: 'El Nath Mountains',
        country: 'Ossyria',
        lat: 326.743,
        lng: 423.152,
        name: "Statues In Tower",
        description: 'Looking for highest place to stay? Come stay a night at the tower! Make sure to bring extra warm clothes.',
        price: 5000,
      },
      {
        ownerId: 4,
        address: '123 ForestTree Drive',
        city: 'Ellinia',
        state: 'Victoria Island',
        country: 'Maple World',
        lat: 155.2512,
        lng: 205.6432,
        name: "Grendel the Really Old's Magic Library",
        description: 'Love the nature? The Magic Library is where you want to be! Lots of books to read while in a tree!',
        price: 800,
      },
      {
        ownerId: 4,
        address: '123 Aqua Road',
        city: 'Aquarium',
        state: 'Aqua Road',
        country: 'Ossyria',
        lat: 393.732,
        lng: 543.131,
        name: "Pianus' Cave",
        description: 'Feeling Adventurious? Come stay a night in a cave under water!',
        price: 5000,
      },
      {
        ownerId: 5,
        address: '123 Mushroom Drive',
        city: 'Henesys',
        state: 'Victoria Island',
        country: 'Maple World',
        lat: 205.1532,
        lng: 260.6542,
        name: "Athena Pierce's Bowman Instructional School",
        description: 'Want to release some stress? Come stay a night at this school where you can launch arrows on mushrooms and slimes!',
        price: 1000,
      },
      {
        ownerId: 5,
        address: '51 Area Street',
        city: 'Omega Sector',
        state: 'Ludas Lake',
        country: 'Ossyria',
        lat: 13213.244,
        lng: 32132.641,
        name: "The PilotHouse",
        description: 'Believe in extraterrestrials? Come stay a night and see for yourself!',
        price: 10000,
      },
      {
        ownerId: 6,
        address: '123 Nautilus Road',
        city: 'Nautilus',
        state: 'Victoria Island',
        country: 'Maple World',
        lat: 432.321,
        lng: 241.341,
        name: "Kyrin's Navigation Room",
        description: 'Never driven a ship? Come stay a night and learn!',
        price: 1500,
      },
      {
        ownerId: 6,
        address: '213 Wilshire Boulevard',
        city: 'Korean Folk Town',
        state: 'Ludas Lake',
        country: 'Ossyria',
        lat: 212.244,
        lng: 251.641,
        name: "Hongbu's Bamboo House",
        description: 'Want to learn the Korean Culture? Come stay here and eat ALL YOU CAN EAT KBBQ!',
        price: 8000,
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      country: { [Op.in]: ['Maple World', 'Ossyria'] }
    }, {});
  }
};
