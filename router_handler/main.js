// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: '127.0.0.1',
//     port:3306,
//     user: 'root',
//     password: '123456',
//     database: 'vdda'
// });

// connection.connect();

const db = require("../db/index");

/**
 * 创建像素空间
 * @param {*} width 像素列数
 * @param {*} height 像素行数
 * @returns 
 */
const getXyArray = (width, height) => {
    let res = [];
    for (let row = 0; row < height; row++) {
        let rowData = [];
        for (let col = 0; col < width; col++) {
            rowData.push({
                count: 0,
                ab: []
            });
        }
        res.push(rowData);
    }
    return res;
}

// connection.query('SELECT * FROM alcohol', function (error, results, fields) {
//     if (error) throw error;
//     let con = getXyArray(800, 550);
//     results.forEach(row => {
//         let a = row['a'];
//         let b = row['b'];
//         let k = row['k'];
//         let x = k % 800;
//         let y = (k - x) / 800;
//         con[y][x].count++;
//         con[y][x].ab.push({
//             a: a,
//             b: b
//         });
//         console.log(`${x} - ${y}`);
//     });
//     console.log(con);
// });

    exports.showSquare = (req,res) => {
        const sql = 'select * from alcohol';
        db.query(sql, (err, results) => {
            if (err) return res.cc(err);
            let con = getXyArray(800,550);
            results.forEach(row => {
                let a = row['a'];
                let b = row['b'];
                let k = row['k'];
                let x = k % 800;
                let y = (k - x) / 800;
                con[y][x].count++;
                con[y][x].ab.push({
                    a: a,
                    b: b
                });
                //console.log(`${x} - ${y}`);
            })
            // console.log(con[0])
            // res.send(results);
            res.send(`<script>
                console.log(JSON.parse('${JSON.stringify(con)}'))
            </script>`);
          });
    };