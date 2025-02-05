import { DataTypes, Model } from 'sequelize';
import database from '../../database'; // Import the existing database connection

class Password_Reset_Tokens extends Model {
    public user_id!: string;
    public token!: string;
    public expiration!: string;
}
Password_Reset_Tokens.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiration: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: database.sequelize(), // Use the existing database connection
    modelName: 'Password_Reset_Tokens',
});

export default Password_Reset_Tokens;
