// MAJ 03/06
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/db.sqlite3');
var fs = require('fs');
var input = fs.createReadStream('./data/CIS_CIP_bdpm.txt');
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

function process(data) {
  var res = data.split("\t");
  all_medoc.push({
    cis: res[0],
    cip7: res[1],
    cip13: res[6]
  });
}

function saveData(arr) {
  //console.log('Length of the array : '+arr.length);
  db.serialize(function() {

    db.run("DROP TABLE IF EXISTS CIP_CIS");

    db.run("CREATE TABLE IF NOT EXISTS CIP_CIS (cis TEXT, cip7 TEXT, cip13 TEXT)");

    var stmt = db.prepare("INSERT INTO CIP_CIS VALUES (?, ?, ?)");

    for (var i = 0; i < arr.length; i++) {
        stmt.run(arr[i].cis, arr[i].cip7, arr[i].cip13);
    }

    stmt.finalize();
  });

  db.close();
}

function readAllData() {
  db.serialize(function() {
    db.all("SELECT rowid AS id, cis, cip7, cip13 FROM CIP_CIS", function(err, rows) {
        rows.forEach(function (row) {
            console.log(row.id + ": " + row.cis + " - " + row.cip7 + " - " + row.cip13);
        });
    });
  });

  db.close();
}

/*
readLines(input, process, function() {
  saveData(all_medoc);
});
*/

readAllData();
