//Users
function createUser(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.password = userData.password;
    
    //Validate received Data
    if(this.name && this.email && this.password){
        const user = userData;
        return user
    }
}

const user1 = createUser({id: 0, name: "Kervi", email: "kervi@admin.com", password: "0000"})
const user2 = createUser({id: 1, name: "Julie", email: "julie@comercial.com", password: "1234"})
const user3 = createUser({id: 2, name: "Marcus", email: "marcus@media.com", password: "qwer"})

//Database
function createUserDB() {
    const users = []
    function subscribe(user) {
        if(user){
            users.push(user)
            console.log(`user [${user.id}][${user.name}] subscribed sucessfully`);
        }else{
            console.log("cant subscribe: " + user)
        }
    }
    function getUsers() {
        return users;
    }
    return {
        subscribe,
        getUsers
    }
}

const userDB = createUserDB()

userDB.subscribe(user1)
userDB.subscribe(user2)
userDB.subscribe(user3)

/*
const userDB = [
    {id: 0, name: "Kervi", email: "kervi@admin.com", password: "0000"},
    {id: 1, name: "Julie", email: "julie@comercial.com", password: "1234"},
    {id: 2, name: "Marcus", email: "marcus@media.com", password: "qwer"}
]
*/

//Input
function createButton(targetSelector) {
    const button = targetSelector || document.querySelector(".button-submit");
    function on(event, callback) {
        return button.addEventListener(event, callback)
    }
    return {
        button,
        on
    }
}

const button = createButton();
button.on("click", validateForm);

//Event callBacks
function validateForm(evt){

    //Stop form redirect
    evt.preventDefault()

    //Receive Data
    let email = document.querySelector("#email").value
    let password = document.querySelector("#password").value

    //Verify received Data
    let result = userDB.getUsers().filter(user => {
        if(user.email == email && user.password == password){
            return validated(user)
        }
    });

    function validated(user) {
        console.info(user.name + "is authorized")
        console.debug(`receivedData:\n
        [${typeof email}] email: ${email}\n
        [${typeof password}] password: ${password}`);
        alert(`Bem vindo, ${user.name}!`)
    }
}

//Test