const db = require("../db/index");

exports.showLineChart = (req, res) => {
  // const sql =
  //   "select distinct date,value,index1 from line1 join(select k,min(value) as v_min, max(value) as v_max,min(index1) as t_min, max(index1) as t_max from line1 group by k) as data_a on data_a.k = line1.k and(value = v_min or value = v_max or index1 = t_min or index1 = t_max)";
  const sql = "select date,value from line1";
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    // res.send({
    //     status: 0,
    //     message: '获取信息成功！',
    //     data: result,
    //   })
    res.send(result);
    // let str = JSON.stringify(result)
    // res.send(str)
  });
};

exports.showLineChart_agg = (req, res) => {
  // const sql =
  //   "select distinct date,value,index1 from line1 join(select k,min(value) as v_min, max(value) as v_max,min(index1) as t_min, max(index1) as t_max from line1 group by k) as data_a on data_a.k = line1.k and(value = v_min or value = v_max or index1 = t_min or index1 = t_max)";
  const sql =
    "select distinct date,value,index1 from line1 join(select k,min(value) as v_min, max(value) as v_max from line1 group by k) as data_a on data_a.k = line1.k and(value = v_min or value = v_max)";
  //const sql = 'select date,value from line1'
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    // res.send({
    //     status: 0,
    //     message: '获取信息成功！',
    //     data: result,
    //   })
    res.send(result);
    // let str = JSON.stringify(result)
    // res.send(str)
  });
};

exports.showScatter = (req, res) => {
  //const sql = "SELECT k,a,b,max(id)id FROM alcohol_test GROUP BY k";
  const sql = "select a,b,lable from mnist_tsne";
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    res.send(result);
  });
};

exports.showScatter_agg = (req, res) => {
  const sql = "SELECT k,a,b,lable,max(index1)id FROM mnist_tsne GROUP BY k";
  //const sql = "select a,b from alcohol_test";
  //const sql = "select a,b from humidity2";
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    res.send(result);
  });
};

exports.showZoomScatter = (req, res) => {
  //const sql = "SELECT k,a,b,max(id)id FROM alcohol_test GROUP BY k";
  const sql = "select a,b from alcohol_test";
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    res.send(result);
  });
};

exports.showBar = (req, res) => {
  //const sql = "select a, max(b) as b from bar group by k";
  const sql = "select a,b from bar";
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    res.send(result);
  });
};

exports.showBar_agg = (req, res) => {
  const sql = "select a, max(b) as b from bar group by k";
  //const sql = 'select a,b from bar'
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    res.send(result);
  });
};

exports.showStackedBar = (req, res) => {
  // const sql =
  //   "select DISTINCT group1,Nitrogen,normal,stress from data_stacked join (select k,max(sum) max_s from data_stacked group by k) as data_a on data_a.k=data_stacked.k and sum = max_s";
  const sql = "select group1,Nitrogen,normal,stress from data_stacked";
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    res.send(result);
  });
};

exports.showStackedBar_agg = (req, res) => {
  const sql =
    "select DISTINCT group1,Nitrogen,normal,stress from data_stacked join (select k,max(sum) max_s from data_stacked group by k) as data_a on data_a.k=data_stacked.k and sum = max_s";
  //const sql = 'select group1,Nitrogen,normal,stress from data_stacked'
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    res.send(result);
  });
};

exports.showLineChart2 = (req, res) => {
  //const sql = 'select distinct date,Open,index1 from b join(select k,min(Open) as v_min, max(Open) as v_max,min(index1) as t_min, max(index1) as t_max from b group by k) as data_a on data_a.k = b.k and(Open = v_min or Open = v_max or index1 = t_min or index1 = t_max)'
  const sql = "select date,Open from b";
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    res.send(result);
  });
};

exports.showLineChart2_agg = (req, res) => {
  const sql =
    "select distinct date,Open,index1 from b join(select k,min(Open) as v_min, max(Open) as v_max,min(index1) as t_min, max(index1) as t_max from b group by k) as data_a on data_a.k = b.k and(Open = v_min or Open = v_max or index1 = t_min or index1 = t_max)";
  //const sql = 'select distinct date,Open,index1 from b join(select k,min(Open) as v_min from b group by k) as data_a on data_a.k = b.k and Open = v_min'
  //const sql = "select date,Open from b";
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    res.send(result);
  });
};

// exports.showMulLineChart = (req, res) => {
//   //const sql = 'select distinct date,Open,index1 from b join(select k,min(Open) as v_min, max(Open) as v_max,min(index1) as t_min, max(index1) as t_max from b group by k) as data_a on data_a.k = b.k and(Open = v_min or Open = v_max or index1 = t_min or index1 = t_max)'
//   const sql = "select date,Open,High from b";
//   db.query(sql, (err, result) => {
//     if (err) return res.cc(err);
//     res.send(result);
//   });
// };

// exports.showMulLineChart2 = (req, res) => {
//   //const sql = 'select distinct date,Open,index1 from b join(select k,min(Open) as v_min, max(Open) as v_max,min(index1) as t_min, max(index1) as t_max from b group by k) as data_a on data_a.k = b.k and(Open = v_min or Open = v_max or index1 = t_min or index1 = t_max)'
//   const sql = "select name,time,h from mulline";
//   db.query(sql, (err, result) => {
//     if (err) return res.cc(err);
//     res.send(result);
//   });
// };

exports.showCanvasLineChart = (req, res) => {
  //const sql = 'select distinct date,Open,index1 from b join(select k,min(Open) as v_min, max(Open) as v_max,min(index1) as t_min, max(index1) as t_max from b group by k) as data_a on data_a.k = b.k and(Open = v_min or Open = v_max or index1 = t_min or index1 = t_max)'
  const sql = "select date,Open from b";
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    res.send(result);
  });
};
exports.showCanvasLineChart2 = (req, res) => {
  const sql =
    "select distinct date,Open,index1 from b join(select k,min(Open) as v_min, max(Open) as v_max,min(index1) as t_min, max(index1) as t_max from b group by k) as data_a on data_a.k = b.k and(Open = v_min or Open = v_max or index1 = t_min or index1 = t_max)";
  //const sql = "select date,Open from b";
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    res.send(result);
  });
};

// exports.showLineChartTest = (req, res) => {
//   const sql = 'select distinct date,value,index1 from goog join(select k,min(value) as v_min, max(value) as v_max,min(index1) as t_min, max(index1) as t_max from goog group by k) as data_a on data_a.k = goog.k and(value = v_min or value = v_max or index1 = t_min or index1 = t_max)'
//   //const sql = "select date,value from GOOG";
//   db.query(sql, (err, result) => {
//     if (err) return res.cc(err);
//     res.send(result);
//   });
// };
