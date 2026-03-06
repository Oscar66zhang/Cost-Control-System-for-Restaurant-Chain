// 毛利率分析数据
export const profitAnalysis = [
  {
    id: 1,
    recipeId: 1,
    recipeName: '红烧肉',
    category: '热菜',
    sellingPrice: 48.00,
    standardCost: 18.50,
    actualCost: 19.20,
    targetMargin: 61.46,
    actualMargin: 60.00,
    marginVariance: -1.46,
    salesQty: 85,
    totalRevenue: 4080.00,
    totalCost: 1632.00,
    totalProfit: 2448.00,
    profitRate: 60.00,
    avgSalesPerDay: 12.14,
    trendDirection: 'DOWN',
    lastMonthMargin: 62.30,
    marginChange: -2.30,
    recommendedPrice: 49.00,
    storePerformance: [
      { storeId: 1, storeName: '市中心旗舰店', margin: 58.20, salesQty: 25 },
      { storeId: 2, storeName: '西单购物中心店', margin: 61.50, salesQty: 20 },
      { storeId: 3, storeName: '三里屯店', margin: 60.80, salesQty: 22 },
      { storeId: 4, storeName: '王府井店', margin: 59.90, salesQty: 18 }
    ]
  },
  {
    id: 2,
    recipeId: 2,
    recipeName: '宫保鸡丁',
    category: '热菜',
    sellingPrice: 38.00,
    standardCost: 15.20,
    actualCost: 15.60,
    targetMargin: 60.00,
    actualMargin: 58.95,
    marginVariance: -1.05,
    salesQty: 92,
    totalRevenue: 3496.00,
    totalCost: 1435.20,
    totalProfit: 2060.80,
    profitRate: 58.95,
    avgSalesPerDay: 13.14,
    trendDirection: 'UP',
    lastMonthMargin: 57.80,
    marginChange: 1.15,
    recommendedPrice: 38.00,
    storePerformance: [
      { storeId: 1, storeName: '市中心旗舰店', margin: 62.10, salesQty: 28 },
      { storeId: 2, storeName: '西单购物中心店', margin: 58.20, salesQty: 24 },
      { storeId: 3, storeName: '三里屯店', margin: 57.50, salesQty: 22 },
      { storeId: 4, storeName: '王府井店', margin: 58.90, salesQty: 18 }
    ]
  },
  {
    id: 3,
    recipeId: 3,
    recipeName: '蒜蓉白菜',
    category: '素菜',
    sellingPrice: 18.00,
    standardCost: 6.80,
    actualCost: 7.05,
    targetMargin: 62.22,
    actualMargin: 60.83,
    marginVariance: -1.39,
    salesQty: 156,
    totalRevenue: 2808.00,
    totalCost: 1099.80,
    totalProfit: 1708.20,
    profitRate: 60.83,
    avgSalesPerDay: 22.29,
    trendDirection: 'STABLE',
    lastMonthMargin: 61.20,
    marginChange: -0.37,
    recommendedPrice: 18.00,
    storePerformance: [
      { storeId: 1, storeName: '市中心旗舰店', margin: 60.80, salesQty: 45 },
      { storeId: 2, storeName: '西单购物中心店', margin: 61.20, salesQty: 38 },
      { storeId: 3, storeName: '三里屯店', margin: 60.50, salesQty: 40 },
      { storeId: 4, storeName: '王府井店', margin: 60.90, salesQty: 33 }
    ]
  },
  {
    id: 4,
    recipeId: 4,
    recipeName: '土豆丝',
    category: '素菜',
    sellingPrice: 16.00,
    standardCost: 5.50,
    actualCost: 5.25,
    targetMargin: 65.63,
    actualMargin: 67.19,
    marginVariance: 1.56,
    salesQty: 134,
    totalRevenue: 2144.00,
    totalCost: 703.50,
    totalProfit: 1440.50,
    profitRate: 67.19,
    avgSalesPerDay: 19.14,
    trendDirection: 'UP',
    lastMonthMargin: 65.20,
    marginChange: 1.99,
    recommendedPrice: 16.00,
    storePerformance: [
      { storeId: 1, storeName: '市中心旗舰店', margin: 68.20, salesQty: 38 },
      { storeId: 2, storeName: '西单购物中心店', margin: 66.80, salesQty: 32 },
      { storeId: 3, storeName: '三里屯店', margin: 67.50, salesQty: 35 },
      { storeId: 4, storeName: '王府井店', margin: 66.90, salesQty: 29 }
    ]
  }
]

// 毛利率趋势数据
export const profitTrends = [
  { date: '2024-01-01', totalMargin: 61.5, hotDishes: 60.2, coldDishes: 63.8, soups: 59.5, staples: 64.2 },
  { date: '2024-01-02', totalMargin: 62.1, hotDishes: 61.0, coldDishes: 64.2, soups: 60.1, staples: 64.8 },
  { date: '2024-01-03', totalMargin: 61.8, hotDishes: 60.5, coldDishes: 63.9, soups: 59.8, staples: 65.1 },
  { date: '2024-01-04', totalMargin: 62.3, hotDishes: 61.2, coldDishes: 64.5, soups: 60.3, staples: 64.9 },
  { date: '2024-01-05', totalMargin: 61.9, hotDishes: 60.8, coldDishes: 64.1, soups: 59.9, staples: 65.3 },
  { date: '2024-01-06', totalMargin: 62.5, hotDishes: 61.5, coldDishes: 64.8, soups: 60.5, staples: 65.0 },
  { date: '2024-01-07', totalMargin: 62.2, hotDishes: 61.1, coldDishes: 64.3, soups: 60.2, staples: 65.2 }
]

// 菜品类别毛利率分布
export const categoryProfitDistribution = [
  {
    category: '热菜',
    avgMargin: 61.1,
    totalRevenue: 15680.00,
    totalCost: 6099.20,
    totalProfit: 9580.80,
    dishCount: 8,
    topDish: '宫保鸡丁',
    topDishMargin: 62.1,
    lowDish: '红烧肉',
    lowDishMargin: 58.2,
    marginRange: 3.9,
    recommendations: ['优化红烧肉成本控制', '推广宫保鸡丁销售']
  },
  {
    category: '素菜',
    avgMargin: 64.3,
    totalRevenue: 8952.00,
    totalCost: 3195.84,
    totalProfit: 5756.16,
    dishCount: 6,
    topDish: '土豆丝',
    topDishMargin: 68.2,
    lowDish: '蒜蓉白菜',
    lowDishMargin: 60.5,
    marginRange: 7.7,
    recommendations: ['提升蒜蓉白菜定价', '增加土豆丝推广力度']
  },
  {
    category: '汤品',
    avgMargin: 60.2,
    totalRevenue: 4840.00,
    totalCost: 1926.16,
    totalProfit: 2913.84,
    dishCount: 4,
    topDish: '蒸蛋羹',
    topDishMargin: 61.3,
    lowDish: '紫菜蛋花汤',
    lowDishMargin: 58.8,
    marginRange: 2.5,
    recommendations: ['稳定汤品成本', '提升汤品附加值']
  },
  {
    category: '主食',
    avgMargin: 65.2,
    totalRevenue: 5880.00,
    totalCost: 2045.76,
    totalProfit: 3834.24,
    dishCount: 5,
    topDish: '扬州炒饭',
    topDishMargin: 67.8,
    lowDish: '牛肉炒河粉',
    lowDishMargin: 62.5,
    marginRange: 5.3,
    recommendations: ['推广高毛利主食', '优化牛肉河粉成本']
  }
]

// 门店毛利率对比
export const storeProfitComparison = [
  {
    storeId: 1,
    storeName: '市中心旗舰店',
    avgMargin: 61.8,
    totalRevenue: 12580.00,
    totalCost: 4804.76,
    totalProfit: 7775.24,
    monthTarget: 63.0,
    targetAchievement: 98.1,
    lastMonthMargin: 62.5,
    monthChange: -0.7,
    bestCategory: '主食',
    bestCategoryMargin: 65.8,
    worstCategory: '热菜',
    worstCategoryMargin: 59.2,
    trendDirection: 'DOWN'
  },
  {
    storeId: 2,
    storeName: '西单购物中心店',
    avgMargin: 63.2,
    totalRevenue: 11240.00,
    totalCost: 4136.32,
    totalProfit: 7103.68,
    monthTarget: 62.5,
    targetAchievement: 101.1,
    lastMonthMargin: 62.8,
    monthChange: 0.4,
    bestCategory: '素菜',
    bestCategoryMargin: 66.5,
    worstCategory: '汤品',
    worstCategoryMargin: 60.8,
    trendDirection: 'UP'
  },
  {
    storeId: 3,
    storeName: '三里屯店',
    avgMargin: 62.5,
    totalRevenue: 10890.00,
    totalCost: 4083.75,
    totalProfit: 6806.25,
    monthTarget: 62.0,
    targetAchievement: 100.8,
    lastMonthMargin: 61.9,
    monthChange: 0.6,
    bestCategory: '主食',
    bestCategoryMargin: 65.2,
    worstCategory: '热菜',
    worstCategoryMargin: 60.1,
    trendDirection: 'UP'
  },
  {
    storeId: 4,
    storeName: '王府井店',
    avgMargin: 62.0,
    totalRevenue: 9642.00,
    totalCost: 3664.36,
    totalProfit: 5977.64,
    monthTarget: 62.5,
    targetAchievement: 99.2,
    lastMonthMargin: 62.3,
    monthChange: -0.3,
    bestCategory: '素菜',
    bestCategoryMargin: 64.8,
    worstCategory: '汤品',
    worstCategoryMargin: 59.5,
    trendDirection: 'STABLE'
  }
]

// 毛利率预测数据
export const profitForecast = [
  { month: '2024-02', predictedMargin: 62.8, confidence: 85, factors: ['春节效应', '原料价格上涨'] },
  { month: '2024-03', predictedMargin: 63.2, confidence: 78, factors: ['季节性蔬菜降价', '新菜品推出'] },
  { month: '2024-04', predictedMargin: 62.5, confidence: 72, factors: ['原料供应恢复', '竞争加剧'] },
  { month: '2024-05', predictedMargin: 63.0, confidence: 68, factors: ['菜品结构优化', '成本控制改善'] },
  { month: '2024-06', predictedMargin: 63.5, confidence: 65, factors: ['夏季菜品推广', '运营效率提升'] }
]

// 定价建议数据
export const pricingRecommendations = [
  {
    recipeId: 1,
    recipeName: '红烧肉',
    currentPrice: 48.00,
    currentMargin: 60.00,
    targetMargin: 62.00,
    recommendedPrice: 49.00,
    priceChange: 1.00,
    priceChangeRate: 2.08,
    expectedMargin: 62.04,
    expectedSalesImpact: -5.0,
    expectedRevenueImpact: 2.8,
    recommendation: '建议小幅提价',
    reasoning: '成本控制优化空间有限，适度提价可提升毛利率',
    riskLevel: 'LOW',
    implementationSuggestion: '分两次提价，每次0.5元'
  },
  {
    recipeId: 3,
    recipeName: '蒜蓉白菜',
    currentPrice: 18.00,
    currentMargin: 60.83,
    targetMargin: 62.22,
    recommendedPrice: 18.50,
    priceChange: 0.50,
    priceChangeRate: 2.78,
    expectedMargin: 62.43,
    expectedSalesImpact: -3.0,
    expectedRevenueImpact: 2.2,
    recommendation: '建议优化成本或微调价格',
    reasoning: '素菜竞争激烈，优先考虑成本优化',
    riskLevel: 'MEDIUM',
    implementationSuggestion: '寻找替代供应商降低原料成本'
  }
] 