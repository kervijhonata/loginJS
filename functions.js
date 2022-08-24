//Users
function createUser(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.password = userData.password;
    
    //Validate received Data
    if(this.id != undefined && this.email != undefined && this.password != undefined){
        const user = userData;
        console.info(`User[${user.name}] created sucessfully`)
        return user
    }else{
        console.log("Can't create an User with UNDEFINED data")
    }
}

const user1 = createUser({id: 0, name: "Bill Gates", email: "gates@admin.com", password: "0000"})
const user2 = createUser({id: 1, name: "Julie", email: "julie@comercial.com", password: "1234"})
const user3 = createUser({id: 2, name: "Marcus", email: "marcus@media.com", password: "qwer"})
const user4 = createUser({id: 3, name: "Kervi", email: "kervi@admin.com", password: "0000"});

//Database
function createUserDB() {
    const users = []
    function subscribe(user) {
        if(user){
            users.push(user)
            console.log(`user [${user.id}][${user.name}] subscribed to DB`);
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
userDB.subscribe(user4)

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
button.on("click", validateData);

//Event callBacks
function validateData(evt){

    //Stop form redirection
    evt.preventDefault()

    //Receive Data
    this.email = document.querySelector("#email").value
    this.password = document.querySelector("#password").value

    //Authentication :: Match received Data with User informations
    let authenticatedUser = userDB.getUsers().find( user => {
        if(user.email == this.email && user.password == this.password){
            return user
        }
    });

    //Validation
    validate(authenticatedUser)

    /** 
     * This process above needs to occur in two steps:
     *  .1. -> Authentication:
     *      Find a user that match exactly with receved input data;
     *      When matched condition==TRUE, return the object;
     *      [IMPORTANT] A data return is required, even if it is FALSE;
     * 
     *  .2. -> Validation:
     *      what will be done when this user passes TRUE or FALSE;
     * */

    function validate(user) {
        if(user){
            auth(user)
        }else{
            deny(user)
        }
    }
    
    function auth(user) {
        console.info(user.name + " is authorized")
        alert(`Welcome, ${user.name}!`)
    }
    function deny() {
        console.info("denied data")
        alert("Verify your data and try again")
    }
    
    delete( validateData);
}

//TestArea