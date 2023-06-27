const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
    },
},
    {
        hooks: {
            beforeCreate: async (newUser) => {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },
            beforeUpdate: async (updatedUser) => {
                if (updatedUser._changed.has('password')) {
                    updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
                }
                return updatedUser;
            },
        },
        sequelize, 
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

model.exports = User;