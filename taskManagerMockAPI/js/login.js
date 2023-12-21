const loginForm = document.querySelector(".loginForm")
const loginUsernameInput = document.querySelector(".loginUsernameInput")
const loginPasswordInput = document.querySelector(".loginPasswordInput")
const errorMessage = document.querySelector(".errorMessage")

const userId = JSON.parse(localStorage.getItem("user"))?.id

// Redirect to taskManagerlist page if logged in
window.onload = () => {
    if (userId) {
        window.location.replace("../pages/taskManagerList.html")
    }
}

// Loading all users and searching for them by ID
const fetchAllUsers = () => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://657436ebf941bda3f2af7b89.mockapi.io/api/v1/user", true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const users = JSON.parse(xhr.responseText);
                const user = users.find(item => item.username === loginUsernameInput.value && item.password === loginPasswordInput.value);
                resolve(user);
            } else {
                reject(new Error(`Failed to fetch users. Status: ${xhr.status}`));
            }
        };

        xhr.onerror = function () {
            reject(new Error("Network error occurred while trying to fetch users."));
        };

        xhr.send();
    });
};

// Submitting the login form

loginForm.onsubmit = async (e) => {
    e.preventDefault()
    const user = await fetchAllUsers()
    if (user) {
        localStorage.setItem("user", JSON.stringify(user))
        window.location.replace("../pages/taskManagerList.html")
    } else {
        errorMessage.innerHTML = "Invalid login or password"
    }
}

// Remove the error message on type
loginUsernameInput.oninput = () => {
    errorMessage.innerHTML = ""
}
loginPasswordInput.oninput = () => {
    errorMessage.innerHTML = ""
}