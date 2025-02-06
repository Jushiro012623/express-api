import { DataTypes, Model } from 'sequelize';
import database from '../../database'; // Import the existing database connection

class User extends Model {
    public username!: string;
    public password!: string;
    public email!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: database.sequelize(),
    modelName: 'User',
});

export default User;
