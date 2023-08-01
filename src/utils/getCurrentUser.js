

const getCurrentUser = function () {
    return JSON.parse(localStorage.getItem("currentUser"));
}

export default getCurrentUser;