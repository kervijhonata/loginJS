//Users
function createUser(userData) {
    if(userData && typeof userData == 'object'){
        this.id = userData.id || undefined; // OBSOLETE ID Declaraion
        this.name = userData.name;
        this.email = userData.email;
        this.password = userData.password;
        this.userType = userData.userType;
        
        //Stop Creation if User is declared with ID :: User should not be declared with
        if(this.id != undefined){
            console.log("DENIED ACTION: Can't create a user with setted ID")
            return 0
        }

        //Validate received Data
        if(this.email != undefined && this.password != undefined){
            const user = userData;
            console.info(`User[${user.name}] created sucessfully`)
            return user
        }else{
            console.log("Can't create an User with UNDEFINED data")
        }
    }else{
        console.log("Can't create an User without Data")
    }
}

const user1 = createUser({name: "Bill Gates", email: "gates@admin.com", password: "0000"})
const user2 = createUser({name: "Julie", email: "julie@comercial.com", password: "1234"})
const user3 = createUser({name: "Marcus", email: "marcus@media.com", password: "qwer"})
const user4 = createUser({name: "Kervi", email: "kervi@admin.com", password: "0000"});

//Database
function createUserDB() {
    const users = []
    function subscribe(user) {
        if(user){
            let userExist = users.find( findUser => findUser == user );
            if(!userExist){
                user.id = getRegID();
                users.push(user)
                console.log(`user [${user.id}][${user.name}] subscribed to DB`);
            }else{
                console.log(`cant subscribe a duplicated user`)
                return 0
            }
        }else{
            console.log("Can't Subscribe something invalid")
            return 0
        }
    }
    function getUsers() {
        return users;
    }
    function getRegID() {
        return users.length; //It works as a Primary Key AUTODECLARED
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


/* OBSOLETE: ID Declaration
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
    
    delete(validateData);
}

//TestArea
console.info('- Hey, try logging with Gates!')