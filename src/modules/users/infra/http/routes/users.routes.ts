import { Router } from 'express'

import multer from 'multer'

import uploadConfig from '@config/upload'

import UserAvatarController from '../controllers/UserAvatarController'
import UsersController from '../controllers/UsersController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const upload = multer(uploadConfig)

const router = Router()
const userAvatarController = new UserAvatarController()
const usersController = new UsersController()

router.post('/', usersController.create)

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
)

export default router
