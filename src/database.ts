import 'dotenv/config';
import { Sequelize } from 'sequelize';
import config from './config';
class Database {
    private initSequelize: Sequelize;
    constructor() {
        this.initSequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
            host: config.DB_HOST,
            dialect: config.DB_DIALECT,
            logging: false,
        });
    }
    public sequelize(): Sequelize {
        return this.initSequelize
    }
    public async start() : Promise<void> {
        try {
            await this.sequelize().authenticate();
            console.log('Database connection established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            process.exit(1);
        }
    }
}

export default new Database();
