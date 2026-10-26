window.addEventListener("load", () => {
    const elIme = document.getElementById("ime");
    const elEmail = document.getElementById("email");
    const elTel = document.getElementById("telefon");
    const elDostava = document.getElementById("dostava");
    const elDatum = document.getElementById("datum");
    const sviOkusi = document.getElementsByName("okus");
    const elPakiranje = document.getElementsByName("pakiranje");
    const elNapomena = document.getElementById("napomene");
    const elSlika = document.getElementById("slika");
    const elSuglasnost = document.getElementById("suglasnost");
    const elObrazac = document.getElementById("obrazac");

    function provjeraIme() {
        const reIme = RegExp(/^[A-Za-zČčĆćŠšŽžĐđ]{2,}( [A-Za-zČčĆćŠšŽžĐđ]{2,})+$/);
        const imeGreska = document.getElementById("ime-greska");
        if (!reIme.test(elIme.value)) {
            imeGreska.innerHTML = "Ime i prezime mora saržavati barem dvije riječi, bez brojeva i specijalnih znakova! Naprimjer: Frano Šimić"
        }
        else {
            imeGreska.innerHTML = "";
        }
    }

    function provjeraEmail() {
        const reEmail = RegExp(/^[A-Za-z_.0-9]{2,}(@[A-Za-z]{2,})+(\.[A-Za-z]{2,})$/);
        const greskaEmail = document.getElementById("greska-email");
        if (!reEmail.test(elEmail.value)) {
            greskaEmail.innerHTML = "Molimo unesite ispravnu adresu e-pošte, naprimjer: frano.simic@domena.ekstenzija";
        }
        else {
            greskaEmail.innerHTML = "";
        }

    }

    function provjeraTel() {
        const reTel = RegExp(/^0|\+/);
        const greskaTel = document.getElementById("greska-tel");
        if (!reTel.test(elTel.value)) {
            greskaTel.innerHTML = "Molimo unesite ispravan broj telefona koji počinje s 0 ili +, naprimjer +385919043657 ili 0919046357";
        }
        else {
            greskaTel.innerHTML = "";
        }
    }

    function provjeraSuglasnost() {
        const greskaSuglasnost = document.getElementById("greska-suglasnost");
        if (!elSuglasnost.checked) {
            greskaSuglasnost.innerHTML = "Morate se složiti s uvjetima narudžbe, ovo je polje obvezno!";
        }
        else {
            greskaSuglasnost.innerHTML = "";
        }
    }


    function provjeraDostavaDatum() {
        let odabranaDostava = elDostava.value;
        const greskaDatum = document.getElementById("greska-datum");
        if (odabranaDostava === "osobno" && elDatum.value === "") {
            greskaDatum.innerHTML = "Za osobno preuzimanje obvezno odaberite datum preuzimanja!";
        } else {
            greskaDatum.innerHTML = "";
        }
    }

    function provjeraPakiranjeOkusi() {
        const greskaPakiranjeOkusi = document.getElementById("greska-pak-okus");
        let odabranoPakiranje = "";
        for (let pak of elPakiranje) {
            if (pak.checked) odabranoPakiranje = pak.value;
        }

        let brojOkusa = 0;
        for (let okus of sviOkusi) {
            if (okus.checked) {
                brojOkusa++;
            }
        }

        const limiti = {
            "malo": 3,
            "srednje": 5,
            "veliko": 5,
            "mala torta": 3,
            "velika torta": 3
        }

        if (odabranoPakiranje === "" || brojOkusa === 0) {
            greskaPakiranjeOkusi.innerHTML = "Molimo odaberite i pakiranje i barem jedan okus!";
            return;
        } else if (brojOkusa > limiti[odabranoPakiranje]) {
            greskaPakiranjeOkusi.innerHTML = "Odabrali ste previše okusa.";
        } else {
            greskaPakiranjeOkusi.innerHTML = "";
        }
    }

    function provjeraTortaOstalo() {
        let odabranoPakiranje = "";
        for (let pak of elPakiranje) {
            if (pak.checked) odabranoPakiranje = pak.value;
        }

        const greskaTorta = document.getElementById("greska-torta");
        if (elSlika.files.length === 0 && !elNapomena.value.trim() && (odabranoPakiranje === "mala torta" || odabranoPakiranje === "velika torta")) {
            greskaTorta.innerHTML = "Za odabranu tortu morate priložiti fotografiju ili dodati napomenu za opis!";
        }
        else {
            greskaTorta.innerHTML = "";
        }
    }

    for (let pak of elPakiranje) {
        pak.addEventListener("change", provjeraPakiranjeOkusi);
        pak.addEventListener("change", provjeraTortaOstalo);
    }

    for (let okus of sviOkusi) {
        okus.addEventListener("change", provjeraPakiranjeOkusi);
    }

    elDatum.addEventListener("change", provjeraDostavaDatum);
    elDostava.addEventListener("change", provjeraDostavaDatum);
    elSlika.addEventListener("change", provjeraTortaOstalo);
    elNapomena.addEventListener("input", provjeraTortaOstalo);
    elIme.addEventListener("keyup", provjeraIme);
    elEmail.addEventListener("keyup", provjeraEmail);
    elTel.addEventListener("keyup", provjeraTel);
    elSuglasnost.addEventListener("change", provjeraSuglasnost);

    elObrazac.addEventListener("submit", (e) => {
        provjeraIme();
        provjeraEmail();
        provjeraTel();
        provjeraDostavaDatum();
        provjeraPakiranjeOkusi();
        provjeraTortaOstalo();
        provjeraSuglasnost();
        const sveGreske = document.getElementsByClassName("greska");
        let imaGresaka = false;
        for (let g of sveGreske) {
            if (g.innerHTML !== "") {
                imaGresaka = true;
            }
        }

        if (imaGresaka) {
            e.preventDefault();
            alert("Provjerite jeste li unijeli sve obvezne podatke i jesu li svi ispravno uneseni!");
        }
    })
})