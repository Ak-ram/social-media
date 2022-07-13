// API Methods

// Select Elements
const $ = (selector) => document.querySelectorAll(selector);

// Remove the same class from punch of elements
const removeClass = (selectors, className) => {
  selectors.forEach((selector) => {
    let element = document.querySelectorAll(selector);
    element.forEach((ele) => ele.classList.remove(className));
  });
};

// Set multiple properties of root element
const setRootProperty = (propertyName, propertyValue) => {
  for (let i = 0; i < propertyName.length; i++) {
    $(":root")[0].style.setProperty(propertyName[i], propertyValue[i]);
  }
};


// Delete Item

let deleteFunc = (child,parent)=> {
  let targeted = child.closest(parent);
  targeted.remove()
}


// Variables
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;
let primaryHue;

//======================================= START INDICATOR ========================================//

$(".indicator")[0].classList.add("d-none");

//======================================= END INDICATOR ========================================//

//======================================= START SIDEBAR [RIGHT PART] ========================================//

//------------------ #1: Menu items -----------------//

// REMOVE ACTIVE CLASS FROM ALL MENU ITEMS
const changeActiveItem = () => {
  $(".menu-item").forEach((item) => item.classList.remove("active"));
};

// ADD ACTIVE CLASS TO THE CURRENT ITEMS
$(".menu-item").forEach((item) => {
  item.addEventListener("click", (ele) => {
    changeActiveItem();
    item.classList.add("active");
    if (item.id != "notifications") {
      hidePopup();
    } else {
      popupVisbility();
      removeCounter(ele);
    }

    if (item.id == "messages-notifications") {
      removeCounter(ele);
      if (window.screen.availWidth < 992) {
        right.classList.toggle("d-none-small");
        // console.log(right)
      } else {
        // right.classList.add('d-none-small')
        highlightMessageBox();
      }
    } else {
      null;
      hideMessagePart();
    }
  });
});

// ------------ #2: Notification popup --------------

// TOGGLE POPUP VISIBILITY
popupVisbility = () => $(".notification-popup")[0].classList.remove("d-none");

// HIDE POPUP
const hidePopup = () => $(".notification-popup")[0].classList.add("d-none");

// ---------------- #3- SHOW MESSAGE PART ON CLICK ------------------
// HIDE MESSAGE [RIGHT PART]
const hideMessagePart = () => right.classList.add("d-none-small");

// ---------------- #4- SHOW BOOKMARK MODAL ON CLICK ------------------

const bookmarkVisibility = () =>
  $(".bookmarks-modal")[0].classList.toggle("d-none");

$(".bookmarks-modal")[0].addEventListener("click", (e) => {
  e.target.id === "bookmarksModal" ? bookmarkVisibility() : null;
});

bookmark.onclick = bookmarkVisibility;

//===================================== END SIDEBAR [RIGHT PART] =======================================//

//===================================== START MAIN [MIDDLE PART] =======================================//

// #1: LIKE POST RECORDER

$(".feed").forEach((feed) => {
  let heart = feed.querySelector(".liked-btn");
  let photo = feed.querySelector(".photo");
  photo.addEventListener("dblclick", (e) => {
    if (!heart.classList.contains("bi-heart-fill")) {
      heart.classList.remove("bi-heart");
      heart.classList.add("bi-heart-fill");
      let clone = heart.cloneNode(true);
      photo.appendChild(clone);
      setTimeout(() => {
        clone.remove();
      }, 800);
    }
  });
  heart.onclick = () => {
    heart.classList.toggle("bi-heart-fill");
    heart.classList.toggle("bi-heart");
  };
});

// DELETE FEED | POST

$(".feed").forEach((feed) => {
  feed.querySelector(".delete-post").addEventListener("click", (e) => {
    let trashIcon = e.currentTarget;
    let confirmDeletion = feed.querySelector(".confirm-deletion");
    let cancelDeletion = feed.querySelector(".cancel-deletion");

    trashIcon.classList.add("d-none");
    confirmDeletion.classList.remove("d-none");
    cancelDeletion.classList.remove("d-none");
    // removeClass(['.bg-2','.bg-3'],'active')
    cancelDeletion.onclick = () => {
      trashIcon.classList.remove("d-none");
      confirmDeletion.classList.add("d-none");
      cancelDeletion.classList.add("d-none");
    };
  });
});

// BOOKMARK FEED | POST

let createBookmark = (feed) => {
  let clone = feed.querySelector(".user").cloneNode(true);
  let trash = feed.querySelector(".delete-post").cloneNode(true);
  let bookmark = document.createElement("div");
  bookmark.classList.add("bookmark");
  bookmark.append(clone);
  bookmark.append(trash);
  trash.onclick = (e) => {
    deleteFunc(e.currentTarget,".bookmark")
    feed
      .querySelector(".bookmark .bi-bookmark-fill")
      .classList.add("bi-bookmark");

    feed
      .querySelector(".bookmark .bi-bookmark-fill")
      .classList.remove("bi-bookmark-fill");
  };
  document.body.querySelector(".bookmarks-wrapper").append(bookmark);
};

let deleteBookmark = (feed) => {
  let bookmarksWrapper = $("#bookmarksWrapper")[0];
  bookmarksWrapper.querySelectorAll(".bookmark").forEach((bookmark) => {
    let userName = bookmark.querySelector("h3").textContent;
    if (userName === feed.querySelector("h3").textContent) {
      bookmark.remove();
    }
  });
};

$(".bookmark .bi-bookmark").forEach((bookmark) => {
  bookmark.addEventListener("click", (e) => {
    if (e.currentTarget.classList.contains("bi-bookmark")) {
      e.currentTarget.classList.remove("bi-bookmark");
      e.currentTarget.classList.add("bi-bookmark-fill");
      createBookmark(e.target.closest(".feed"));
    } else {
      e.currentTarget.classList.add("bi-bookmark");
      e.currentTarget.classList.remove("bi-bookmark-fill");
      deleteBookmark(e.target.closest(".feed"));
    }

    if (!$("#bookmarksWrapper")[0].querySelectorAll(".bookmark").length) {
      noBookmarks.classList.remove("d-none");
    } else {
      noBookmarks.classList.add("d-none");
    }
  });
});

//===================================== END MAIN [MIDDLE PART] =======================================//

//===================================== START MESSAGE [LEFT PART] =======================================//

// REMOVE MESSAGE COUNT
const removeCounter = (ele) => {
  let element = ele.currentTarget.querySelector(".counter");
  element.classList.add("d-none");
};

// HIGHTLIGHT MESSAGE SECTION

const highlightMessageBox = () => {
  right.style.boxShadow = "0rem 0rem .1rem .15rem var(--color-primary)";
  setTimeout(() => {
    right.style.boxShadow = "none";
  }, 1500);
};

// SEARCH ABOUT USER'S MESSAGES

$("#msg-search-bar")[0].addEventListener("keyup", (e) => {
  let val = e.target.value.toLowerCase();
  $(".message").forEach((chat) => {
    let userName = chat.querySelector("h5").textContent.toLowerCase();
    if (userName.indexOf(val) == -1) {
      chat.style.display = "none";
    } else {
      chat.style.display = "flex";
    }
  });
});

//===================================== END MESSAGE [LEFT PART] =======================================//

//===================================== START THEME CUSTOMIZATION =======================================//

// #1: THEME MODAL : OPEN & CLOSE
$("#theme")[0].addEventListener("click", (e) => {
  $(".customize-theme")[0].classList.remove("d-none");
});

$(".customize-theme")[0].addEventListener("click", (e) => {
  if (e.target.classList.contains("customize-theme")) {
    $(".customize-theme")[0].classList.add("d-none");
  }
});

// #2: FONT SIZE CUSTOMIZATION

// REMOVE ACTIVE CLASS FROM ALL SPANS | FONT-SIZES
const removeSizeSelector = () => {
  $(".choose-size span").forEach((size) => {
    size.classList.remove("active");
  });
};

// CHANGE SIZES
$(".choose-size span").forEach((size) => {
  size.addEventListener("click", () => {
    removeSizeSelector();
    let fontSize;
    size.classList.toggle("active");

    let currentSize = size.classList[0];
    switch (currentSize) {
      case "font-size-1":
        fontSize = "10px";
        setRootProperty(
          ["--sticky-top-left", "--sticky-top-right"],
          ["5.4rem", "5.4rem"]
        );
        break;
      case "font-size-2":
        fontSize = "13px";
        setRootProperty(
          ["--sticky-top-left", "--sticky-top-right"],
          ["5.4rem", "-7rem"]
        );
        break;
      case "font-size-3":
        setRootProperty(
          ["--sticky-top-left", "--sticky-top-right"],
          ["-2rem", "-17rem"]
        );
        fontSize = "16px";
        break;
      case "font-size-4":
        fontSize = "19px";
        setRootProperty(
          ["--sticky-top-left", "--sticky-top-right"],
          ["-5rem", "-25rem"]
        );
        break;
      case "font-size-5":
        fontSize = "22px";
        setRootProperty(
          ["--sticky-top-left", "--sticky-top-right"],
          ["-12rem", "-35rem"]
        );
        break;
    }

    document.querySelector("html").style.fontSize = fontSize;
  });
});

// #3: COLOR CUSTOMIZATION

// REMOVE ACTIVE CLASS FROM ALL SPANS | COLORS
const changeActiveColorClass = () => {
  $(".choose-color span").forEach((colorPicker) => {
    colorPicker.classList.remove("active-color");
  });
};

// CHANGE PRIMARY COLOR
$(".choose-color span").forEach((color) => {
  color.addEventListener("click", (e) => {
    changeActiveColorClass();
    e.target.classList.add("active-color");

    let color = e.target.classList[0];
    switch (color) {
      case "color-1":
        primaryHue = 252;
        break;
      case "color-2":
        primaryHue = 52;
        break;
      case "color-3":
        primaryHue = 352;
        break;
      case "color-4":
        primaryHue = 152;
        break;
      case "color-5":
        primaryHue = 202;
        break;
    }

    $(":root")[0].style.setProperty("--color-primary-hue", primaryHue);
  });
});

// #4: BACKGROUND-COLOR CUSTOMIZATION

// CHANGE BACKGROUND-COLOR
const changeBG = () => {
  setRootProperty(
    [
      "--light-color-lightness",
      "--white-color-lightness",
      "--dark-color-lightness",
    ],
    [lightColorLightness, whiteColorLightness, darkColorLightness]
  );
};

// Light background [[Default]]
$(".bg-1")[0].addEventListener("click", () => {
  darkColorLightness = "95%";
  whiteColorLightness = "100%";
  lightColorLightness = "95%";

  // add active class
  $(".bg-1")[0].classList.add("active");

  // remove active class from the others
  removeClass([".bg-2", ".bg-3"], "active");
  changeBG();
});

// Dim background
$(".bg-2")[0].addEventListener("click", () => {
  // add active class
  $(".bg-2")[0].classList.add("active");

  // remove active class from the others
  removeClass([".bg-1", ".bg-3"], "active");

  // remove customize changes from local storage
  window.location.reload();
});

// LIGHT OUT background
$(".bg-3")[0].addEventListener("click", () => {
  darkColorLightness = "95%";
  whiteColorLightness = "10%";
  lightColorLightness = "0%";

  // add active class
  $(".bg-3")[0].classList.add("active");

  // remove active class from the others
  removeClass([".bg-1", ".bg-2"], "active");
  changeBG();
});
//===================================== END THEME CUSTOMIZATION =======================================//
