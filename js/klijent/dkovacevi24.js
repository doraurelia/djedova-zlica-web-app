window.addEventListener("load", () => {
    function postaviAktivnuPoveznicu() {
        let trenutnaStranica = window.location.pathname.split("/").pop();
        const navigacija = document.getElementById("navigacija");
        const poveznice = navigacija.getElementsByTagName("a");

        for (let poveznica of poveznice) {
            if (poveznica.getAttribute("href").endsWith(trenutnaStranica)) {
                poveznica.classList.add("aktivna");
            } else {
                poveznica.classList.remove("aktivna");
            }
        }
    }
    postaviAktivnuPoveznicu();

    function postaviHamburger() {
        const hamburger = document.getElementById("hamburger");
        const navigacija = document.getElementById("navigacija");

        hamburger.addEventListener("click", () => {
            navigacija.classList.toggle("otvoreno");
        });
    }
    postaviHamburger();

    const inputPretrazivanje = document.getElementById("pretrazivanje");
    const elTablica = document.getElementsByClassName("tablica")[0];
    const elTabBody = elTablica.getElementsByTagName("tbody")[0];
    let trenutniStupac = -1;
    let smjer = "uzlazno";

    function primijeniPretrazivanje() {
        const unos = inputPretrazivanje.value.trim().toLowerCase();
        const reci = elTabBody.getElementsByTagName("tr");

        for (let r of reci) {
            const okus = r.getElementsByTagName("td")[0].textContent.toLowerCase();

            if (unos === "" || okus.indexOf(unos) !== -1) {
                r.style.display = "";
            } else {
                r.style.display = "none";
            }
        }
        provjeriPraznoStanje();
    }


    function primijeniSortiranje() {
        if (trenutniStupac === -1) return;
        const reci = elTabBody.getElementsByTagName("tr");
        const redoviNiz = [];
        for (let r of reci) {
            if (r.id !== "praznoStanje") {
                redoviNiz.push(r);
            }
        }

        redoviNiz.sort((a, b) => {
            const celijaA = a.getElementsByTagName("td")[trenutniStupac].textContent.trim();
            const celijaB = b.getElementsByTagName("td")[trenutniStupac].textContent.trim();

            const brojA = parseFloat(celijaA);
            const brojB = parseFloat(celijaB);

            const usporedba = brojA - brojB;
            return smjer === "uzlazno" ? usporedba : -usporedba;
        });

        for (let r of redoviNiz) {
            elTabBody.appendChild(r);
        }
    }

    function provjeriPraznoStanje() {
        const reci = elTabBody.getElementsByTagName("tr");
        let imaVidljivih = false;

        for (let r of reci) {
            if (r.id !== "praznoStanje" && r.style.display !== "none") {
                imaVidljivih = true;
                break;
            }
        }

        let praznoStanje = document.getElementById("praznoStanje");

        if (!imaVidljivih) {
            if (!praznoStanje) {
                praznoStanje = document.createElement("tr");
                praznoStanje.id = "praznoStanje";
                praznoStanje.innerHTML = "<td colspan=7 style='textAlign: center;'>Nema rezultata za upisani pojam.</td>";
                elTabBody.appendChild(praznoStanje);
            }
            praznoStanje.style.display = "";
        } else {
            if (praznoStanje) {
                praznoStanje.style.display = "none";
            }
        }
    }

    inputPretrazivanje.addEventListener("input", primijeniPretrazivanje);
    const zaglavljaSort = document.getElementsByClassName("moguceSortirati");

    for (let zaglavlje of zaglavljaSort) {
        zaglavlje.addEventListener("click", () => {
            const stupac = parseInt(zaglavlje.getAttribute("data-column"));

            if (trenutniStupac === stupac) {
                smjer = (smjer === "uzlazno") ? "silazno" : "uzlazno";
            } else {
                trenutniStupac = stupac;
                smjer = "uzlazno";
            }

            for (let z of zaglavljaSort) {
                z.classList.remove("uzlazno", "silazno");
            }
            zaglavlje.classList.add(smjer);
            primijeniSortiranje();
        });
    }

    const sortManjiEkran = document.getElementById("sortManjiEkran");
    sortManjiEkran.addEventListener("change", () => {
        const vrijednost = sortManjiEkran.value;

        if (vrijednost === "") {
            trenutniStupac = -1;
        } else {
            const dijelovi = vrijednost.split("-");
            trenutniStupac = parseInt(dijelovi[0]);
            smjer = dijelovi[1];
        }

        const zaglavljaSort = document.getElementsByClassName("moguceSortirati");
        for (let z of zaglavljaSort) {
            z.classList.remove("uzlazno", "silazno");
            if (parseInt(z.getAttribute("data-column")) === trenutniStupac) {
                z.classList.add(smjer);
            }
        }

        primijeniSortiranje();
    })
})