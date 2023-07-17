const Address = require('./models/Address');
const addresses = require('./data/addresses')

async function seedWithDummyData() {
    try {
        // CLEAR DB
        await Address.deleteMany({});

        await Address.insertMany(addresses);
        console.log(`${addresses.length} addresses seeded successfully`);
    } catch (error) {
        console.error(`Error seeding data: ${error}`);
        process.exit(1);
    }
}

module.exports = seedWithDummyData