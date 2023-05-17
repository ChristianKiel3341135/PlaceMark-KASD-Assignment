export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
    },
  },

  placemarks: {
    _model: "Placemark",
      regensburgCinema: {
        name: "Cinemaxx",
        category: "Entertainment",
        description: "Regensburger Cinema to enjoy all the newest Movies while eating" +
            " Nachos, Popcorn or both ofcourse.",
        latitude: 49.013432,
        longitude: 12.101624,
      },

      newYorkBroadway: {
        name: "New York Broadway",
        category: "Entertainment",
        description: "Broadway, New York City thoroughfare that traverses the length" +
            " of Manhattan, near the middle of which are clustered the theatres that " +
            "have long made it the foremost showcase of commercial stage entertainment" +
            " in the United States.",
        latitude: 40.790886,
        longitude: -73.974709,
      }
  },
};
