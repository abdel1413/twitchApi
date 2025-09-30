const streamersList = document.getElementById('streamers-list');



const clientId = '0ffdqcfdnrensv15pjoqoqlc9ba46q';
const clientSecret = 'jyjr5gv58j9vvyant85mbz11pq02td';
const grantType= 'client_credentials'

const tokenUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`;

// Function to get OAuth token
const streamers = ['freecodecamp', 'ESL_SC2', 'OgamingSC2', 'cretetion', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];

// const oauth2 = curl -X POST "https://id.twitch.tv/oauth2/token" \
//   -d "client_id=0ffdqcfdnrensv15pjoqoqlc9ba46q" \
//   -d "client_secret=jyjr5gv58j9vvyant85mbz11pq02td" \
//   -d "grant_type=client_credentials"



  const token = {"access_token":"yl7ewihwzs7rpmb4r3hok7l7razu9v",
    "expires_in":5599573,
    "token_type":"bearer"
}
  

// const oathb = curl -X GET 'https://api.twitch.tv/helix/users?login=freecodecamp' \
// -H 'Authorization: Bearer yl7ewihwzs7rpmb4r3hok7l7razu9v' \
// -H 'Client-Id:0ffdqcfdnrensv15pjoqoqlc9ba46q'



// {"data":
//     [{"id":"141981764",
//         "login":"twitchdev",
//         "display_name":"TwitchDev",
//         "type":"",
//         "broadcaster_type":"partner",
//         "description":"Supporting third-party developers building Twitch integrations from chatbots to game integrations.",
//         "profile_image_url":"https://static-cdn.jtvnw.net/jtv_user_pictures/8a6381c7-d0c0-4576-b179-38bd5ce1d6af-profile_image-300x300.png",
//         "offline_image_url":"https://static-cdn.jtvnw.net/jtv_user_pictures/3f13ab61-ec78-4fe6-8481-8682cb3b0ac2-channel_offline_image-1920x1080.png",
//         "view_count":0,
//         "created_at":"2016-12-14T20:32:28Z"}]
//     } 



//     {"data":[{"id":"79776140",
//         "login":"freecodecamp",
//         "display_name":"FreeCodeCamp",
//         "type":"",
//         "broadcaster_type":"",
//         "description":"Learn to code for free at freecodecamp.org",
//         "profile_image_url":"https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png","offline_image_url":"https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-channel_offline_image-b8e133c78cd51cb0-1920x1080.png",
//         "view_count":0,
//         "created_at":"2015-01-14T03:36:47Z"}
//     ],
// }

 //get user info
async function getTwitchUser(username) {
    const response = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {       
        headers: {
            authorization: `Bearer ${token.access_token}`,  
            'Client-Id': clientId
        }
    });
    const data = await response.json();
    return data;
}    

//getTwitchUser('freecodecamp').then(data => console.log(data));

streamers.forEach(streamer => {
    getTwitchUser(streamer).then(data => {
    //console.log('stream',data);
    if(data.data.length > 0) {
        const user = data.data[0]; 
        console.log(`${streamer} user info:`); 
        console.log(`user: ${user}`); 
        const listItem = document.createElement('li');  
        listItem.classList.add('streamer-item');
        listItem.innerHTML = `

        <img src="${user.profile_image_url}" alt="${streamer} profile image" width="100" class="profile-image">
        <a href="https://www.twitch.tv/${streamer}" target="_blank">${streamer}</a>
         <div> ${user.description} </div>

        `;
        streamersList.appendChild(listItem);
    } else {
        console.log(`${streamer} user not found.`);     
    }
    });
});


//get stream info
async function getTwitchStream(username) {
    const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${username}`, {       
        headers: {
            authorization: `Bearer ${token.access_token}`,  
            'Client-Id': clientId
        }
    });
    const data = await response.json();
    return data;
}

streamers.forEach(streamer => {
    getTwitchStream(streamer).then(data => {
   // console.log('st',data.data);
    if(data.data.length > 0) {
        const stream = data.data[0]; 
        
        //console.log(`${streamer} is live!`); 
        console.log(` descript: ${stream.description}`); 
        const listItem = document.createElement('li');  
        listItem.innerHTML = `<strong>${streamer}</strong> is live!<br>
        Title: ${stream.title}<br>
        Viewers: ${stream.viewer_count}<br>
        <a href="https://www.twitch.tv/${streamer}" target="_blank"> Watch Now</a>`;
        streamersList.appendChild(listItem);
    } else {
        console.log(`${streamer} is offline.`); 
    }    
    
    });


});
//getTwitchStream('freecodecamp').then(data => console.log(data));