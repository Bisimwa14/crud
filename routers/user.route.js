import exp from "express";
import { 
    createUser, 
    deleteUser, 
    getUserById, 
    getAllUsers, 
    updateUser 
} from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = exp.Router();

router.use(requireAuth);

router.route("/users")
  .get(getAllUsers)
    .post(createUser);

router.route("/users/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

export default router;