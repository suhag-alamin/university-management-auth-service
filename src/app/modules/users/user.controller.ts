import { RequestHandler } from 'express'
import { UserService } from './user.services'

const createUserToDB: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  createUserToDB,
}
