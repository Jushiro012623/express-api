import { Router } from "express";
import { userCrudService as user } from "./userController";
import { register as createOne } from "../auth/authController";
import { requireUniqueUser } from "./userMiddleware";
const router = Router()

// Basic Controller
router.get('/', user.getAll)
router.post('/', createOne)
router.get('/:id', user.getOne)
router.patch('/:id', requireUniqueUser,user.updateOne)
router.delete('/:id', user.deleteOne)


export { router as UserRoutes}