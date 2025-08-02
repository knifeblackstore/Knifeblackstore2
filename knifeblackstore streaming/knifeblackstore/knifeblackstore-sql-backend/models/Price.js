module.exports = (sequelize, DataTypes) => {
    const Price = sequelize.define("Price", {
        platform: {
            type: DataTypes.STRING,
            allowNull: false
        },
        plan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });
    return Price;
};
