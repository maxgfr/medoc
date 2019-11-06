// MAJ 03/06
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var inputCIP = fs.createReadStream('./data/CIS_CIP_bdpm.txt');
var dbCIP = new sqlite3.Database('data/dbCIP.db');
var all_medoc = [];

function readLines(input, func, callback) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
    callback();
  });
}

function readByCis(cis, db) {
  db.serialize(function() {
    db.all("SELECT * FROM CIP_CIS WHERE cis = ?", cis, function(err, rows) {
        rows.forEach(function (row) {
            console.log(row);
        });
    });
  });
  db.close();
}

function readByCip13(cip13, db) {
  db.serialize(function() {
    db.all("SELECT * FROM CIP_CIS WHERE cip13 = ?", cip13, function(err, rows) {
        rows.forEach(function (row) {
            console.log(row);
        });
    });
  });
  db.close();
}

function processCIP(data) {
  var res = data.split("\t");
  all_medoc.push({
    cis: res[0],
    cip7: res[1],
    libelle_pres: res[2],
    status_administratif: res[3],
    etat_commercialisation: res[4],
    date_decla_commercialisation: res[5],
    cip13: res[6],
    agrement_collectivite: res[7],
    taux_remboursement: res[8],
    prix_medicament: res[9],
    indication_droit_remboursement: res[10]
  });
}

function saveDataCIP(arr) {
  //console.log('Length of the array : '+arr.length);
  dbCIP.serialize(function() {

    dbCIP.run("DROP TABLE IF EXISTS CIP_CIS");

    dbCIP.run("CREATE TABLE IF NOT EXISTS CIP_CIS (cis TEXT, cip7 TEXT, libelle_pres TEXT, status_administratif TEXT, etat_commercialisation TEXT, date_decla_commercialisation TEXT, cip13 TEXT, agrement_collectivite TEXT, taux_remboursement TEXT, prix_medicament TEXT, indication_droit_remboursement TEXT)");

    var stmt = dbCIP.prepare("INSERT INTO CIP_CIS VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    for (var i = 0; i < arr.length; i++) {
        stmt.run(
          arr[i].cis,
          arr[i].cip7,
          arr[i].libelle_pres,
          arr[i].status_administratif,
          arr[i].etat_commercialisation,
          arr[i].date_decla_commercialisation,
          arr[i].cip13,
          arr[i].agrement_collectivite,
          arr[i].taux_remboursement,
          arr[i].prix_medicament,
          arr[i].indication_droit_remboursement
        );
    }
    stmt.finalize();
  });

  dbCIP.close();
}

//readLines(inputCIP, processCIP, () => { saveDataCIP(all_medoc); });

readByCip13("3400933254063", dbCIP);

var inputGeneral = fs.createReadStream('./data/CIS_bdpm.txt');
var dbGeneral = new sqlite3.Database('data/dbGeneral.db');

function processCIP(data) {
  var res = data.split("\t");
  all_medoc.push({
    cis: res[0],
    cip7: res[1],
    libelle_pres: res[2],
    status_administratif: res[3],
    etat_commercialisation: res[4],
    date_decla_commercialisation: res[5],
    cip13: res[6],
    agrement_collectivite: res[7],
    taux_remboursement: res[8],
    prix_medicament: res[9],
    indication_droit_remboursement: res[10]
  });
}

function saveDataCIP(arr) {
  //console.log('Length of the array : '+arr.length);
  dbCIP.serialize(function() {

    dbCIP.run("DROP TABLE IF EXISTS CIP_CIS");

    dbCIP.run("CREATE TABLE IF NOT EXISTS CIP_CIS (cis TEXT, cip7 TEXT, libelle_pres TEXT, status_administratif TEXT, etat_commercialisation TEXT, date_decla_commercialisation TEXT, cip13 TEXT, agrement_collectivite TEXT, taux_remboursement TEXT, prix_medicament TEXT, indication_droit_remboursement TEXT)");

    var stmt = dbCIP.prepare("INSERT INTO CIP_CIS VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    for (var i = 0; i < arr.length; i++) {
        stmt.run(
          arr[i].cis,
          arr[i].cip7,
          arr[i].libelle_pres,
          arr[i].status_administratif,
          arr[i].etat_commercialisation,
          arr[i].date_decla_commercialisation,
          arr[i].cip13,
          arr[i].agrement_collectivite,
          arr[i].taux_remboursement,
          arr[i].prix_medicament,
          arr[i].indication_droit_remboursement
        );
    }
    stmt.finalize();
  });

  dbCIP.close();
}

readLines(inputCIP, processCIP, () => { saveDataCIP(all_medoc); });

readByCis("66057393", dbGeneral);
