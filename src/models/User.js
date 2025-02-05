const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        tg_user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        language_code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        refId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: User, // 'users' would also work
                key: 'id'
            }
        },
        tg_file_id: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true
    }
);

User.belongsTo(User, { as: 'referral', foreignKey: 'refId' });
User.hasMany(User, { as: 'referrals', foreignKey: 'refId' });

module.exports = User;