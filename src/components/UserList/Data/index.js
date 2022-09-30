var nameList = [
  "Time",
  "Past",
  "Future",
  "Dev",
  "Fly",
  "Flying",
  "Soar",
  "Soaring",
  "Power",
  "Falling",
  "Fall",
  "Jump",
  "Cliff",
  "Mountain",
  "Rend",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Gold",
  "Demon",
  "Demonic",
  "Panda",
  "Cat",
  "Kitty",
  "Kitten",
  "Zero",
  "Memory",
  "Trooper",
  "XX",
  "Bandit",
  "Fear",
  "Light",
  "Glow",
  "Tread",
  "Deep",
  "Deeper",
  "Deepest",
  "Mine",
  "Your",
  "Worst",
  "Enemy",
  "Hostile",
  "Force",
  "Video",
  "Game",
  "Donkey",
  "Mule",
  "Colt",
  "Cult",
  "Cultist",
  "Magnum",
  "Gun",
  "Assault",
  "Recon",
  "Trap",
  "Trapper",
  "Redeem",
  "Code",
  "Script",
  "Writer",
  "Near",
  "Close",
  "Open",
  "Cube",
  "Circle",
  "Geo",
  "Genome",
  "Germ",
  "Spaz",
  "Shot",
  "Echo",
  "Beta",
  "Alpha",
  "Gamma",
  "Omega",
  "Seal",
  "Squid",
  "Money",
  "Cash",
  "Lord",
  "King",
  "Duke",
  "Rest",
  "Fire",
  "Flame",
  "Morrow",
  "Break",
  "Breaker",
  "Numb",
  "Ice",
  "Cold",
  "Rotten",
  "Sick",
  "Sickly",
  "Janitor",
  "Camel",
  "Rooster",
  "Sand",
  "Desert",
  "Dessert",
  "Hurdle",
  "Racer",
  "Eraser",
  "Erase",
  "Big",
  "Small",
  "Short",
  "Tall",
  "Sith",
  "Bounty",
  "Hunter",
  "Cracked",
  "Broken",
  "Sad",
  "Happy",
  "Joy",
  "Joyful",
  "Crimson",
  "Destiny",
  "Deceit",
  "Lies",
  "Lie",
  "Honest",
  "Destined",
  "Bloxxer",
  "Hawk",
  "Eagle",
  "Hawker",
  "Walker",
  "Zombie",
  "Sarge",
  "Capt",
  "Captain",
  "Punch",
  "One",
  "Two",
  "Uno",
  "Slice",
  "Slash",
  "Melt",
  "Melted",
  "Melting",
  "Fell",
  "Wolf",
  "Hound",
  "Legacy",
  "Sharp",
  "Dead",
  "Mew",
  "Chuckle",
  "Bubba",
  "Bubble",
  "Sandwich",
  "Smasher",
  "Extreme",
  "Multi",
  "Universe",
  "Ultimate",
  "Death",
  "Ready",
  "Monkey",
  "Elevator",
  "Wrench",
  "Grease",
  "Head",
  "Theme",
  "Grand",
  "Cool",
  "Kid",
  "Boy",
  "Girl",
  "Vortex",
  "Paradox",
];

function randName() {
  let finalName = "";
  finalName = nameList[Math.floor(Math.random() * nameList.length)];
  finalName += nameList[Math.floor(Math.random() * nameList.length)];
  if (Math.random() > 0.5) {
    finalName += nameList[Math.floor(Math.random() * nameList.length)];
  }
  return finalName;
}

function randRole(i) {
  let rootData = [["Admin", "Trainer"], ["Admin"], ["Trainer"], ["Fresher"]];

  // return rootData[Math.floor(Math.random()*10)%4]
  if (i <= 3 && i > 0) {
    return rootData[1];
  } else if (i <= 5 && i > 3) {
    return rootData[0];
  } else if (i <= 8 && i > 5) {
    return rootData[2];
  } else {
    return rootData[3];
  }
}

const rootData = [];
const ROLE_DATA = [
  {
    id: 1,
    role: "Admin",
  },
  {
    id: 2,
    role: "Trainer",
  },
  {
    id: 3,
    role: "Fresher",
  },
];

for (let i = 1; i <= 55; i++) {
  let username = randName();
  let num = Math.floor(Math.random() * 100);
  let active = i % 10 == 1 ? false : true;
  let user = {
    id: i,
    username: username,
    email: `${username}${num}@gmail.com`,
    status: active,
    role: randRole(i),
  };
  rootData.push(user);
}

let USER_DATA = JSON.parse(JSON.stringify(rootData));

function searchFilterFn(
  obj = {
    search: "",
    filter: [],
  }
) {
  if (obj.filter.length === 0) {
    USER_DATA = rootData;
  } else {
    USER_DATA = rootData.filter((user) => {
      let check = false;
      for (let i = 0; i < obj.filter.length; i++) {
        if (user.role.includes(obj.filter[i].value)) check = true;
      }
      return check;
    });
  }

  if (obj.search !== "") {
    USER_DATA = rootData.filter((user) => {
      let role = user.role.join();
      return (
        user.username.includes(obj.search) ||
        user.email.includes(obj.search) ||
        role.includes(obj.search)
      );
    });
  }
}
function getUserFn(currentPage, size) {
  let data = USER_DATA;
  let totalPage =
    Math.floor(data.length / size) + (data.length % size === 0 ? 0 : 1);
  let res = {
    user: data.filter((user, index) => {
      return (
        index + 1 >= size * (currentPage - 1) + 1 &&
        index + 1 <= size * (currentPage - 1) + size
      );
    }),
    totalPage: totalPage,
  };
  return res;
}
function addUserFn(user) {
  let role = user.role.map((user) => user.value);
  rootData.push({
    ...user,
    role: role,
    id: rootData.length + 1,
    status: true,
  });
}
function deleteUserFn(id) {
  for (let i = 0; i < rootData.length; i++) {
    if (rootData[i].id === id) {
      rootData.splice(i, 1);
      return;
    }
  }
}
function editUSerFn(user) {
  for (let i = 0; i < rootData.length; i++) {
    if (rootData[i].id === user.id) {
      rootData[i] = user;
      return;
    }
  }
}
function deletedUserSelectedFn(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < rootData.length; j++) {
      if (arr[i].id === rootData[j].id) {
        rootData.splice(j, 1);
        break;
      }
    }
  }
}

export {
  USER_DATA,
  ROLE_DATA,
  getUserFn,
  searchFilterFn,
  addUserFn,
  deleteUserFn,
  editUSerFn,
  deletedUserSelectedFn,
};
