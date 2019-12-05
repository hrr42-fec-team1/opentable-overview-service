const db = require('./index.js');
const Overview = require('../models/restaurant-overview.js');
const faker = require('faker');
const categories = require('./categories.json');
const NUM_OF_SAMPLES = 100;
const NUM_OF_TAGS = 3;

let sampleOverviews = [];

for (let i = 0; i < NUM_OF_SAMPLES; i++) {
  let tags = [];
  for (let j = 0; j < NUM_OF_TAGS; j++) {
    tags.push(faker.commerce.productAdjective());
  }
  let overview = new Overview({
    id: i + 1,
    title: faker.company.companyName(),
    review: Math.floor(Math.random() * 6),
    numOfReviews: Math.floor(Math.random() * 10000),
    pricePerPersonLow: Math.floor(Math.random() * 50),
    pricePerPersonHigh: 50 + Math.floor(Math.random() * 50),
    category: categories[Math.floor(Math.random() * categories.length)],
    topTags: tags,
    description: faker.lorem.paragraph()
  });
  sampleOverviews.push(overview);
}

const insertSampleOverviews = () => {
  Overview.create(sampleOverviews)
    .then(() => db.disconnect());
};

insertSampleOverviews();