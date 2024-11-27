const container = document.getElementById('form');
const nameInput = document.getElementById('nameBox');
const actionButton = document.getElementById('actionBtn');
const logInButton = document.getElementById('logIn');
const counter = document.getElementById('counter');
const inputUserPassword = document.getElementById('password');
const signUpButton = document.getElementById('signUp');
const signOutButton = document.getElementById('signOut');
const progressBar = document.getElementById('fillBar');
const progressBarText = document.getElementById('barProgress');
const trackerPage = document.getElementById('trackerPage');
const userInforPage = document.getElementById('tableInfo');
const tableName = document.getElementById('tableName');
const tableBtnClicks = document.getElementById('tableBtnClicks');
const tableProgressBar = document.getElementById('tableProgressBar');
const backBtn = document.getElementById('trackerBtn');


let btn1Counter = 0; //the on screen counter variable
let currentAccountActionCount = 0; //variable of the cyrrent user and 
let newUserData = {}; //creation of users
let userID; // let userID = `${user1.name}${Date.now()}`; //can make it using time stamps too Date.now()
let newUserName; //stores new username
let currentUserName; // stores the name of current user
let currentUserPassword; //stores the password of current user
let userPassword; //stores new user passwords to put it in the new user obj
let users = new Map([]); // map of all the users

//goes to login page
if (signOutButton) {
    signOutButton.addEventListener('click', ()=>{
        window.location.href = 'index.html';
    })
}

//goes back from the tracker page to login page
if (backBtn) {
    backBtn.addEventListener('click', () =>{
        window.location.href = 'tracker.html';
    })
}


if (logInButton) {

    logInButton.addEventListener('click', ()=>{

        if(users.size != 0){
    
            currentUserPassword = inputUserPassword.value;
            currentUserName = nameInput.value;
            localStorage.setItem('userName', currentUserName);
            doesUserNameExist(currentUserName);
            doesPasswordExist(currentUserName, currentUserPassword, userNameExist);
        }else{
    
            counter.innerHTML = 'no users in the database';
        }
    
        nameInput.value = '';
        inputUserPassword.value = '';
    })
}

//takes the value in the input box and makes it the username
if (signUpButton) {

    signUpButton.addEventListener('click', () => {

        checkPassword();
        if(nameInput.value === ''){
    
            checkUserName();
        }else{
    
            newUserName = nameInput.value;
            creatingAccount(newUserName, allowUserCreation);
        }
    
        nameInput.value = '';
        inputUserPassword.value = '';
    })
}

let userNameExist = false;//makes it so i dont need to use sets to store the usernames
function doesUserNameExist(userName){

    if(users.has(userName)){

        userNameExist = true;
    }else{

        userNameExist = false;
    }
}

//checks if username is already in list of users in maps
function checkUserName(){

    counter.innerHTML = 'How about writing a user name first before signing up >: | ?!';
    allowUserCreation = 0; //if the password field meets the requirments but the username field is empty, without this line an account can be made without a password next time the user tries to login without a password, so this resets it
}

let allowUserCreation = 0; //if allowUserCreation is 0 means it will not make a new account bec password cant be used, if it is equal 1 then the user will be created.
//checks if the password input field is empty
function checkPassword(){

    if(inputUserPassword.value === ''){ //checks if password field is empty

        counter.innerHTML = 'You Forgot The PASSWORD :|';
        allowUserCreation = 0;
    }else if(inputUserPassword.value.length <= 3 || inputUserPassword.value.length >= 20){//checks if password input field is between 3 and 20 inclusive
        
        counter.innerHTML = 'password must be greater than 3 and less than 20 characters';
        allowUserCreation = 0;
    }else{//if all is false then the password meets the requirments and an account can be made (the username must be filled to completely create the account still)
        
        userPassword = inputUserPassword.value;
        allowUserCreation = 1; //allows user creation
    }
} 

let isPasswordCorrect = false; //if true means it is correct, if false not correct
//checks if the password entered matches the username's password
function doesPasswordExist(userName, userPassword, userNameExist){

    doesUserNameExist(userName);
    
    if(userNameExist){

        isPasswordCorrect = users.get(userName).password === userPassword;
        userNameExist = false;
        if(isPasswordCorrect){

            isPasswordCorrect = true;
            window.location.href = 'tracker.html';
            counter.innerHTML = `Welcome back ${currentUserName}`;
        }else{

            if(nameInput.value === ''){

                checkUserName();
                isProblemFound = true;
            }else{

                counter.innerHTML = 'password is not correct';
            }
        }
    }else{

        counter.innerHTML = 'user name doesnt exist';
        isPasswordCorrect = false;
    }
}

//progress bar, 1 click equals 1% of the total progress
if (trackerPage) {

    let progressUser = localStorage.getItem('userInfo')
    progressUser = JSON.parse(progressUser);
    let progressUserName = localStorage.getItem('userName')
    console.log(progressUser[progressUserName].btn1Count);
        
    if (progressUser[progressUserName].btn1Count <= 100 ) {
        progressBar.style.width = `${progressUser[progressUserName].btn1Count}%`;
        progressBarText.innerHTML = `${progressUser[progressUserName].btn1Count}%`;
       
        
    }else{
        progressBar.style.width = `100%`;
        progressBarText.innerHTML = `100%`;
    }         
}

//its a counter whenever you click the actionButton
if (actionButton) {//checks if the button exist in the page
    actionButton.addEventListener('click', () => {
    
    if(users.size != 0){

        currentAccountActionCount = users.get(currentUserName);
        currentAccountActionCount.btn1Count += 1;

        if (currentAccountActionCount.btn1Count <= 100) {
            progressBar.style.width = `${currentAccountActionCount.btn1Count}%`;
            progressBarText.innerHTML = `${currentAccountActionCount.btn1Count}%`;
        }else{
            progressBar.style.width = `100%`;
            progressBarText.innerHTML = `100%`;
        }
        

        saveUserInLocalStorage(currentAccountActionCount);

        counter.innerHTML = currentAccountActionCount.btn1Count;
    }else{

        counter.innerHTML = 'log in first =|';
    }
})
}

//saves the useres and usernames in local storage
function saveUserInLocalStorage(newUserData){

    localStorage.setItem('userName', newUserData.userName);
    userSerialized[newUserData.userName] = newUserData;
    localStorage.setItem('userInfo', JSON.stringify(userSerialized));
}

//changes from string back to an object
let userDeserialized;
//gets the previous objects in userSerialized
function getUsersFromLocalStorage(){

    userDeserialized = JSON.parse(localStorage.getItem('userInfo'));
    

    let storedUsersKeys = Object.keys(userDeserialized);

    let storedUsersValues = Object.values(userDeserialized);

    users.clear();
    
    for (let i = 0; i < storedUsersKeys.length; i++) {
        userSerialized[storedUsersKeys[i]] = storedUsersValues[i];
        users.set(storedUsersKeys[i], storedUsersValues[i]);
    }

    currentUserName = localStorage.getItem('userName');
}

//stores all useres as an object of objects with the username as the key
let userSerialized = {};
//creates a new user object
function creatingAccount(userName, allowUserCreation){
    
    if(allowUserCreation === 1 && !users.has(userName)){//if its allowed to be created and is a new account

        newUserData.password = userPassword;
        newUserData.btn1Count = 0; //always like that
        newUserData.userName = userName;
        
        currentUserName = userName; // stores current user name
        users.set(userName, newUserData);
        
        saveUserInLocalStorage(newUserData);//stores the newly created user in LS

        newUserData = {}; // clears the newUserData object to store the new users

        allowUserCreation = 0; //resets the allowUserCreation
        counter.innerHTML = 0;

        userNameExist = true;
        window.location.href = 'tracker.html';
    }else{

        if(allowUserCreation === 0){
            checkPassword();
        }else{
            counter.innerHTML = 'this user name is already taken use another one or log in :{';
        }
    }
}

//shows all the info in the table that in the dashboard
if(userInforPage){

    getUsersFromLocalStorage();
    console.log(users);
    console.log(users.get(currentUserName));
    
    
    tableName.innerHTML = currentUserName;
    tableBtnClicks.innerHTML = users.get(currentUserName).btn1Count;

    if (users.get(currentUserName).btn1Count >= 100) {
        tableProgressBar.innerHTML = '100% complete.'
    }else{
        tableProgressBar.innerHTML = `${users.get(currentUserName).btn1Count}% complete`;
    }
    
}

//displays a wekcome msg in the tracker page
if (document.body.id === 'trackerPage') {

    getUsersFromLocalStorage();
    counter.innerHTML = `Welcome ${currentUserName}!`;
}

//gets the useres and usernames from localStorage
getUsersFromLocalStorage();