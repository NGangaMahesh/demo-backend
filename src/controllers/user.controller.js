import { asyncHandular } from "../utils/asyncHandular.js";
import {ApiError} from '../utils/ApiError.js'
import {User} from '../modules/user.models.js'
import { uploadOnCloud } from "../utils/cloudinary.js";
import {ApiResponse} from '../utils/ApiResponse.js'


const registerUser = asyncHandular( async (req, res,next) => {
    const  {userName, email, fullName, password} = req.body
    console.log(userName)

    if ([userName, email, fullName, password].some((field) => {
        field?.trim() === ''
    })) {
        return new ApiError(400, "All fields are required")
    }
    const existUser = User.findOne({$or: [{userName}, {email}]})
    if (existUser) {
        throw new ApiError(409, 'User with email or username exist')
    }

    const avatarLocatPath = req.file?.avatar[0]?.path
    const coverImageLocatPath = req.file?.avatar[0]?.path

    if(!avatarLocatPath){
        throw new ApiError(400, 'Avatar is required')
    }

    const avatar = await uploadOnCloud(avatarLocatPath)
    const coverImage = await uploadOnCloud(coverImageLocatPath) 

    if (!avatar) {
        throw new ApiError(400, 'Avatar is required')
    }

    const user = User.create({
        userName,
        avatar: avatar.url,
        coverImage: coverImage?.url || '',
        email,
        fullName,
        password
    })

    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createUser) {
        throw new ApiError(500, "Somthing went wrong")
    }

    return res.status(201).json(
        new ApiResponse(200, createUser, 'user register Successfully')
    )
})

export {registerUser}