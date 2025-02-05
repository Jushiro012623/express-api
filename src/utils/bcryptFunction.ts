const bcrypt = require("bcrypt");

export const hash = async (hash : string) : Promise<string> => {
    const salt = await bcrypt.genSalt(10) 
    return bcrypt.hash(hash, salt)};

export const compare = async (value : string | number, compare_to : string | number) : Promise<boolean> => await bcrypt.compare(value, compare_to) 

export default {
    hash,
    compare,
}