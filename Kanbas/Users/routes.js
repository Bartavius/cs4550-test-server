import * as dao from "./dao.js";
let currentUser = null;
export default function UserRoutes(app) {
  const createUser = (req, res) => { };
  const deleteUser = (req, res) => { };
  const findAllUsers = (req, res) => { };
  const findUserById = (req, res) => { };


  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    currentUser = dao.findUserById(userId);
    if (!currentUser) {
      res.status(401).json (
        {message: "User not found."}
      );
    }
    res.json(currentUser);
  };


  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    currentUser = dao.createUser(req.body);
    res.json(currentUser);
  };
  const signin = (req, res) => { 
    const { username, password } = req.body;
    currentUser = dao.findUserByCredentials(username, password);
    if (!currentUser) {
      res.status(400).json(
        {message: "Username or password is incorrect."}
      );
      return;
    }
    res.json(currentUser);
  };
  const signout = (req, res) => { };
  const profile = async (req, res) => {
    res.json(currentUser);
  };

  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
}