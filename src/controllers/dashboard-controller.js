export const dashboardController ={
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            return h.view("Dashboard", { title: "PlaceMark", user: loggedInUser });
        },
    },
}