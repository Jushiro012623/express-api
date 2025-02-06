import { Router } from "express";
import { userCrudService as user, createUser } from "./userController";
import { requireUniqueUser } from "./userMiddleware";
const router = Router()

// Basic Controller
router.get('/', user.getAll)
router.post('/', createUser)
router.get('/:id', user.getOne)
router.patch('/:id', requireUniqueUser,user.updateOne)
router.delete('/:id', user.deleteOne)


export { router as UserRoutes}