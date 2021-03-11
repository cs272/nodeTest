module.exports = (sequelize,Sequelize) => {
    User =  sequelize.define('notes', {
        note:     Sequelize.TEXT,
    });
    return User;
}