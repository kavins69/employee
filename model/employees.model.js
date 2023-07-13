module.exports = (sequelize, Sequelize) => {
    return sequelize.define('profile', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
        },
        salary: {
            type: Sequelize.INTEGER
        }

    }
    )

}