const registerModel = require('../model/registerModel')
const globalError = require('../errorHandling/globalError')
const asyncErrorHandler = require('../errorHandling/asyncError')


const createNewUser = asyncErrorHandler(async (req, res, next) => {
     
    const {username, tel, email } = req.body

    if(!username ||!tel ||!email) {
        throw new globalError('All fields are required', 400)
    }
    
    const existingUser = await registerModel.findOne({$or: [{username}, {tel}, {email}]})
    
    if(existingUser) {
        throw new globalError('Username, Tel or Email already exists', 400)
    }

    const newUser = await registerModel.create({
        username,
        tel,
        email
    })

    res.status(201).json({
        'status': 'success',
        'message' : 'User registered successfully',
        'data': newUser
    })
})

const getAllUsers = asyncErrorHandler(async (req, res, next ) => {
    const users = await registerModel.find()
    res.status(200).json({
        'status': 'success',
        'data': users
    })
})

const getSingleUser = asyncErrorHandler(async (req, res, next) =>{
    const id = req.params.id

    const user = await registerModel.findById(id)

    res.status(200).json({
        'status': 'success',
        'data': user
    })
})



const updateUser = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id

    const user = await registerModel.findByIdAndUpdate(id, req.body, {new: true});

    res.status(200).json({
        'status': 'success',
        'data': user
    })
})

const deleteUser = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id

    await registerModel.findByIdAndDelete(id)

    res.status(200).json({
        'status': 'success',
        'message': 'User deleted successfully'
    })
})


module.exports = {
    createNewUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}