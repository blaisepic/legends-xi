// import pg from 'pg';

// let connectionString = "postgres://blaise:[password]@my_local_server/ip:5432/fifa";
// let pgClient = new pg.Client(connectionString);
// pgClient.connect();
// let query = pgClient.query("SELECT * FROM legends");

// query.on("row", function(row, result){
//     result.addRow(row);
// });

// console.log(result);

// export default Data;

class Player{
    constructor(key, name, pos, ovr){
        this.key = key;
        this.name = name;
        this.pos = pos;
        this.ovr = ovr;
    }
}

let players = {
pele: ["Pelé", "F", 98],
maradona: ["Diego Maradona", "F", 97],
zidane: ["Zinedine Zidane", "MID", 96],
maldini : ["Paolo Maldini", "DEF", 94],
ronaldinho: ["Ronaldinho", "F", 94],
matthaus: ["Lothar Matthäus", "MID", 93],
gullit: ["Ruud Gullit", "F", 93],
baresi: ["Franco Baresi", "DEF", 93],
dalglish: ["Kenny Dalglish", "F", 92],
schmiechel: ["Peter Schmeichel", "GK", 92],
piero: ["Alessandro Del Piero", "F", 92],
figo: ["Luís Figo",	 "MID", 	92],
cannavaro: ["Fabio Cannavaro", 	"DEF", 	92],
giggs: ["Ryan Giggs", 	"MID", 	92],
rush: ["Ian Rush", 	"F", 91],
carlos: ["Roberto Carlos", 	"DEF", 	91],
kluivert: ["Patrick Kluivert", 	"F", 91],
sar: ["Edwin van der Sar", 	"GK", 	91],
shevchenko: ["Andriy Shevchenko", "F", 91,],
owen: ["Michael Owen", "F", 91],
pires: ["Robert Pirès", "MID", 91],
seedorf: ["Clarence Seedorf", "MID", 91],
desailly: ["Marcel Desailly", "DEF", 91],
shearer: ["Alan Shearer", "F", 91],
cantona: ["Eric Cantona", 	"F", 	90],
veron: ["Juan Sebastián Verón", 	"MID", 	90],
larsson: ["Henrik Larsson", "F", 90],
crespo: ["Hernán Crespo", 	"F", 	90],
makelele: ["Claude Makélélé", "MID", 	90],
zola: ["Gianfranco Zola", "F", 90],
keane: ["Roy Keane", "MID", 90],
cambell: ["Sol Campbell", "DEF", 89],
henry: ["Thierry Henry", "F", 94],
buffon: ["Gianluigi Buffon", "GK", 94],
nistelrooy: ["Ruud van Nistelrooy", "F", 92],
makaay: ["Roy Makaay", "F", 91],
casillas: ["Casillas", "GK", 91],
vieira: ["Patrick Vieira", "MID", 91],
totti: ["Francesco Totti", "F", 91],
nesta: ["Alessandro Nesta", "DEF", 91],
kahn: ["Oliver Kahn", "GK", 91],
marcos: ["Marcos", "GK", 90],
lucio: ["Lucio", "DEF", 	90],
gerrard: ["Steven Gerrard", "MID", 90],
stam: ["Jaap Stam", "DEF", 90],
kaka: ["Kaká", "F", 89],
adriano: ["Adriano", "F", 89],
ronaldo: ["Ronaldo", "F", 89],
aimar: ["Pablo César Aimar", "F", 89],
ferdinand: ["Rio Ferdinand", "DEF", 89],
trezeguet: ["David Trezeguet", "F", 89],
toldo: ["Francesco Toldo", "GK", 89],
thuram: ["Lilian Thuram", "DEF", 89],
scholes: ["Paul Scholes", "MID", 89],
vicente: ["Vicente", "MID", 88],
valeron: ["Valerón", "MID", 88],
rosicky: ["Tomás Rosicky", "MID", 88],
nedved: ["Pavel Nedved", "MID", 88],
zambrotta: ["Gianluca Zambrotta", "DEF", 88],
given: ["Shay Given", "GK", 88],
cudicini: ["Carlo Cudicini", "GK", 88],
vieri: ["Christian Vieri", "F", 88],
raul: ["Raúl", "F", 87],
cisse: ["Djibril Cissé", "F", 87],
karagounis: ["Giorgos Karagounis", "MID", 87],
nikopolidis: ["Antonis Nikopolidis", "GK", 87],
morientes: ["Morientes",  "F", 87],
lampard: ["Frank Lampard", "MID", 87],
cafu: ["Cafú", "DEF", 87],
bergkamp: ["Dennis Bergkamp",  "F",  87],
dida: ["Dida",  "GK",  87],
ballack: ["Michael Ballack", "MID", 87],
barthez: ["Fabien Barthez", "GK", 87],
inzaghi: ["Filippo Inzaghi",  "F",  87],
zanetti: ["J. Zanetti", "DEF", 87],
beckham: ["David Beckham", "MID", 87],
deco: ["Deco", "MID", 86],
gilberto: ["Gilberto", "MID", 86],
joaquin: ["Joaquín",  "MID",	 86],
roberto: ["Zé Roberto",  "MID", 	86],
samuel: ["Walter Adrián Samuel",  "DEF",  86],
buyten: [ "Daniel Van Buyten",  "DEF",  86],
howard: [ "Tim Howard",  "GK", 	86],
terry: [ "John Terry",	 "DEF", 	86],
pirlo: [ "Andrea Pirlo", 	"MID", 	86]
};

let listVals = [];
let listKeys = [];

for(const [key, val] of Object.entries(players)) {
    listKeys.push(key);
    listVals.push(val);
}

// listKeys.push("pele");
// listVals.push(["Pelé", "F", 98]);

// listKeys.push("maradona");
// listVals.push(["Maradona", "F", 97]);

// Array.from(players).forEeach(p => {
//     console.log(p);
// });

// players.forEach((p) => {
//     console.log(p);
//     listItems.push(p);
// });

export {listVals};
export {listKeys};