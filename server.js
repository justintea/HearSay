//? this is the 2nd method to implement Speech-Text plugin. for 1st method, see end of page.
//? this method requires: 'npm i fs'

//* require block
require("dotenv").config();
// require("./config/database");

const express = require("express");
const path = require("path");
const logger = require("morgan");

//* router requires
// const usersRouter = require("./routes/usersRouter")
// const ordersRouter = require("./routes/ordersRouter")
// const addressesRouter = require("./routes/addressesRouter")

//* openai import
const OpenAI = require('openai');
const fs = require('fs');

//* middleware block
const app = express();
app.use(logger("dev"));
app.use(express.json());
//* Middleware to verify token and assign user object of payload to req.user.
// app.use(require('./config/checkToken'));

// app.use(express.static(path.join(__dirname, "dist")));
// app.use("/api/users", usersRouter);
// app.use("/api/orders", ordersRouter);
// app.use("/api/addresses", addressesRouter);

//* gpt middleware
const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY
  // apiKey: ''
  // apiKey: ''

});

//* a list of functionalities:
//* 1. text - text
//* 2. speech - text

//? #2 gpt code for speech-text transcription
const speechTextConvertor = async () => {
  const stResponse = await openai.audio.transcriptions.create({
    // file: fs.createReadStream('testrecording_WPTN2_20240318.m4a'),
    // file: fs.createReadStream('testrecording_20240318_forWhisper.m4a'),
    // file: fs.createReadStream('testrecording_20240318_forWhisper.m4a'),
    model: 'whisper-1',
  });
  console.log(stResponse);
  return stResponse.text; 
}

// speechTextConvertor();
//? return response and pass to chat

app.post("/api/sendData", async (req, res) => {
    try {

    const transcription = await speechTextConvertor(); 
  
    const summaryResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        'role': 'user',
        'content': `I am passing you an audio file, and when transcribed, it says this: ${transcription}. Please answer a few questions below: 
        1. About this audio: What do you think this is about? Explain if it is likely a song, poem, article, history, etc?  and what it is less likely to be. 
        2. Summary: Can you summarize the content?
        3. Presence: How many different people do you hear in this audio? 
        4. Likely audience: Who do you think this content is most likely written for? List examples of occupations or roles which may be recipients of such audio.
        5. Full transcript: ${transcription}
        Note: after each section, please leave a space before starting the next section. When starting each section, please write the header as I wrote, and start each answer below its header.
        `
      }],
      max_tokens: 700
    });

    console.log(summaryResponse);
    console.log(summaryResponse.choices[0].message);

    res.status(200).json({
      success: true,
      message: "Data sent successfully",
      responseData: summaryResponse.choices[0].message, // Include the GPT-3 response content
    });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


//? 20240319 1730 trying to do POST to AWS s3





//? #1 gpt code for chat assistant
// app.post("/api/sendData", async (req, res) => {
//   try {
//     const { favArtist, favSong, performanceLocation } = req.body;

//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [{
//         'role': 'user',
//         'content': `I am going to a concert, and being a super passionate fan of ${favArtist}, I would like to have an information guide on my concert experience - all the things I should know, have, prepared in advance, in order to enjoy. 
//         5 Specific topics I would like to know:
//         1. Basic information about ${favArtist}, and recent updates or gossip or tensions with media or recording firms. 
//         2. Top 3 most-played songs and top selling (by total sales) album of ${favArtist}.
//         3. When going to ${favArtist}'s concerts, what should I know about? eg. practices from other fans, dressing, exchange of items (what specifically? eg. bracelets), any name the fans are called by, estimated number of fans of ${favArtist} worldwide. Share what is specific to ${favArtist}'s concerts, and avoid sharing general concert etiquette. 
//         4. Interesting facts or details to my favourite song, ${favSong}, who is it for or about, why it was written (elaborate on this more), etc.
//         5. Fun facts about ${favArtist}, facts that most people don't know, eg. does ${favArtist} have any history or past performance at ${performanceLocation} (If the artist has performed at ${performanceLocation} before, indicate the most recent year and month the artist did), recent dating history, does the artist act or engage in other entertainment activites, etc. 
//         As you generate the guide, so summarize the 5 headers, especially number 4.
//         `
//       }],
//       max_tokens: 1200
//     });

//     console.log(response);
//     console.log(response.choices[0].message);

//     res.status(200).json({
//       success: true,
//       message: "Data sent successfully",
//       responseData: response.choices[0].message, // Include the GPT-3 response content
//     });
//   } catch (error) {
//     console.error("Error processing data:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });


// //* routes block
// app.get("/api/", (req, res) => {
//   res.json({ message: "welcome to the backend" });
// });
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });


//* listen block
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});



//? option 1
//? install axios and form-data
// require("dotenv").config();
// const axios = require('axios');
// const express = require("express");
// const path = require("path");
// const logger = require("morgan");
// const fs = require('fs');
// const FormData = require('form-data');
// const OpenAI = require('openai');

// const app = express();
// app.use(express.json());
// app.use(logger("dev"));

// const filePath = path.join(__dirname, 'testrecording_20240318_forWhisper.m4a');
// const model = 'whisper-1';

//! study this part - FormData and fs and the usage of multipart
// const formData = new FormData();
// formData.append('model', model);
// formData.append('file', fs.createReadStream(filePath));

// axios
//   .post('https://api.openai.com/v1/audio/transcriptions', formData, {
//     headers: {
      // Authorization: `Bearer ${}`,
//       'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
//     },
//   })
//     .then((response) => {
//       console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });