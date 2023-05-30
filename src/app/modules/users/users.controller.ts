import { Request, Response } from 'express'
import usersServices from './users.services'

const createUserToDB = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await usersServices.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    })
  } catch (err) {
    res.status(400).json({
      status: false,
      message: 'Failed to create user',
    })
  }
}

export default { createUserToDB }
