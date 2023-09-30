const { getAuth } = require("firebase-admin/auth");

async function addUID(request, response, next) {
  const authHeader =
    request?.body?.headers?.Authorization ||
    request?.body?.headers?.authorization ||
    request?.headers?.authorization ||
    request?.headers?.Authorization ||
    request?.Authorization ||
    request?.authorization;
  const authToken = authHeader && authHeader.split(" ")[1];
  if (!authToken) {
    return response.status(401).json({
      message: "User Not Authorised",
      error:
        "Authentication required. Please include an 'Authorization' header with a valid Bearer token.",
    }); // Redirect to the login page
  }
  console.log(authToken, "from authmiddleware");
  try {
    getAuth()
      .verifyIdToken(authToken)
      .then((decTok) => {
        request.decodedToken = decTok;
        console.log("calling next");
        console.log(decTok);
        next();
      })
      .catch((err) => {
        console.log(err);
        return response.status(401).json({
          message: "Invalid or expired token",
          error: "Invalid or expired token",
        });
      });

    // Authentication successful, attach the user data to the request for later use
  } catch (error) {
    console.log(error);
    return response.status(403).json({
      message: "Access forbidden",
      error: "Access forbidden",
    }); // Redirect to the login page
  }
}

module.exports = {
  addUID,
};
