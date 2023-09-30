const setUser = async (userdata) => {
  console.log(userdata);
  console.log("setUser function called");
  try {
    const { uid, name, email } = userdata;
    // If the user doesn't exist in Firebase, insert into your database
    // const newUser = await client.query(
    //   'INSERT INTO "user" (uid, name, email) VALUES ($1, $2, $3)',
    //   [uid, name, email]
    // );
    console.log(userdata);
  } catch (err) {
    console.log(err);
  }
};

const handleUserSignup = async (req, res) => {
  // console.log("singup function called");
  const { uid, email, name } = req.decodedToken;
  // Validate required fields
  if (!uid) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // console.log(uid);
  try {
    const userData = {
      uid,
      name,
      email,
    };

    const newUser = await setUser(userData); // Create a new user using setUser
    // console.log(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error:", error);
    if (error.status === 400) {
      return res.status(400).json({ error: error.message });
    }
    if (error.status === 200) {
      return res.status(200).json({ message: "User already exists." });
    }
    res.status(500).json({ error: "Error creating user" });
  }
};

module.exports = {
  handleUserSignup,
};
