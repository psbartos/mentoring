function checkUserLogin() {
    const loginName = document.forms["login_form"]["loginName"].value;
    const loginPassword = document.forms["login_form"]["loginPassword"].value;

    async function getUserNames () {
        const users = await getUsers()
        const filteredUsers = users.filter(element => element.name === loginName && element.password === loginPassword);
        console.log(filteredUsers.length > 0);
        return filteredUsers.length > 0;
    }

    getUserNames().then(async function(){
    if (loginName === "") {
        $('.login-form__login-name-span').toggle();
        return false;
    } else if (loginPassword === "") {
        $('.login-form__login-name-span').toggle();
        $('.login-form__login-pass-span').toggle();
        return false;
    } else if (!(await getUserNames)) {
        $('.login-form__login-pass-span').toggle();
        $('.login-form__login-name-span2').toggle();
        return false;
    } else if (await getUserNames) {
        $('.login-form__login-success-span').toggle();
        location.href = "http://127.0.0.1:5500/accountpage.html";
        return true;
     } else console.log('Hiba történt a bejelentkezésnél!');
    })
};

const getUsers = async () => {
    try {
        return (await axios.get('http://localhost:3001/users')).data;
    } catch (error) {
        console.error(error)
    }
}

const countUsers = async () => {
    const users = await getUsers();
    const userCount = users.length;
    document.querySelector(".counter-h1").innerHTML = `Felhasználók: ${userCount}`;
};

countUsers()

const loginForm = document.forms["login_form"];
const regForm = document.forms["reg_form"];
const loginBtn = document.getElementById('login-btn');

let userData = {
    name: '',
    email: '',
    password: ''
};

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