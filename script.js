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
    if(data.data.length > 0) {
        getTwitchStream(streamer).then(streamData => {
            if(streamData.data.length > 0) {
                const stream = streamData.data[0];
                console.log(`${streamer} is live! Title: ${stream.title}, Viewers: ${stream.viewer_count}`);
                const listItem = document.createElement('li');  
                listItem.classList.add('streamer-item', 'live');
                listItem.innerHTML = `
                <img src="${data.data[0].profile_image_url}" alt="${streamer} profile image" width="100" class="profile-image">
                <div class="stream-info">
                <a href="https://www.twitch.tv/${streamer}" target="_blank">${streamer}</a>
                <p class='status-cols'>${stream.title}</p>   
                </div>
             `;
               streamersList.appendChild(listItem);
            } else {
                console.log(`${streamer} is offline.`);
                const listItem = document.createElement('li');  
                listItem.classList.add('streamer-item', 'offline');
                listItem.innerHTML = `
                <img src="${data.data[0].profile_image_url}" alt="${streamer} profile image" width="100" class="profile-image">
               <div class="stream-info">
                <a href="https://www.twitch.tv/${streamer}" target="_blank">${streamer}</a>
                <p class='status-cols'>Offline</p>
                </div>
             `;
               streamersList.appendChild(listItem);
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






//     getTwitchStream(streamer).then(data => {
    
//             const user = data.data[0];  

//     if(data.data.length > 0) {

//         const stream = data.data[0]; 
//         const listItem = document.createElement('li');  
//         listItem.innerHTML = `<strong>${streamer}</strong> is live!<br>
//         Title: ${stream.title}<br>
//         Viewers: ${stream.viewer_count}<br>
//         <img src="${stream.thumbnail_url.replace('{width}', '300').replace('{height}', '200')}" alt="Stream Thumbnail"><br>
//         <a href="https://www.twitch.tv/${streamer}" target="_blank"> Watch Now</a>`;
//        streamersList.appendChild(listItem);
//     } else {
       
//         console.log(`${streamer} is offline.`); 

//     }    
    
//     });


// });
//getTwitchStream('freecodecamp').then(data => console.log(data));


/**
 * 
 * 
 * The Institutionalization of Disabled People in 20th Century America: A Critical Lens through Disability Studies
Topic Overview

For my initial presentation, I am examining the historical practice of institutionalizing disabled individuals in the United States during the 20th century. This includes the rise and fall of large-scale state hospitals, “asylums,” and training schools that housed people with intellectual, developmental, and psychiatric disabilities. This topic sits at the intersection of disability studies, history, medicalization, and human rights.

Throughout much of the 20th century, disabled people were routinely removed from public life and placed in institutions under the guise of care, protection, or rehabilitation. However, institutions often failed to provide humane conditions or respect the autonomy and dignity of the individuals inside. This legacy is deeply entangled with ableism, eugenics, and societal discomfort with disability, and it continues to shape public policy and perception.

Why This Topic?

I chose this topic because institutionalization represents one of the most visible and traumatic examples of systemic ableism in modern history. Learning about the lived experiences of institutionalized individuals — many of whom were placed involuntarily — opens up essential questions about how society defines "normalcy," who gets to participate in public life, and what counts as a meaningful existence.

The topic is personally important as well, because its legacy persists today in the form of group homes, sheltered workshops, and the ongoing fight for deinstitutionalization and community-based living. Understanding this history helps to reveal how deeply rooted structural barriers to inclusion really are.

Significance to Disability Studies

In the field of disability studies, institutionalization is a key area of critique. It exemplifies how medical and custodial models of disability have historically overshadowed social and human rights models. Rather than treating disabled individuals as full citizens with rights, institutions often treated them as passive subjects requiring management and control.

This topic challenges the medical model’s emphasis on "fixing" or isolating the disabled body and instead aligns with the social model of disability, which focuses on how societal structures — like institutions — create disabling conditions. Disability scholars argue that institutions are not just places of confinement, but systems of oppression that reflect broader cultural anxieties about dependency, productivity, and bodily difference.

The Role of Institutionalization in Disability Studies

Institutionalization plays several critical roles in disability studies:

Historical example of systemic discrimination and exclusion.

Case study for critiquing the medical model and advocating for the social model.

Evidence base for understanding how laws, policies, and public opinion evolve.

Catalyst for disability rights activism (e.g., the closure of Willowbrook, the rise of the Independent Living Movement).

By studying institutions, we also uncover how disability intersects with race, gender, class, and sexuality, as marginalized groups were often disproportionately institutionalized.

What This Topic Suggests About Historical Treatment of Disabled People

The institutionalization of disabled people throughout the 20th century suggests that society viewed disability as something to be hidden, controlled, or corrected rather than understood and accepted. Disabled individuals were often stripped of their autonomy, subjected to inhumane conditions, and denied access to education, employment, and family life.

This period reflects a broader cultural devaluation of disabled lives — one that persists today in more subtle forms, such as lack of accessibility, low expectations, and ongoing segregation. It also reveals the roots of modern advocacy efforts, many of which emerged in direct response to the harms caused by institutional living.

Preliminary List of 10 Sources (APA format)

Bogdan, R., & Taylor, S. J. (1994). The social meaning of mental retardation: Two life stories. Teachers College Press.

Carey, A. C. (2009). On the margins of citizenship: Intellectual disability and civil rights in twentieth-century America. Temple University Press.

Johnson, K. M. (1998). Deinstitutionalizing women: An ethnographic study of institutional closure. SUNY Press.

Longmore, P. K., & Umansky, L. (Eds.). (2001). The new disability history: American perspectives. NYU Press.

Noll, S. (2005). Feeble-minded in our midst: Institutions for the mentally retarded in the South, 1900–1940. University of North Carolina Press.

O'Brien, J., & Lovett, H. (1992). Finding a way toward everyday lives: The contribution of person-centered planning. Inclusion Press.

Pelka, F. (2012). What we have done: An oral history of the disability rights movement. University of Massachusetts Press.

Trent, J. W. (1994). Inventing the feeble mind: A history of mental retardation in the United States. University of California Press.

Wolfensberger, W. (1975). The origin and nature of our institutional models. Human Policy Press.

Wilkerson, A. (2015). Disability, sex radicalism, and political agency. Hypatia, 30(1), 1–19. https://doi.org/10.1111/hypa.12120
 */