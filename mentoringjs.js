function checkUserLogin() {
    const loginName = document.forms["login_form"]["loginName"].value;
    const loginPassword = document.forms["login_form"]["loginPassword"].value;

    if (loginName === "") {
        $('.login-form__login-name-span').show();
        return false;
    } else if (loginPassword === "") {
        $('.login-form__login-name-span').hide();
        $('.login-form__login-pass-span').show();
        return false;
    } else if (getUserNames !== true) {
        console.log('Felhasználónál elakadt!');
        $('.login-form__login-pass-span').hide();
        $('.login-form__login-name-span2').show();
        return false;
    } else if (getUserPasswords !== true) {
        console.log('Jelszónál elakadt');
        $('.login-form__login-name-span2').hide();
        $('.login-form__login-pass-span2').show();
        return false;
    } else if (getUserNames === true && getUserPasswords === true) {
        console.log('Autentikációnál elakadt');
        $('.login-form__login-success-span').show();
        location.href = "http://127.0.0.1:5500/accountpage.html";
        return true;
    } else console.log('Hiba történt!');

};

const loginForm = document.forms["login_form"];
const regForm = document.forms["reg_form"];
const loginBtn = document.getElementById('login-btn');

let userData = {
    name: '',
    email: '',
    password: ''
};


const getUsers = async () => {
    try {
        return await axios.get('http://localhost:3001/users')
    } catch (error) {
        console.error(error)
    }
}

const countUsers = async () => {
    const users = await getUsers()
    const userCount = (users.data).length

    document.querySelector(".counter-h1").innerHTML = `Felhasználók: ${userCount}`;
};

countUsers()

const getUserNames = async () => {
    const users = await getUsers()
    const loginName = document.forms["login_form"]["loginName"].value;

    const names = users.data.map(user => {
        console.log(user.name)
        return (user.name)
    }); 
    
    names.forEach(name => {
        if (name === loginName){
            console.log(name + ' MEGVAN')
            return true;
        } else console.log('NINCS MEG')
        return false;   
    });
}


const getUserPasswords = async () => {
    const users = await getUsers()
    const loginPassword = document.forms["login_form"]["loginPassword"].value;

    const passwords = users.data.map(user => {
        console.log(user.password)
        return (user.password)
    });

    passwords.forEach(password => {
        password === loginPassword ? console.log(password, 'is ok') : console.log('not good');
        if (password === loginPassword){
        return true;
        } else return false;
    })
}

function checkUserRegistration() {
    const regEmail = document.forms["reg_form"]["reg_email"].value;
    const regName = document.forms["reg_form"]["reg_name"].value;
    const regPassword = document.forms["reg_form"]["reg_password"].value;
    const regPassword2 = document.forms["reg_form"]["reg_password2"].value;
    userData.email = document.forms["reg_form"]["reg_email"].value;
    userData.name = document.forms["reg_form"]["reg_name"].value;
    userData.password = document.forms["reg_form"]["reg_password"].value;

    if (regEmail === "") {
        $('.reg-form__reg-email-span2').show();
        return false;
    } else if (regName === "") {
        $('.reg-form__reg-email-span2').hide();
        $('.reg-form__reg-name-span2').show();
        return false;
    } else if (regPassword === "") {
        $('.reg-form__reg-name-span2').hide();
        $('.reg-form__reg-pass-span2').show();
        return false;
    } else if (regPassword2 === "") {
        $('.reg-form__reg-pass-span2').hide();
        $('.reg-form__reg-pass2-span').show();
        return false;
    } else if (regPassword !== regPassword2) {
        $('.reg-form__reg-pass2-span').hide();
        $('.reg-form__reg-pass2-span2').show();
        return false;
    } else $('.reg-form__reg-success-span').show();
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