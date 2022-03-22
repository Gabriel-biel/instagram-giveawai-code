const instaTouch = require('instatouch');
require('dotenv').config();
const fs = require('fs');

// Scrape comments from a post
// For example from this post https://www.instagram.com/p/B7wOyffArc5/
// In this example post id will be B7wOyffArc5 or you can set full URL

//This Function is responsible of writing the content of the golden ticket to a file in system
// @property {object} content - Content of the golden ticked
async function getAllParticipants() {
  try {
    const options = {
      count: 100,
      session: process.env.INSTAGRAM_SESSION_ID
    };
    const comments = await instaTouch.comments('CbZ3GQigpEi', options);
    return comments.collector;
  } catch (error) {
    console.log(error);
  }
};

// This function a winner between all the commenting participants
// @property {array} participants - Array of objects with participants infos
// @reuturns {object} - INfo about the winner of the raffle and the golden ticket number
function pickWinner(participants) {
  const allParticipants = participants.length;
  const pickedTicket = Math.floor(Math.random() * allParticipants);
  const pickedWinner = participants[pickedTicket];
  return pickedWinner;
}

//This function searchs for all the comments in a specified post
// @property {string} postId - the post id to search for
// @reurns {array} - All the comments found in the specified post
function writeGoldenTicket(winner) {
  fs.writeFile('goldenTicket.json', JSON.stringify(winner, null, 2), (err) => {
    if (err) console.log(err);
  })
}

//Main execution function
async function main() {
  const participants = await getAllParticipants();
  const goldenTicket = pickWinner(participants);
  writeGoldenTicket(goldenTicket);
}

main();