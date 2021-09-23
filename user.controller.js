
const {
    create,
    getUsersBYUserId,
    getUsers,
    updateUser,
    deleteUser,
    getUsersByUserEmail,
} = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");


module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                sucess: 1,
                data: results
            });
        });
    },

    getUsersByUserId: (req, res) => {
        const id = req.params.id;
        this.getUsersByUserId(id, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUsers: (req, res) => {
        const body = req.body;
        const salt = getSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "failed to update user"
                })
            }
            return res.json({
                success: 1,
                message: "update successfuly"
            });
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "record not found "

                });
            }
            return res.json({
                success: 1,
                message: "user delete successfuly"

            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUsersByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "invalid email or pssword"
                });
            }
            console.log(results.password)
            const result = compareSync(body.password, results.password);
            if (result) {
                result.password = undefined;
                const jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "log in successfuly",
                    token: jsontoken
                    


                });
            } else {
                return res.json({
                    success: 0,
                    data: "invalid email or password"

                });


            }

        });
    },

};

