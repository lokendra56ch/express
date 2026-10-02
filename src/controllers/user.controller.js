import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    //* find all users form db
    const allUsers = await User.find({});
    console.log("get all users", req.user); //

    res.status(200).json({
      message: "All users fetched",
      success: true,
      status: "success",
      data: allUsers,
    });
  } catch (error) {
    // res.status(500).json({
    //   message: error?.message ?? "Something went wrong",
    //   success: false,
    //   status: error?.status ?? "error",
    //   data: null,
    // });
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    //* find user by id  form db
    // const user = await User.findById(id);
    const user = await User.findOne({ _id: id });
    if (!user) {
      next({
        message: `user:${id} not found`,
        statusCode: 404,
        status: "fail",
      });
      return;
    }
    res.status(200).json({
      message: `user:${id} fetched`,
      status: "success",
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    // auth
    const { full_name, email, password } = req.body;
    //! validate input
    if (!full_name) {
      next({
        message: `full_name is required`,
        status: "fail",
        success: false,
        statusCode: 400,
      });
      return;
    }
    if (!email) {
      next({
        message: `email is required`,
        status: "fail",
        success: false,
        statusCode: 400,
      });
      return;
    }

    if (!password) {
      next({
        message: `password is required`,
        status: "fail",
        success: false,
        statusCode: 400,
      });
      return;
    }
    // const user = {
    //   _id: users.length + 1,
    //   ...req.body,
    // };

    // users.push(user);

    //? insert new user to db
    const user = await User.create({ full_name, email, password });

    res.status(201).json({
      data: user,
      message: "user created",
      status: "success",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { full_name, email, password } = req.body;
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { full_name, email, password },
      {
        returnDocument: "after",
      },
    );
    if (!user) {
      next({
        message: `user:${userId} not found`,
        statusCode: 404,
        status: "fail",
      });
      return;
    }

    res.status(200).json({
      message: `user: ${userId} updated`,
      success: true,
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    // auth
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      next({
        message: `user:${userId} not found`,
        statusCode: 404,
        status: "fail",
      });
      return;
    }

    res.status(200).json({
      message: `user: ${id} deleted`,
      success: true,
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
