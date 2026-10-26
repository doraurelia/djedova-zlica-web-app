function dajPort(korime) {
	var os = require("os");
	const HOST = os.hostname();
	let port;
	if (HOST != "spider") {
		port = 12222;
	} else {
		const portovi = require("/var/www/OWT/2026/portovi.js");
		port = portovi[korime];
	}
	return port;
}

const port = dajPort("dkovacevi24");

const express = require("express");
const server = express();

const putanja = __dirname;

console.log(putanja);

server.get("/", (zahtjev, odgovor) => {
	odgovor.send(putanja + "/html/index.html");
});
server.use("/dizajn", express.static("css"));
server.use("/resursi", express.static("resursi"));
//server.get("/obrazac", (zahtjev, odgovor) => {});
server.use("/JSklijent", express.static("js/klijent"));
//server.get("/dinamicna", (zahtjev, odgovor) => {});
//server.post("/ispisObrazac", (zahtjev, odgovor) => {});

server.use((zahtjev, odgovor) => {
	odgovor.status(404)
	odgovor.send("Stranica ne postoji! Pokušajte na adresi " + putanja + "/localhost:" + port); //sve je poveznica ili poveznica ide posebno?
});

server.listen(port, () => {
	console.log(`Server pokrenut na portu: ${port}`);
});
