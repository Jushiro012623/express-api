import express, { Express } from 'express'
import Server from './server'
import db from './database'
class Application {
    public async initialize() : Promise<void> {
        const app : Express = express()
        const server = new Server(app)
        await db.start()
        server.start()
        Application.handleExit();
    }
    private static handleExit () {
        process.on('uncaughtException', (error: Error) => {
            console.error(`There was an uncaught error: ${error}`);
            Application.shutDownProperly(1);
        });
    
        process.on('unhandledRejection', (reason: Error) => {
            console.error(`Unhandled rejection at promise: ${reason}`);
            Application.shutDownProperly(2);
        });
    
        process.on('SIGTERM', () => {
            console.error('Caught SIGTERM');
            Application.shutDownProperly(2);
        });
    
        process.on('SIGINT', () => {
            console.error('Caught SIGINT');
            Application.shutDownProperly(2);
        });
    
        process.on('exit', () => {
            console.error('Exiting');
        });
    }
    private static shutDownProperly(exitCode: number): void {
        Promise.resolve()
        .then(() => {
            console.info('Shutdown complete');
            process.exit(exitCode);
        })
        .catch((error) => {
            console.error(`Error during shutdown: ${error}`);
            process.exit(1);
        });
    }
}
const application : Application = new Application();
application.initialize()


