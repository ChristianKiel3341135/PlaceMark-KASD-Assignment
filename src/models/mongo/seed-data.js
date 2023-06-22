import {db} from "../db.js";

export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
      isAdmin: false,
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
      isAdmin: false,
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
      isAdmin: false,
    },
    admin: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@user.com",
      password: "admin",
      isAdmin: true,
    },
  },

  categories:{
    _model: "Category",
    entertainmentCategory: {
      title: "Entertainment",
    },
    foodAndDrinksCategory: {
      title: "Food and Drinks",
    },

    museums:{
      title: "Museums"
    },

    sport: {
      title: "Sport Activties"
    }
  },

  placemarks: {
    _model: "Placemark",
      regensburgCinema: {
        name: "Cinemaxx Regensburg",
        description: "Cinema to enjoy all the newest Movies while eating" +
            " Nachos, Popcorn or both of course.",
        latitude: 49.013432,
        longitude: 12.101624,
        categoryid: "->categories.entertainmentCategory",
        userid: "->users.admin"
      },

      newYorkBroadway: {
        name: "New York Broadway",
        description: "Broadway, New York City thoroughfare that traverses the length" +
            " of Manhattan, near the middle of which are clustered the theatres that " +
            "have long made it the foremost showcase of commercial stage entertainment" +
            " in the United States.",
        latitude: 40.790886,
        longitude: -73.974709,
        categoryid: "->categories.entertainmentCategory",
        userid: "->users.admin"
      },

      golfmuseum: {
      name: "Golf Museum Regensburg",
        description: "Golf History and more",
        latitude: 49.013632,
        longitude: 12.101824,
        categoryid: "->categories.museums",
        userid: "->users.admin"
      },

      tennisCourt: {
        name: "Tennis Court",
        description: "Play Tennis for a small price",
        latitude: 49.05,
        longitude: 12.05,
        categoryid: "->categories.sport",
        userid: "->users.admin"
      }
  },
};
