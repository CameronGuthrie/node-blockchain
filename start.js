'use strict'

// import app from app.js
import {app} from './app.js';

const PORT = process.env.PORT || 9001;
const STARTMESSAGE = process.env.STARTMESSAGE || `Server listening on port ${PORT}`;

// create the listener using the port variable above
app.listen(PORT, () => console.log(STARTMESSAGE));