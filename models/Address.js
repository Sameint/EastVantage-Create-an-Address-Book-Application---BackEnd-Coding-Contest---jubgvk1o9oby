const mongoose = require('mongoose');

/*
You have to implement a Mongoose schema for an address that includes the name, address, and location of the address. The name and address fields are both required strings. The location field is an object that has two properties: type and coordinates. The type property is a required string and is set to 'Point'. The coordinates property is a required array of two numbers, representing the longitude and latitude of the address.

Additionally, this schema has an index on the location field with a 2dsphere index for geospatial queries.

Here's a sample object for this schema:

{
  name: "John Doe",
  address: "123 Main St, Anytown, USA",
  location: {
    type: "Point",
    coordinates: [-122.4324, 37.7882]
  }
}
*/
const addressSchema = new mongoose.Schema({
    //Write your code here
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
