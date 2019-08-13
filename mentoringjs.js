function checkUserLogin() {
    const loginName = document.forms["login_form"]["loginName"].value;
    const loginPassword = document.forms["login_form"]["loginPassword"].value;

    if (loginName === "") {
        $('.login-form__login-name-span').show()
        return false;
    } else if (loginPassword === "") {
        $('.login-form__login-pass-span').show()
        return false;
    } else if (loginName !== "admin") {
        $('.login-form__login-name-span2').show()
        return false;
    } else if (loginPassword !== "Béla") {
        $('.login-form__login-pass-span2').show()
        return false;
    } else if (loginName === "admin" && loginPassword === "Béla") {
        $('.login-form__login-success-span').show()
        setTimeOut(function(){window.location.replace("accountpage.html")}, 1500);
        return true;
    } else alert('HIBA TÖRTÉNT!')

};

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
    const regForm = document.forms["reg_form"];

    regForm.onsubmit = function (e) {
        e.preventDefault();
        userData.email = document.forms["reg_form"]["reg_email"].value;
        userData.name = document.forms["reg_form"]["reg_name"].value;
        userData.password = document.forms["reg_form"]["reg_password"].value;
        console.log(userData);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3001/users', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(userData))
    };

    if (regEmail === "") {
        $('.reg-form__reg-email-span2').show();
        return false;
    } else if (regName === "") {
        $('reg-form__reg-name-span2').show();
        return false;
    } else if (regPassword === "") {
        $('reg-form__reg-pass-span2').show();
        return false;
    } else if (regPassword2 === "") {
        $('reg-form__reg-pass2-span').show();
        return false
    } else if (regPassword !== regPassword2) {
        $('reg-form__reg-pass2-span2').show();
        return false
    } else $('reg-form__reg-success-span').show();
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

/* let loginValid = function() {
        switch (loginName) {
            case "":
                $('.login-form__login-name-span').show()
                return false;
            case "admin":
                return true;
            default:
                $('.login-form__login-name-span2').show()
                return false;
        };
    };
    let passwordValid = function() {
        switch (loginPassword) {
            case "":
                $('.login-form__login-pass-span').show()
                return false;
            case "Béla":
                return true;
            default:
                $('.login-form__login-pass-span2').show()
                return false;
        };
    }
    if (loginValid && passwordValid {
        $('.login-form__login-success-span').show()
        window.location.replace("accountpage.html")
    } else alert('HIBA TÖRTÉNT') */