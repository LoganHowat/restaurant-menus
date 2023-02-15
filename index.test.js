const {sequelize} = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        // TODO - write test
        let restaurant = Restaurant.create({
            name: 'McDonalds',
            location: 'London',
            cuisine: 'Fast-food'
        });
        expect((await restaurant).dataValues.name).toBe('McDonalds')
        expect((await restaurant).dataValues.location).toBe('London')
        expect((await restaurant).dataValues.cuisine).toBe('Fast-food')
    });

    test('can create a Menu', async () => {
        let menu = Menu.create({
            title: 'MenuTitle',
        });
        console.log(await menu)
        expect((await menu).dataValues.title).toBe('MenuTitle')
    });

    test('can find Restaurants', async () => {
        // TODO - write test
        let foundRes = await Restaurant.findAll({
            where:{
                name:"McDonalds"
            }
        })
        expect(foundRes[0]['name']).toBe('McDonalds');
        expect(foundRes[0]['location']).toBe('London');
        expect(foundRes[0]['cuisine']).toBe('Fast-food');
    });

    test('can find Menus', async () => {
        // TODO - write test
        let foundMenu = await Menu.findAll({
            where:{
                title:"MenuTitle"
            }
        })
        expect(foundMenu[0]['title']).toBe('MenuTitle');
    });

    test('can delete Restaurants', async () => {
        // TODO - write test
        let restaurant2 = Restaurant.create({
            name: 'Test',
            location: 'Test_location',
            cuisine: 'Test_cuisine'
        });
        (await restaurant2).destroy();
        let foundTest = await Restaurant.findAll({
            where:{
                name: "Test"
            }
        })
        expect(foundTest.length).toBe(0);
    });
})