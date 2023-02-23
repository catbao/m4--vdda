const express = require('express')
const router = express.Router()

const useHandler = require('../router_handler/use_handler.js')
const square = require('../router_handler/main.js')

router.get('/showLineChart',useHandler.showLineChart)
router.get('/showLineChart_agg',useHandler.showLineChart_agg)

router.get('/showScatter',useHandler.showScatter)
router.get('/showScatter_agg',useHandler.showScatter_agg)

router.get('/showZoomScatter',useHandler.showZoomScatter)

router.get('/showBar',useHandler.showBar)
router.get('/showBar_agg',useHandler.showBar_agg)

router.get('/showStackedBar',useHandler.showStackedBar)
router.get('/showStackedBar_agg',useHandler.showStackedBar_agg)

router.get('/showLineChart2',useHandler.showLineChart2)
router.get('/showLineChart2_agg',useHandler.showLineChart2_agg)


// router.get('/showMulLineChart',useHandler.showMulLineChart)
// router.get('/showMulLineChart2',useHandler.showMulLineChart2)
router.get('/showCanvasLineChart',useHandler.showCanvasLineChart)
router.get('/showCanvasLineChart2',useHandler.showCanvasLineChart2)
// router.get('/showLineChartTest',useHandler.showLineChartTest)

router.get('/showSquare',square.showSquare)


module.exports = router