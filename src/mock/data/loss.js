// 损耗分析数据
export const lossAnalysis = [
  {
    id: 1,
    analysisDate: '2024-01-07',
    storeId: 1,
    materialId: 1,
    recipeId: 1,
    standardQty: 4.200,
    actualQty: 4.800,
    lossQty: 0.600,
    lossRate: 14.29,
    lossCost: 19.20,
    lossType: 'OPERATION',
    lossReason: '切配不当造成浪费',
    isAbnormal: 1,
    thresholdRate: 8.00,
    remark: '员工操作不当',
    createTime: '2024-01-07 19:30:00'
  },
  {
    id: 2,
    analysisDate: '2024-01-07',
    storeId: 1,
    materialId: 11, // 修正：应该是鸡蛋(materialId: 11)，而不是韭黄(materialId: 15)
    recipeId: 5,
    standardQty: 3.000, // 修正：鸡蛋的用量应该是3个，而不是15个
    actualQty: 3.060,
    lossQty: 0.060,
    lossRate: 2.00,
    lossCost: 0.48,
    lossType: 'NATURAL',
    lossReason: '鸡蛋破损',
    isAbnormal: 0,
    thresholdRate: 6.00,
    remark: '正常自然损耗',
    createTime: '2024-01-07 18:15:00'
  },
  {
    id: 3,
    analysisDate: '2024-01-06',
    storeId: 2,
    materialId: 4,
    recipeId: 3,
    standardQty: 6.000,
    actualQty: 6.300,
    lossQty: 0.300,
    lossRate: 5.00,
    lossCost: 1.05,
    lossType: 'STORAGE',
    lossReason: '储存时间过长导致损耗',
    isAbnormal: 0,
    thresholdRate: 8.00,
    remark: '储存损耗',
    createTime: '2024-01-06 17:45:00'
  },
  {
    id: 4,
    analysisDate: '2024-01-05',
    storeId: 3,
    materialId: 5,
    recipeId: 4,
    standardQty: 4.500,
    actualQty: 4.770,
    lossQty: 0.270,
    lossRate: 6.00,
    lossCost: 1.13,
    lossType: 'OPERATION',
    lossReason: '切配技术不熟练',
    isAbnormal: 0,
    thresholdRate: 8.00,
    remark: '员工培训不足',
    createTime: '2024-01-05 16:20:00'
  },
  {
    id: 5,
    analysisDate: '2024-01-04',
    storeId: 1,
    materialId: 2,
    recipeId: 2,
    standardQty: 2.800,
    actualQty: 2.900,
    lossQty: 0.100,
    lossRate: 3.57,
    lossCost: 1.80,
    lossType: 'NATURAL',
    lossReason: '肉类自然损耗',
    isAbnormal: 0,
    thresholdRate: 8.00,
    remark: '正常损耗',
    createTime: '2024-01-04 15:30:00'
  },
  {
    id: 6,
    analysisDate: '2024-01-03',
    storeId: 2,
    materialId: 15, // 韭黄
    recipeId: 6, // 牛肉炒河粉
    standardQty: 0.300,
    actualQty: 0.315,
    lossQty: 0.015,
    lossRate: 5.00,
    lossCost: 0.18,
    lossType: 'STORAGE',
    lossReason: '韭黄易枯萎变质',
    isAbnormal: 0,
    thresholdRate: 8.00,
    remark: '储存损耗',
    createTime: '2024-01-03 14:20:00'
  }
]

// 损耗趋势数据
export const lossTrends = [
  { date: '2024-01-01', lossRate: 7.2 },
  { date: '2024-01-02', lossRate: 6.8 },
  { date: '2024-01-03', lossRate: 8.1 },
  { date: '2024-01-04', lossRate: 6.5 },
  { date: '2024-01-05', lossRate: 7.0 },
  { date: '2024-01-06', lossRate: 6.2 },
  { date: '2024-01-07', lossRate: 6.8 }
]

// 损耗类型分布数据
export const lossTypeDistribution = [
  { name: '自然损耗', value: 45, color: '#67c23a' },
  { name: '操作损耗', value: 35, color: '#e6a23c' },
  { name: '储存损耗', value: 20, color: '#f56c6c' }
]

// 原料损耗汇总数据
export const materialLossData = [
  {
    materialId: 1,
    materialName: '五花肉',
    category: '肉类',
    totalStandardQty: 21.000,
    totalActualQty: 22.200,
    totalLossQty: 1.200,
    avgLossRate: 5.71,
    totalLossCost: 38.40,
    abnormalDays: 2,
    thresholdRate: 8.00,
    unitName: 'kg'
  },
  {
    materialId: 15,
    materialName: '鸡蛋',
    category: '蛋类',
    totalStandardQty: 105.000,
    totalActualQty: 109.200,
    totalLossQty: 4.200,
    avgLossRate: 4.00,
    totalLossCost: 3.36,
    abnormalDays: 0,
    thresholdRate: 6.00,
    unitName: '个'
  },
  {
    materialId: 4,
    materialName: '大白菜',
    category: '蔬菜',
    totalStandardQty: 36.000,
    totalActualQty: 37.800,
    totalLossQty: 1.800,
    avgLossRate: 5.00,
    totalLossCost: 6.30,
    abnormalDays: 0,
    thresholdRate: 8.00,
    unitName: 'kg'
  }
]

// 门店损耗汇总数据
export const storeLossData = [
  {
    storeId: 1,
    storeName: '市中心旗舰店',
    avgLossRate: 6.8,
    totalLossCost: 156.80,
    materialCount: 15,
    abnormalCount: 3,
    improvementSuggestion: '加强员工培训，规范操作流程'
  },
  {
    storeId: 2,
    storeName: '西单购物中心店',
    avgLossRate: 5.2,
    totalLossCost: 124.50,
    materialCount: 12,
    abnormalCount: 1,
    improvementSuggestion: '继续保持良好的损耗控制'
  },
  {
    storeId: 3,
    storeName: '三里屯店',
    avgLossRate: 7.1,
    totalLossCost: 142.30,
    materialCount: 14,
    abnormalCount: 2,
    improvementSuggestion: '优化库存管理，减少储存损耗'
  },
  {
    storeId: 4,
    storeName: '王府井店',
    avgLossRate: 5.8,
    totalLossCost: 118.20,
    materialCount: 11,
    abnormalCount: 1,
    improvementSuggestion: '保持现有管理水平'
  }
] 