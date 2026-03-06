import { users, generateToken } from './data/users'
import { recipes, bomMasters, bomDetails, costBases } from './data/recipes'
import { materials, materialsWithUnit, units, priceHistories } from './data/materials'
import { stores } from './data/stores'
import { dailyMaterialUsage, costTracking, costTrends, varianceSummary } from './data/cost'
import { lossAnalysis, lossTrends, lossTypeDistribution, materialLossData, storeLossData } from './data/loss'
import { suppliers, supplierQuotations, purchaseSuggestions, supplierEvaluations, priceComparisonHistory } from './data/suppliers'
import { warningRules, warningRecords, warningStats, warningTrends, warningTypeDistribution } from './data/warnings'
import { profitAnalysis, profitTrends, categoryProfitDistribution, storeProfitComparison, profitForecast, pricingRecommendations } from './data/profit'


//模拟延迟
const delay=(ms=300)=>new Promise