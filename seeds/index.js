const mongoose = require('mongoose');
const cities = require('./cities')
const {
    places,
    descriptors
} = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '60213cc71c7cfc124c031d7b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: "https://res.cloudinary.com/db9dlwp6d/image/upload/v1613230702/YelpCamp/kst98imttxgfmvv8zu1c.jpg",
                    filename: "YelpCamp/k8dtql5t6rmxbiv9vymk"
                },
                {
                    url: "https://res.cloudinary.com/db9dlwp6d/image/upload/v1613031335/YelpCamp/dutljfst2tdigh3o4dgm.jpg",
                    filename: "YelpCamp/dutljfst2tdigh3o4dgm"
                }
            ],
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            description: `Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Quisquam beatae provident rem, facere nostrum cum deleniti error aperiam
            soluta omnis dolorum earum, voluptate ducimus consequatur illo minima itaque. Commodi, voluptatibus!`,
            price

        })
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
})