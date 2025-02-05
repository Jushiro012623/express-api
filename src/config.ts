import 'dotenv/config'

class Config {

    public PORT: number
    public ENV : string
    public BASE_URL : string
    public DB_USERNAME : string
    public DB_PASSWORD : string
    public DB_HOST : string
    public DB_DIALECT : any
    public DB_NAME : string
    public JWT_SECRET : string
    public JWT_EXPIRE : any
    public RATE_LIMITER : any
    public NODEMAILER_USERNAME : string
    public NODEMAILER_PASSWORD : string
    public NODEMAILER_PORT : string
    public NODEMAILER_HOST : string
    public NODEMAILER_EMAIL : string

    constructor(){
        this.PORT = parseInt(process.env.PORT || '5000')
        this.ENV = process.env.NODE_ENV || 'development'
        this.BASE_URL = process.env.BASE_URL || '/api/v1'
        this.DB_USERNAME = process.env.DB_USERNAME || 'root';
        this.DB_PASSWORD = process.env.DB_PASSWORD || '';
        this.DB_HOST = process.env.DB_HOST || '127.0.0.1';
        this.DB_DIALECT = process.env.DB_DIALECT || 'mysql';
        this.DB_NAME = process.env.DB_NAME || 'booking_api';
        this.JWT_SECRET = process.env.JWT_SECRET_KEY || 'secret';
        this.JWT_EXPIRE = process.env.JWT_EXPIRE || '1h';
        this.RATE_LIMITER = {
            windowMs: 15 * 60 * 1000,
            max: 150,
            message: 'Too Many Request from this IP, please try again in an hour' 
        }
        this.NODEMAILER_USERNAME = process.env.NODEMAILER_USERNAME || 'maddison53@ethereal.email'
        this.NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD || 'jn7jnAPss4f63QBp6D'
        this.NODEMAILER_PORT = process.env.NODEMAILER_PORT || '506' 
        this.NODEMAILER_HOST = process.env.NODEMAILER_HOST || 'smtp.ethereal.email'
        this.NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL || 'nodemailer@express.api'
        
    }

}

export default new Config()