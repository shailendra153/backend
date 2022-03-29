const { response } = require('express');
const { request } = require('express');
const User = require('../model/user.model');
exports.signUp = (request, response, next) => {
    console.log(request.body);
    const user = new User();
    user.name = request.body.name;
    user.email = request.body.email;
    user.password = request.body.password;
    user.save()
        .then(result => {
            console.log(result)
            return response.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "OOps! Something Went Wrong" })
        })
}
exports.signin = (request, response, next) => {
    console.log(request.body);
    User.findOne({ email: request.body.email, password: request.body.password })
        .then(result => {
            console.log(result);
            if (result)
                return response.status(200).json(result);
            else
                return response.status(204).json({ message: "No user Found" })
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "OOps!Something Went Wrong" });
        })
}
exports.userList = (request, response, next) => {
    User.find()
        .then(result => {
            console.log(result);
            if (result)
                return response.status(200).json(result);
            else
                return response.status(204).json({ message: "No user Found" })
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "OOps!Something Went Wrong" });
        })

}