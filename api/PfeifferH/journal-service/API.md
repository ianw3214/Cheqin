# API Documentation

Check out https://github.com/ianw3214/Cheqin for the full project.

## Usage

### getSession:

  Takes sessionId (required), and either a userToken or userId (required). Outputs the session data.

### getSessions:

  Takes a userToken or userId (required and outputs the complete list of sessions and their data.

### getUser:

  Takes a userToken (required) and outputs the user's attributes.

### updateSession:

  Takes a sessionId (required), either a userId or userToken (required), the user text input, and the user emotion object. Does not output, but updates the Firestore session document.