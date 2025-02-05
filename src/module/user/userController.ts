import CrudService from "../../service/crudService";
import User from "./userModel";

export const userCrudService = new CrudService(User, 'User')


