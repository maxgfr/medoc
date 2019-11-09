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

function readByCis(cis, db, name_db) {
  db.serialize(function() {
    db.all("SELECT * FROM "+name_db+" WHERE cis = ?", cis, function(err, rows) {
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
var general_medoc = [];

function processGeneral(data) {
  var res = data.split("\t");
  general_medoc.push({
    cis: res[0],
    denomination_medicament: res[1],
    forme_pharmaceutique: res[2],
    voies_administration: res[3],
    status_administratif: res[4],
    type_procedure_amm: res[5],
    etat_commercialisation: res[6],
    data_amm: res[7],
    statut_bdm: res[8],
    num_autorisation_europeenne: res[9],
    titulaires: res[10],
    surveillance_renforcee: res[11]
  });
}

function saveDataGeneral(arr, db, name_db) {
  //console.log('Length of the array : '+arr.length);
  db.serialize(function() {

    db.run("DROP TABLE IF EXISTS "+name_db);

    db.run("CREATE TABLE IF NOT EXISTS "+name_db+" (cis TEXT, denomination_medicament TEXT, forme_pharmaceutique TEXT, voies_administration TEXT, status_administratif TEXT, type_procedure_amm TEXT, etat_commercialisation TEXT, data_amm TEXT, statut_bdm TEXT, num_autorisation_europeenne TEXT, titulaires TEXT, surveillance_renforcee TEXT)");

    var stmt = db.prepare("INSERT INTO "+name_db+" VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    for (var i = 0; i < arr.length; i++) {
        stmt.run(
          arr[i].cis,
          arr[i].denomination_medicament,
          arr[i].forme_pharmaceutique,
          arr[i].voies_administration,
          arr[i].status_administratif,
          arr[i].type_procedure_amm,
          arr[i].etat_commercialisation,
          arr[i].data_amm,
          arr[i].statut_bdm,
          arr[i].num_autorisation_europeenne,
          arr[i].titulaires,
          arr[i].surveillance_renforcee
        );
    }
    stmt.finalize();
  });

  db.close();
}

//readLines(inputGeneral, processGeneral, () => { saveDataGeneral(general_medoc, dbGeneral, "CIS_GENERAL"); });

readByCis("66057393", dbGeneral, "CIS_GENERAL");

var inputCompo = fs.createReadStream('./data/CIS_COMPO_bdpm.txt');
var dbCompo = new sqlite3.Database('data/dbCompo.db');
var compo_medoc = [];

function processCompo(data) {
  var res = data.split("\t");
  compo_medoc.push({
    cis: res[0],
    designation: res[1],
    code: res[2],
    denomination_substance: res[3],
    dosage_substance: res[4],
    ref_dosage: res[5],
    nature_composant: res[6],
    num_liaison: res[7]
  });

}

function saveDataCompo(arr, db, name_db) {
  //console.log('Length of the array : '+arr.length);
  db.serialize(function() {

    db.run("DROP TABLE IF EXISTS "+name_db);

    db.run("CREATE TABLE IF NOT EXISTS "+name_db+" (cis TEXT, designation TEXT, code TEXT, denomination_substance TEXT, dosage_substance TEXT, ref_dosage TEXT, nature_composant TEXT, num_liaison TEXT)");

    var stmt = db.prepare("INSERT INTO "+name_db+" VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

    for (var i = 0; i < arr.length; i++) {
        stmt.run(
          arr[i].cis,
          arr[i].designation,
          arr[i].code,
          arr[i].denomination_substance,
          arr[i].dosage_substance,
          arr[i].ref_dosage,
          arr[i].nature_composant,
          arr[i].num_liaison
        );
    }
    stmt.finalize();
  });

  db.close();
}

//readLines(inputCompo, processCompo, () => { saveDataCompo(compo_medoc, dbCompo, "CIS_COMPO"); });

readByCis("66057393", dbCompo, "CIS_COMPO");

var inputCondition = fs.createReadStream('./data/CIS_CPD_bdpm.txt');
var dbCondition = new sqlite3.Database('data/dbCondition.db');
var condition = [];

function processCondition(data) {
  var res = data.split("\t");
  condition.push({
    cis: res[0],
    condition: res[1]
  });

}

function saveDataCondition(arr, db, name_db) {
  //console.log('Length of the array : '+arr.length);
  db.serialize(function() {

    db.run("DROP TABLE IF EXISTS "+name_db);

    db.run("CREATE TABLE IF NOT EXISTS "+name_db+" (cis TEXT, condition TEXT)");

    var stmt = db.prepare("INSERT INTO "+name_db+" VALUES (?, ?)");

    for (var i = 0; i < arr.length; i++) {
        stmt.run(
          arr[i].cis,
          arr[i].condition
        );
    }
    stmt.finalize();
  });

  db.close();
}

//readLines(inputCondition, processCondition, () => { saveDataCondition(condition, dbCondition, "CIS_CPD"); });

readByCis("65982247", dbCondition, "CIS_CPD");

var inputAsmr = fs.createReadStream('./data/CIS_HAS_ASMR_bdpm.txt');
var dbAsmr = new sqlite3.Database('data/dbAsmr.db');
var asmr = [];

function processAsmr(data) {
  var res = data.split("\t");
  asmr.push({
    cis: res[0],
    has: res[1],
    motif_eval: res[2],
    date_com_transparence: res[3],
    valeur_asmr: res[4],
    libelle_asmr: res[5]
  });
}

function saveDataAsmr(arr, db, name_db) {
  //console.log('Length of the array : '+arr.length);
  db.serialize(function() {

    db.run("DROP TABLE IF EXISTS "+name_db);

    db.run("CREATE TABLE IF NOT EXISTS "+name_db+" (cis TEXT, has TEXT, motif_eval TEXT, date_com_transparence TEXT, valeur_asmr TEXT, libelle_asmr TEXT)");

    var stmt = db.prepare("INSERT INTO "+name_db+" VALUES (?, ?, ?, ?, ?, ?)");

    for (var i = 0; i < arr.length; i++) {
        stmt.run(
          arr[i].cis,
          arr[i].has,
          arr[i].motif_eval,
          arr[i].date_com_transparence,
          arr[i].valeur_asmr,
          arr[i].libelle_asmr
        );
    }
    stmt.finalize();
  });

  db.close();
}

//readLines(inputAsmr, processAsmr, () => { saveDataAsmr(asmr, dbAsmr, "CIS_HAS_ASMR"); });

readByCis("65071397", dbAsmr, "CIS_HAS_ASMR");

var inputSmr = fs.createReadStream('./data/CIS_HAS_SMR_bdpm.txt');
var dbSmr = new sqlite3.Database('data/dbSmr.db');
var smr = [];

function processSmr(data) {
  var res = data.split("\t");
  smr.push({
    cis: res[0],
    has: res[1],
    motif_eval: res[2],
    date_com_transparence: res[3],
    valeur_smr: res[4],
    libelle_smr: res[5]
  });
}

function saveDataSmr(arr, db, name_db) {
  //console.log('Length of the array : '+arr.length);
  db.serialize(function() {

    db.run("DROP TABLE IF EXISTS "+name_db);

    db.run("CREATE TABLE IF NOT EXISTS "+name_db+" (cis TEXT, has TEXT, motif_eval TEXT, date_com_transparence TEXT, valeur_smr TEXT, libelle_smr TEXT)");

    var stmt = db.prepare("INSERT INTO "+name_db+" VALUES (?, ?, ?, ?, ?, ?)");

    for (var i = 0; i < arr.length; i++) {
        stmt.run(
          arr[i].cis,
          arr[i].has,
          arr[i].motif_eval,
          arr[i].date_com_transparence,
          arr[i].valeur_smr,
          arr[i].libelle_smr
        );
    }
    stmt.finalize();
  });

  db.close();
}

//readLines(inputSmr, processSmr, () => { saveDataSmr(smr, dbSmr, "CIS_HAS_SMR"); });

readByCis("66393935", dbSmr, "CIS_HAS_SMR");

var inputInfo = fs.createReadStream('./data/CIS_InfoImportantes_20191002092032_bdpm.txt');
var dbInfo = new sqlite3.Database('data/dbInfo.db');
var infos = [];

function processInfo(data) {
  var res = data.split("\t");
  infos.push({
    cis: res[0],
    from_date: res[1],
    to_date: res[2],
    text: res[3]
  });
}

function saveDataInfo(arr, db, name_db) {
  //console.log('Length of the array : '+arr.length);
  db.serialize(function() {

    db.run("DROP TABLE IF EXISTS "+name_db);

    db.run("CREATE TABLE IF NOT EXISTS "+name_db+" (cis TEXT, from_date TEXT, to_date TEXT, text TEXT)");

    var stmt = db.prepare("INSERT INTO "+name_db+" VALUES (?, ?, ?, ?)");

    for (var i = 0; i < arr.length; i++) {
        stmt.run(
          arr[i].cis,
          arr[i].from_date,
          arr[i].to_date,
          arr[i].text
        );
    }
    stmt.finalize();
  });

  db.close();
}

//readLines(inputInfo, processInfo, () => { saveDataInfo(infos, dbInfo, "CIS_InfoImportantes"); });

readByCis("60004971", dbInfo, "CIS_InfoImportantes");
