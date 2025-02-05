import db from '../src/database';
import User from '../src/module/user/userModel'; // Import the User model
import Password_Reset_Tokens from '../src/module/resetPasswordToken/resetPasswordTokenModel'
(async () => {
    // await db.sequelize().sync({ force: true });
    await User.sync({ force: true });
    await Password_Reset_Tokens.sync({ force: true });
    console.log('The table for the User model was just (re)created!');
})();