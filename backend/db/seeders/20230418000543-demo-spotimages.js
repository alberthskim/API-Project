"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://i.imgur.com/nksjT9y.png",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://i.imgur.com/5MpBFyh.png",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://i.imgur.com/e9P4zxm.png",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://i.imgur.com/6J32ts0.png",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://i.imgur.com/pNCLtjG.png",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://i.imgur.com/oiTslYm.png",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.imgur.com/8yegLkb.png",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://i.imgur.com/PHOoaHO.png",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://i.imgur.com/anEoBo4.png",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://i.imgur.com/pNCLtjG.png",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://i.imgur.com/Uzs8Sv7.png",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.imgur.com/2KSuw8u.png",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://i.imgur.com/ZJ5dHQG.png",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://i.imgur.com/nuHSLVE.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://i.imgur.com/GNNDUBp.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://i.imgur.com/34OPrfl.png",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.imgur.com/2WYQjEQ.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://i.imgur.com/uey6e7O.png",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://i.imgur.com/QbasCBV.png",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://i.imgur.com/0taNZUn.png",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://i.imgur.com/19WWpRR.png",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.imgur.com/o6JIMvg.png",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://i.imgur.com/seRq52v.png",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://i.imgur.com/In6hOR7.png",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://i.imgur.com/AB7I8BH.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://i.imgur.com/kAQ8roM.png",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://i.imgur.com/jDG9rWv.png",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://i.imgur.com/vKoeMBb.png",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://i.imgur.com/RWYuwkv.png",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://i.imgur.com/j6MRJ4J.png",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://i.imgur.com/p0xwqxC.png",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://i.imgur.com/KkYjAnW.png",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://i.imgur.com/0fbTpkO.png",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://i.imgur.com/iGFMDwV.png",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://i.imgur.com/EwTAbUu.png",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://i.imgur.com/vlDfnNc.png",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://i.imgur.com/yuHqIY0.png",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://i.imgur.com/J53DFS7.png",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://i.imgur.com/vJJm1yz.png",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://i.imgur.com/4OwSUcF.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://i.imgur.com/wa9IrC1.png",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://i.imgur.com/iymDCvR.png",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://i.imgur.com/ytCyIqM.png",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://i.imgur.com/elQGyNy.png",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://i.imgur.com/AGasrK4.png",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://i.imgur.com/AJ0crlv.png",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://i.imgur.com/YbJ83c1.png",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://i.imgur.com/NngZt8f.png",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://i.imgur.com/HD37aBi.png",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://i.imgur.com/ER9zThh.jpg",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://i.imgur.com/tZm0hJX.png",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://i.imgur.com/DUdQvrj.png",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://i.imgur.com/FZpwF8p.png",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://i.imgur.com/w6mojUZ.png",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://i.imgur.com/fKNHNxE.png",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://i.imgur.com/6MaA65l.png",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://i.imgur.com/nHW7r8V.png",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://i.imgur.com/x3IsTA6.png",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://i.imgur.com/yT8xwBV.png",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://i.imgur.com/6MEsMWY.png",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://i.imgur.com/TaexIVA.png",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://i.imgur.com/ZobLPHl.png",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://i.imgur.com/WlNqdO8.png",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://i.imgur.com/UL6MJh0.png",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://i.imgur.com/zrB4dxz.png",
          preview: false,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
      },
      {}
    );
  },
};
