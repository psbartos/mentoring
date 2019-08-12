 function checkUserLogin() {
     const loginName = document.forms["login_form"]["loginName"].value;
     const loginPassword = document.forms["login_form"]["loginPassword"].value;

     if (loginName === "" && loginPassword === "") {
         alert('Kérem írja be Felhasználó nevét és jelszavát!')
         return false;
     } else if (loginName !== "admin" && loginPassword === "") {
         alert('Kérem adja meg jelszavát!')
         return false;
     } else if (loginName !== "admin" && loginPassword !== "Béla") {
         alert('Hibás felhasználónév, vagy jelszó!')
         return false;
     } else if (loginName === "" && loginPassword !== "Béla") {
         alert('Kérem adja meg felhasználó nevét')
         return false;
     } else if (loginName === "admin" && loginPassword === "Béla") {
         alert('Sikeres bejelentkezés!')
         window.location.replace("accountpage.html")
     } else alert('Hibás felhasználónév, vagy jelszó!')
     return false;
 };

 /* function checkUserLogin() {
    const loginName = document.forms["login_form"]["loginName"].value;
    const loginPassword = document.forms["login_form"]["loginPassword"].value;

    switch (loginName | loginPassword) {
        case loginName === "" | loginPassword === "":
            alert('Kérem írja be Felhasználó nevét és a jelszavát!');
            break;
        case  loginName !== "admin" | loginPassword === "":
            alert('Kérem adja meg jelszavát!');
            break;
        case loginName === "admin" | loginPassword === "Béla":
            alert('Sikeres bejelentkezés!')
            window.location.replace("accountpage.html");
            break
        default:
            alert('Hibás felhasználónév, vagy jelszó!')
    }
}; */


 function checkUserRegistration() {
     const regEmail = document.forms["reg_form"]["reg_email"].value;
     const regName = document.forms["reg_form"]["reg_name"].value;
     const regPassword = document.forms["reg_form"]["reg_password"].value;
     const regPassword2 = document.forms["reg_form"]["reg_password2"].value;

     if (regEmail === "") {
         alert('Kérem írja be az e-mail címét!')
         return false;
     } else if (regName === "") {
         alert('Kérem írja be felhasználó nevét!')
         return false;
     } else if (regPassword === "") {
         alert('Kérem írja be jelszavát!')
         return false;
     } else if (regPassword2 === "") {
         alert('Kérem ismételje meg jelszavát')
         return false
     } else if (regPassword !== regPassword2) {
         alert('A két jelszó nem egyezik!')
         return false
     } else alert('Minden ki van töltve!')
     return false;
 };


 function regEmailCheck() {
     const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     const regEmail = document.forms["reg_form"]["reg_email"].value;
     const emailMatch = regExEmail.test(regEmail);
     if (emailMatch === false) {
         alert('Az e-mail cím nem megfelelő!')
         return false
     } else if (emailMatch === true) {
         return true
     } else alert('Valami nem jó!')
     return false;
 };

 function regPassCheck() {
     const regExPass = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
     const regPass = document.forms["reg_form"]["reg_password"].value;
     const passMatch = regExPass.test(regPass);
     if (passMatch === false) {
         alert('A jelszó nem elég erős! Kérem használjon legalább 1 nagy betűt és 1 számot!')
         return false
     } else if (passMatch === true) {
         return true;
     } else alert('Valami nem jó!')
     return false;
 };

 function regNameCheck() {
     const regExName = /^.{8,}$/;
     const regName = document.forms["reg_form"]["reg_name"].value;
     const nameMatch = regExName.test(regName);
     if (nameMatch === false) {
         alert('A felhasználónév nem elég hosszú! Kérem használjon minimum 8 karaktert!')
         return false
     } else if (nameMatch === true) {
         return true;
     } else alert('Valami nem jó!')
     return false;
 };

 $(document).ready(function () {
     $('.reg-form__reg-name-label').mouseenter(function () {
         $('.reg-form__reg-name-span').show();
     });
     $('.reg-form__reg-name-label').mouseleave(function () {
         $('.reg-form__reg-name-span').hide();
     });
     $('.reg-form__reg-pass-label').mouseenter(function () {
         $('.reg-form__reg-pass-span').show();
     });
     $('.reg-form__reg-pass-label').mouseleave(function () {
         $('.reg-form__reg-pass-span').hide();
     });
     $('.reg-form__reg-pass2-label').mouseenter(function () {
         $('.reg-form__reg-pass2-span').show();
     });
     $('.reg-form__reg-pass2-label').mouseleave(function () {
         $('.reg-form__reg-pass2-span').hide();
     });
 })