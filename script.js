const streamersList = document.getElementById('streamers-list');
const filterButtons = document.querySelectorAll('.selectors button');
const first = document.getElementById('first');
let items = document.querySelectorAll('.streamer-item'); 
    
    items = Array.from(items);
   let copystreamersList = []

filterButtons.forEach(button => {
    if(button === first) {
        return ;
    }else{
        button.addEventListener('mouseenter', () => {
           first.classList.remove('active');
        });
    }
    button.addEventListener('mouseleave', () => {
     const isAnyOneHoverd = Array.from(filterButtons).some(btn => btn !== first && btn.matches(':hover'));
     if(!isAnyOneHoverd) {
        first.classList.add('active');
        displayStreamers(copystreamersList);
     }
    })    
    button.addEventListener('click', () => {
         if(button.id === "all") {
                streamersList.innerHTML = '';
              setTimeout(() => {
                displayStreamers(copystreamersList);
              }, 300);
         }else if(button.id === "online-btn") {
                streamersList.innerHTML = '';
             const filteredItems = copystreamersList.filter(item => item.classList.contains('live'));
             displayStreamers(filteredItems);

         }else if(button.id === "offline-btn") {
             streamersList.innerHTML = '';
           let offLine =  copystreamersList.filter(item => item.classList.contains('offline')) 
           displayStreamers(offLine);
         }          
})
})
const displayStreamers = (array)=>{
    array.forEach(item => {
        streamersList.appendChild(item);
    });
}
const clientId = '0ffdqcfdnrensv15pjoqoqlc9ba46q';
const clientSecret = 'jyjr5gv58j9vvyant85mbz11pq02td';
const grantType= 'client_credentials'

const tokenUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`;
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
//fetch user info and stream info
streamers.forEach(streamer => {
    getTwitchUser(streamer).then(data => {
    if(data.data.length > 0) {
        getTwitchStream(streamer).then(streamData => {
            if(streamData.data.length > 0) {
                const stream = streamData.data[0];
                const listItem = document.createElement('li');  
                listItem.classList.add('streamer-item', 'live');
                listItem.innerHTML = `
                <img src="${data.data[0].profile_image_url}" alt="${streamer} profile image" width="100" class="profile-image">
                <div class="stream-info">
                <a href="https://www.twitch.tv/${streamer}" target="_blank">${streamer}</a>
                <p class='status-cols'>${stream.title}</p>   
                </div>
             `;
             copystreamersList.push(listItem);
            } else {
                const listItem = document.createElement('li');  
                listItem.classList.add('streamer-item', 'offline');
                listItem.innerHTML = `
                <img src="${data.data[0].profile_image_url}" alt="${streamer} profile image" width="100" class="profile-image">
               <div class="stream-info">
                <a href="https://www.twitch.tv/${streamer}" target="_blank">${streamer}</a>
                <p class='status-cols'>Offline</p>
                </div>
             `;
                copystreamersList.push(listItem);
                 displayStreamers(copystreamersList); 
            }
        });  
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