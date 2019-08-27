//Csatlakozás a JSON szerverhez!
const getUsers = async () => {
    try {
        return (await axios.get('http://localhost:3001/users')).data;
    } catch (error) {
        alert(`A szerver nem elérhető! Kérem ellenőrizze, fut e a JSON szerver!`)
    }
}

//Bejelentkezés a Google Fiókba FIREBASE-el!
const provider = new firebase.auth.GoogleAuthProvider();

function signIn(){
    firebase.auth().signInWithPopup(provider).then(function(result){

        let token = result.credential.accessToken;
        let user = result.user;
        console.log(user);
    }).catch(function(error){
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
    })
}

//Autentikáció a Google bejelentkezéshez!
$(document).ready(function(){
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            let token = firebase.auth().currentUser.uid;
            queryDatabase(token);
        }else {
            alert('Hiba Google autentikáció közben! - Ellenőrizze, honnan fut a weboldal!');
            console.log('Hiba Google autentikáció közben! - Ellenőrizze, honnan fut a weboldal!');
        }
    })
})

//Üres mezők ellenőrzése Bejelentkezésnél!
async function checkUserLogin() {
    const loginName = document.forms["login_form"]["loginName"].value;
    const loginPassword = document.forms["login_form"]["loginPassword"].value;

    if (loginName === "") {
        $('.login-form__login-name-span').show();
        return false;
    } else if (loginPassword === "") {
        $('.login-form__login-name-span').hide();
        $('.login-form__login-pass-span').show();
        return false;
    } else
        return await loginCheck();
};

//Felhasználó validálás a JSON adatbázisból Bejelentkezésnél!
async function loginCheck() {
    await userLoginCheck().then(function (result) {
        if (result === true) {
            $('.login-form__login-success-span').show();
            $('.login-form__login-name-span').hide();
            $('.login-form__login-pass-span').hide();
            accountPage();
        } else {
            $('.login-form__login-pass-span').toggle();
            $('.login-form__login-name-span2').toggle();
            return false
        }
    })
};

//Felhasználó név - jelszó vizsgálat a JSON adatbázisban filterrel!
async function userLoginCheck() {
    const loginName = document.forms["login_form"]["loginName"].value;
    const loginPassword = document.forms["login_form"]["loginPassword"].value;
    const users = await getUsersFromFirebase();
    const objectKeys = Object.keys(users);
    for (userKey of objectKeys) {
        const user = users[userKey];
        if (user.user === loginName && user.password === loginPassword) {
            userID = userKey;
            return true;
        }
        
    }

    return false;
}

//Felhasználó adatok lekérése FIREBASE-el!
async function getUsersFromFirebase(token) {
    return (await firebase.database().ref('/Users/').once('value')).val();
};

//A filter által talált létező felhasználó Obj ID-jének push-olása a userID-be!
let userID = '';

//A talált Obj tartalmát feltölti az account oldalon a bejelentkező adataival!
async function accountPage() {
    const users = await getUsersFromFirebase();

    setTimeout(function () {
        $('.main-login-container').toggle();
        $('.main-account-container').toggle();
    }, 1500);

    document.querySelector('.accname-span').innerHTML = `${users[userID].user}`
    document.querySelector('.accemail-span').innerHTML = `${users[userID].email}`
    document.querySelector('.accpass-span').innerHTML = `${users[userID].password}`
}

//Megszámolja a JSON db-ben tárolt felhasználók számát, megjeleníti a page-en!
const countUsers = async () => {
    const users = await getUsers();
    const userCount = users.length;
    $('.counter-container').toggle();
    document.querySelector(".counter-h1").innerHTML = `Felhasználók: ${userCount}`;
};
$(document).ready( countUsers ());

const loginForm = document.forms["login_form"];
const regForm = document.forms["reg_form"];
const loginBtn = document.getElementById('login-btn');

//Template a JSON objektumhoz!
let userData = {
    name: '',
    email: '',
    password: '',
    picture: ''
};

//Regisztrációs mezők ellenőrzése - regisztrációs adatok feltöltése a userData-ba, POST-olás a JSON-be!
function checkUserRegistration() {
    const regEmail = document.forms["reg_form"]["reg_email"].value;
    const regName = document.forms["reg_form"]["reg_name"].value;
    const regPassword = document.forms["reg_form"]["reg_password"].value;
    const regPassword2 = document.forms["reg_form"]["reg_password2"].value;
    userData.email = document.forms["reg_form"]["reg_email"].value;
    userData.name = document.forms["reg_form"]["reg_name"].value;
    userData.password = document.forms["reg_form"]["reg_password"].value;
    
    if (regEmail === "") {
        $('.reg-form__reg-email-span2').toggle();
        return false;
    } else if (regName === "") {
        $('.reg-form__reg-email-span2').toggle();
        $('.reg-form__reg-name-span2').toggle();
        return false;
    } else if (regPassword === "") {
        $('.reg-form__reg-name-span2').toggle();
        $('.reg-form__reg-pass-span2').toggle();
        return false;
    } else if (regPassword2 === "") {
        $('.reg-form__reg-pass-span2').toggle();
        $('.reg-form__reg-pass2-span').toggle();
        return false;
    } else if (regPassword !== regPassword2) {
        $('.reg-form__reg-pass2-span').toggle();
        $('.reg-form__reg-pass2-span2').toggle();
        return false;
    } else $('.reg-form__reg-success-span').toggle();
    let postUser = new XMLHttpRequest();
    postUser.open("POST", 'http://localhost:3001/users', true);
    postUser.setRequestHeader('Content-Type', 'application/json');
    postUser.send(JSON.stringify(userData));
    return true;
};

//FIREBASE képfeltöltés és user adatok feltöltése FIREBASE database-be!
$('.reg-form__form-control-file').on("change", function(event){
    let selectedFile = event.target.files[0]
    uploadPicture();
})

function uploadPicture(){
    const regEmail = document.forms["reg_form"]["reg_email"].value;
    const regName = document.forms["reg_form"]["reg_name"].value;
    const regPassword = document.forms["reg_form"]["reg_password"].value;
    let selectedFile = event.target.files[0]
    let filename = selectedFile.name
    let storageRef = firebase.storage().ref('/profileImages/' + filename);
    let uploadTask = storageRef.put(selectedFile);
    uploadTask.on('state_changed', function(snapshot){

    }, function(error){
        
    }, function generateURL(){
        let postKey = firebase.database().ref('Users/').push().key;
        let downloadURL = uploadTask.snapshot.downloadURL;
        let updates = {};
        let postData = {
            url: downloadURL,
            user: regName,
            email: regEmail,
            password: regPassword,
        }
        updates['/Users/'+ postKey] = postData;
        firebase.database().ref().update(updates)
        console.log(downloadURL);
    });
}

//Regisztráció RegEx-ek
function regEmailCheck() {
    const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regEmail = document.forms["reg_form"]["reg_email"].value;
    const emailMatch = regExEmail.test(regEmail);
    if (emailMatch === false) {
        $('.reg-form__reg-email-span').show();
        return false;
    } else if (emailMatch === true) {
        $('.reg-form__reg-email-span').hide()
        return true
    } else alert('Hiba történt!')
    return false;
};

function regPassCheck() {
    const regExPass = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    const regPass = document.forms["reg_form"]["reg_password"].value;
    const passMatch = regExPass.test(regPass);
    if (passMatch === false) {
        $('.reg-form__reg-pass-span').show();
        return false
    } else if (passMatch === true) {
        $('.reg-form__reg-pass-span').hide();
        return true;
    } else alert('Hiba történt!')
    return false;
};

function regNameCheck() {
    const regExName = /^.{5,}$/;
    const regName = document.forms["reg_form"]["reg_name"].value;
    const nameMatch = regExName.test(regName);
    if (nameMatch === false) {
        $('.reg-form__reg-name-span').show();
        return false
    } else if (nameMatch === true) {
        $('.reg-form__reg-name-span').hide()
        return true;
    } else alert('Hiba történt!')
    return false;
};