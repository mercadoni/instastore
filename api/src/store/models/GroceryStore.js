const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const GroceryStore = sequelize.define('grocery_store', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement : true },
        geom: DataTypes.GEOGRAPHY,
        name: DataTypes.STRING
    },{
        freezeTableName: true
    });
    
    GroceryStore.getNearest = async function(expectedDelivery, lng, lat, maxDistance){
        var point = sequelize.fn('ST_GeographyFromText', 'POINT(' + lng + ' ' + lat +')');
        var distance = sequelize.fn('ST_Distance', sequelize.col('geom'), point);
        return GroceryStore.findOne({
            attributes: [
                'id', 'name', [distance, 'distance'], 'geom',
            ],
            where: sequelize.where(distance, {
                [Op.lte]: maxDistance
            }),
            order:  distance
        });
    }
    
    GroceryStore
    return GroceryStore;
};

