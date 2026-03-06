// 预警规则配置数据
export const warningRules = [
  {
    id: 1,
    ruleName: '成本超标预警',
    ruleType: 'COST_OVER',
    category: '成本类',
    targetType: 'RECIPE',
    targetId: null, // null表示适用于所有菜品
    threshold: 15.0,
    thresholdType: 'PERCENTAGE',
    warningLevel: 'HIGH',
    description: '菜品实际成本超出标准成本15%时触发预警',
    isEnabled: 1,
    notificationMethods: ['EMAIL', 'SMS', 'SYSTEM'],
    recipients: ['manager@restaurant.com', '13800138000'],
    triggerCondition: 'IMMEDIATE',
    cooldownMinutes: 60,
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-07 16:30:00'
  },
  {
    id: 2,
    ruleName: '损耗率异常预警',
    ruleType: 'LOSS_OVER',
    category: '损耗类',
    targetType: 'MATERIAL',
    targetId: null,
    threshold: 10.0,
    thresholdType: 'PERCENTAGE',
    warningLevel: 'MEDIUM',
    description: '原料损耗率超过10%时触发预警',
    isEnabled: 1,
    notificationMethods: ['SYSTEM', 'EMAIL'],
    recipients: ['manager@restaurant.com'],
    triggerCondition: 'IMMEDIATE',
    cooldownMinutes: 30,
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-07 15:20:00'
  },
  {
    id: 3,
    ruleName: '毛利率低于目标预警',
    ruleType: 'MARGIN_LOW',
    category: '毛利类',
    targetType: 'RECIPE',
    targetId: null,
    threshold: 50.0,
    thresholdType: 'PERCENTAGE',
    warningLevel: 'MEDIUM',
    description: '菜品毛利率低于50%时触发预警',
    isEnabled: 1,
    notificationMethods: ['SYSTEM'],
    recipients: [],
    triggerCondition: 'DAILY',
    cooldownMinutes: 1440, // 24小时
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-07 14:10:00'
  },
  {
    id: 4,
    ruleName: '原料价格波动预警',
    ruleType: 'PRICE_CHANGE',
    category: '价格类',
    targetType: 'MATERIAL',
    targetId: null,
    threshold: 20.0,
    thresholdType: 'PERCENTAGE',
    warningLevel: 'LOW',
    description: '原料价格波动超过20%时触发预警',
    isEnabled: 1,
    notificationMethods: ['SYSTEM', 'EMAIL'],
    recipients: ['purchase@restaurant.com'],
    triggerCondition: 'IMMEDIATE',
    cooldownMinutes: 120,
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-07 13:45:00'
  },
  {
    id: 5,
    ruleName: '用料差异过大预警',
    ruleType: 'USAGE_VARIANCE',
    category: '用料类',
    targetType: 'STORE',
    targetId: null,
    threshold: 25.0,
    thresholdType: 'PERCENTAGE',
    warningLevel: 'HIGH',
    description: '门店实际用料与标准用料差异超过25%时触发预警',
    isEnabled: 0,
    notificationMethods: ['SYSTEM', 'SMS'],
    recipients: ['13800138001'],
    triggerCondition: 'IMMEDIATE',
    cooldownMinutes: 180,
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-07 12:30:00'
  }
]

// 预警记录数据
export const warningRecords = [
  {
    id: 1,
    warningCode: 'WRN202401070001',
    ruleId: 1,
    ruleName: '成本超标预警',
    warningLevel: 'HIGH',
    warningType: 'COST_OVER',
    targetType: 'RECIPE',
    targetId: 1,
    targetName: '红烧肉',
    storeId: 1,
    storeName: '市中心旗舰店',
    warningMessage: '红烧肉实际成本￥19.20，超出标准成本￥18.50的3.78%',
    triggerValue: 19.20,
    thresholdValue: 18.50,
    excessRate: 3.78,
    warningTime: '2024-01-07 14:30:25',
    status: 'UNPROCESSED',
    processingResult: null,
    processedBy: null,
    processedTime: null,
    remark: null,
    relatedData: {
      standardCost: 18.50,
      actualCost: 19.20,
      salesQty: 10,
      totalSalesCost: 192.00
    },
    createTime: '2024-01-07 14:30:25'
  },
  {
    id: 2,
    warningCode: 'WRN202401070002',
    ruleId: 2,
    ruleName: '损耗率异常预警',
    warningLevel: 'MEDIUM',
    warningType: 'LOSS_OVER',
    targetType: 'MATERIAL',
    targetId: 1,
    targetName: '五花肉',
    storeId: 1,
    storeName: '市中心旗舰店',
    warningMessage: '五花肉损耗率14.29%，超出正常阈值10%',
    triggerValue: 14.29,
    thresholdValue: 10.00,
    excessRate: 42.90,
    warningTime: '2024-01-07 11:25:15',
    status: 'PROCESSED',
    processingResult: '已安排员工培训，规范操作流程',
    processedBy: '张经理',
    processedTime: '2024-01-07 15:30:00',
    remark: '员工操作不当导致',
    relatedData: {
      standardQty: 4.200,
      actualQty: 4.800,
      lossQty: 0.600,
      lossCost: 19.20
    },
    createTime: '2024-01-07 11:25:15'
  },
  {
    id: 3,
    warningCode: 'WRN202401070003',
    ruleId: 4,
    ruleName: '原料价格波动预警',
    warningLevel: 'LOW',
    warningType: 'PRICE_CHANGE',
    targetType: 'MATERIAL',
    targetId: 4,
    targetName: '大白菜',
    storeId: null,
    storeName: '全部门店',
    warningMessage: '大白菜价格从￥3.00上涨至￥3.50，涨幅16.67%',
    triggerValue: 3.50,
    thresholdValue: 3.00,
    excessRate: 16.67,
    warningTime: '2024-01-07 09:15:30',
    status: 'PROCESSED',
    processingResult: '已联系其他供应商询价对比',
    processedBy: '李采购',
    processedTime: '2024-01-07 10:20:00',
    remark: '季节性价格波动',
    relatedData: {
      oldPrice: 3.00,
      newPrice: 3.50,
      changeRate: 16.67,
      effectiveDate: '2024-01-02'
    },
    createTime: '2024-01-07 09:15:30'
  },
  {
    id: 4,
    warningCode: 'WRN202401060001',
    ruleId: 3,
    ruleName: '毛利率低于目标预警',
    warningLevel: 'MEDIUM',
    warningType: 'MARGIN_LOW',
    targetType: 'RECIPE',
    targetId: 2,
    targetName: '宫保鸡丁',
    storeId: 3,
    storeName: '三里屯店',
    warningMessage: '宫保鸡丁毛利率48.5%，低于目标50%',
    triggerValue: 48.50,
    thresholdValue: 50.00,
    excessRate: -3.00,
    warningTime: '2024-01-06 20:30:00',
    status: 'UNPROCESSED',
    processingResult: null,
    processedBy: null,
    processedTime: null,
    remark: null,
    relatedData: {
      sellingPrice: 38.00,
      actualCost: 19.57,
      targetMargin: 50.00,
      actualMargin: 48.50
    },
    createTime: '2024-01-06 20:30:00'
  },
  {
    id: 5,
    warningCode: 'WRN202401070005',
    ruleId: 1,
    ruleName: '成本超标预警',
    warningLevel: 'HIGH',
    warningType: 'COST_OVER',
    targetType: 'RECIPE', 
    targetId: 5,
    targetName: '蒸蛋羹',
    storeId: 2,
    storeName: '西单购物中心店',
    warningMessage: '蒸蛋羹实际成本￥10.30，超出标准成本￥8.90的15.73%',
    triggerValue: 10.30,
    thresholdValue: 8.90,
    excessRate: 15.73,
    warningTime: '2024-01-07 16:45:12',
    status: 'UNPROCESSED',
    processingResult: null,
    processedBy: null,
    processedTime: null,
    remark: null,
    relatedData: {
      standardCost: 8.90,
      actualCost: 10.30,
      salesQty: 8,
      totalSalesCost: 82.40
    },
    createTime: '2024-01-07 16:45:12'
  },
  {
    id: 6,
    warningCode: 'WRN202401070006', 
    ruleId: 4,
    ruleName: '原料价格波动预警',
    warningLevel: 'LOW',
    warningType: 'PRICE_CHANGE',
    targetType: 'MATERIAL',
    targetId: 1,
    targetName: '五花肉',
    storeId: null,
    storeName: '全部门店',
    warningMessage: '五花肉价格从￥30.00上涨至￥32.00，涨幅6.67%',
    triggerValue: 32.00,
    thresholdValue: 30.00,
    excessRate: 6.67,
    warningTime: '2024-01-07 08:20:45',
    status: 'PROCESSED',
    processingResult: '已更新采购预算，调整菜品定价',
    processedBy: '王采购',
    processedTime: '2024-01-07 09:15:00',
    remark: '原料市场价格正常波动',
    relatedData: {
      oldPrice: 30.00,
      newPrice: 32.00,
      changeRate: 6.67,
      effectiveDate: '2024-01-01'
    },
    createTime: '2024-01-07 08:20:45'
  }
]

// 预警统计数据
export const warningStats = [
  {
    date: '2024-01-07',
    totalWarnings: 8,
    highLevelWarnings: 2,
    mediumLevelWarnings: 4,
    lowLevelWarnings: 2,
    processedWarnings: 5,
    unprocessedWarnings: 3,
    avgProcessingTime: 125, // 分钟
    topWarningType: 'COST_OVER'
  },
  {
    date: '2024-01-06',
    totalWarnings: 6,
    highLevelWarnings: 1,
    mediumLevelWarnings: 3,
    lowLevelWarnings: 2,
    processedWarnings: 6,
    unprocessedWarnings: 0,
    avgProcessingTime: 98,
    topWarningType: 'LOSS_OVER'
  },
  {
    date: '2024-01-05',
    totalWarnings: 4,
    highLevelWarnings: 0,
    mediumLevelWarnings: 2,
    lowLevelWarnings: 2,
    processedWarnings: 4,
    unprocessedWarnings: 0,
    avgProcessingTime: 156,
    topWarningType: 'PRICE_CHANGE'
  }
]

// 预警趋势数据
export const warningTrends = [
  { date: '2024-01-01', total: 3, high: 0, medium: 2, low: 1 },
  { date: '2024-01-02', total: 5, high: 1, medium: 2, low: 2 },
  { date: '2024-01-03', total: 2, high: 0, medium: 1, low: 1 },
  { date: '2024-01-04', total: 7, high: 2, medium: 3, low: 2 },
  { date: '2024-01-05', total: 4, high: 0, medium: 2, low: 2 },
  { date: '2024-01-06', total: 6, high: 1, medium: 3, low: 2 },
  { date: '2024-01-07', total: 8, high: 2, medium: 4, low: 2 }
]

// 预警类型分布数据
export const warningTypeDistribution = [
  { name: '成本超标', value: 35, color: '#f56c6c' },
  { name: '损耗异常', value: 25, color: '#e6a23c' },
  { name: '毛利偏低', value: 20, color: '#409eff' },
  { name: '价格波动', value: 15, color: '#67c23a' },
  { name: '用料差异', value: 5, color: '#909399' }
] 