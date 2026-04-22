
export function getAllUsers(req, res) {
    res.send("Get all users");
}

export function createUser(req, res) {
    res.send("Create a new user");
}

export function getUserById(req, res) {
    res.send(`Get user with ID ${req.params.id}`);
}

export function updateUser(req, res) {
    res.send(`Update user with ID ${req.params.id}`);
}

export function deleteUser(req, res) {
    res.send(`Delete user with ID ${req.params.id}`);
}