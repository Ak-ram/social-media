let feeds = document.getElementsByClassName("feeds")[0];
let stories = document.getElementsByClassName("stories")[0];
let Notifications = document.getElementsByClassName("notification-popup")[0];
let friendRequests = document.getElementsByClassName("friend-requests")[0];
let messages = document.getElementsByClassName("messages")[0];





// create new post
let createPost = (feed) => {
  let post = `
  <div class="feed">
  <div class="head">
    <div class="user">
      <div class="profile-photo">
        <img src=${feed.profilePhoto} alt="" />
      </div>
      <div class="ingo">
        <h3>${feed.userName}</h3>
        <small>${feed.location}, ${feed.postTime}</small>
      </div>
    </div>
    <span class="cursor-pointer">
      <i class="delete-post bi bi-trash3"></i>
      <b class='confirm-deletion delete-post d-none' onclick="deleteFunc(this,'.feed')"><i class="bi bi-trash3"></i> Delete Post</b>
      <b class='cancel-deletion delete-post d-none'>Cancel</b>
    </span>
  </div>
  <div class="photo">
    <img src=${feed.postContent} alt="" />
  </div>
  <div class="action-button">
    <div class="interaction-buttons">
      <span><i class="bi bi-heart liked-btn"></i></span>
      <span><i class="bi bi-chat-left-dots"></i></span>
      <span><i class="bi bi-share"></i></span>
    </div>
    <div class="bookmark cursor-pointer">
      <span><i class="bi bi-bookmark"></i></span>
    </div>
  </div>
  
  <div class="liked-by">
    <span>
      <img src="./images/feed-6.jpg" alt="" />
    </span>
    <span>
      <img src="./images/feed-2.jpg" alt="" />
    </span>
    <span>
      <img src="./images/feed-5.jpg" alt="" />
    </span>
    <p>
      Liked by <b>${feed.likedBy.userOne.name}</b>, <b>${feed.likedBy.userTwo.name}</b>, and
      <b>332 others</b>
    </p>
  </div>
  <div class="comments text-muted">View all ${feed.commentsNumber} comments</div>
  </div>
  `;
  feeds.innerHTML += post;
};

// create Stories
let createStories = (storyItem) => {
  let story = `
  <div class="story">
    <div class="profile-photo">
        <img src=${storyItem.storyUrl} alt="" />
      </div>
    <p class="name">${storyItem.userName}</p>
  </div>
  `;

  stories.innerHTML += story;
};

// create Friend Request
let createFriendRequest = (request) => {
  let friendRequest = `
  <div class="request">
              <div class="info">
                <div class="profile-photo">
                  <img src=${request.userUrl} alt="" />
                </div>
                <div>
                  <h5>${request.userName}</h5>
                  <p class="text-muted">${request.mutal} mutual friends</p>
                </div>
              </div>
              <div class="action">
                <button class="btn btn-primary">Accept</button>
                <button class="btn" onclick="deleteFunc(this,'.request')">Decline</button>
              </div>
            </div>
  
  `;

  friendRequests.innerHTML += friendRequest;
};

// create Notification
let createNotification = (notify) => {
  let notification = `
  <div>
  <div class="profile-photo">
    <img src=${notify.userUrl} alt="" />
  </div>
  <div class="notification-body">
    <b>${notify.userName}</b> accepted your friend request
    <small class="text-muted">${notify.time}</small>
  </div>
</div>
`;
  Notifications.innerHTML += notification;
};

// createMsg
let createMsg = (msg) => {
  let message = `
  <div class="message">
  <div class="profile-photo">
    <img src=${msg.userUrl} alt="" />
    <div class="active"></div>
  </div>
  <div class="message-body">
    <h5>${msg.userName}</h5>
    <p class="text-muted">${msg.msgBody}</p>
  </div>
</div>`;
  messages.innerHTML += message;
};

// loadScript
let loadScript = (src) => {
  let indexScript = document.createElement("script");
  indexScript.src = src;
  document.head.append(indexScript);
};

let factory = (array, creationFunc) =>
  array.forEach((item) => creationFunc(item));


// Using Promise Class
// fetch("https://mocki.io/v1/6b8abc6b-3fcf-4bb8-aaa4-830a830001f0")
//   .then((response) => response.json())
//   .then((data) => {
//     factory(data[3].feeds, createPost);
//     return data;
//   })
//   .then((data) => {
//     factory(data[0].stories, createStories);
//     return data;
//   })
//   .then((data) => {
//     factory(data[4].notification, createNotification);
//     return data;
//   })
//   .then((data) => {
//     factory(data[1].friendRequests, createFriendRequest);
//     return data;
//   })
//   .then((data) => factory(data[2].messages, createMsg))
//   .finally(() => loadScript("./index.js"));




// USING async / await Standard
(async function fetching() {
  try{
    let data = await fetch(
      "https://mocki.io/v1/78d3b7b0-ae5b-48a6-bd9e-7e394139edd3"
    );
    let result = await data.json();
    factory(result[0].stories, createStories);
    factory(result[1].friendRequests, createFriendRequest);
    factory(result[2].messages, createMsg);
    factory(result[3].feeds, createPost);
    factory(result[4].notification, createNotification);
    loadScript("./index.js");
  }
  catch{
    console.log(new Error('error occurs'))
  }
})();
