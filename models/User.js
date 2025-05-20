const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init({
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                set(value) {
                    // Hash the password whenever it's set/changed
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(value, salt);
                    this.setDataValue('password', hash);
                }
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            }
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: true,
            hooks: {
                beforeUpdate: (user) => {
                    // If password is being updated, re-hash it
                    if (user.changed('password')) {
                        const salt = bcrypt.genSaltSync(10);
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                }
            },
            defaultScope: {
                attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            },
            scopes: {
                withPassword: {
                    attributes: { include: ['password'] },
                },
            },
        });
    }

    // Method to compare passwords
    validPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

module.exports = User;