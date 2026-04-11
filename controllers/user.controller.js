
export function getAllUsers(req, res) {
    res.json({ message: "Get all users" });
}

export function createUser(req, res) {
    res.json({ message: "Create a new user" });
}

export function getUserById(req, res) {
    res.json({ message: `Get user with ID ${req.params.id}` });
}

export function updateUser(req, res) {
    res.json({ message: `Update user with ID ${req.params.id}` });
}

export function deleteUser(req, res) {
    res.json({ message: `Delete user with ID ${req.params.id}` });
}