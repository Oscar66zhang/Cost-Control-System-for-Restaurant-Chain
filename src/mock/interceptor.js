import { users, generateToken } from './data/users'
import { recipes, bomMasters, bomDetails, costBases } from './data/recipes'
import { materials, materialsWithUnit, units, priceHistories } from './data/materials'
import { stores } from './data/stores'
import { dailyMaterialUsage, costTracking, costTrends, varianceSummary } from './data/cost'
import { lossAnalysis, lossTrends, lossTypeDistribution, materialLossData, storeLossData } from './data/loss'
import { suppliers, supplierQuotations, purchaseSuggestions, supplierEvaluations, priceComparisonHistory } from './data/suppliers'
import { warningRules, warningRecords, warningStats, warningTrends, warningTypeDistribution } from './data/warnings'
import { profitAnalysis, profitTrends, categoryProfitDistribution, storeProfitComparison, profitForecast, pricingRecommendations } from './data/profit'

// 模拟延迟
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

// 通用响应格式
const createResponse = (data, code = 200, message = 'success') => ({
    code,
    data,
    message,
    timestamp: Date.now()
})

// 分页处理函数
const paginate = (data, page = 1, size = 10) => {
    const start = (page - 1) * size
    const end = start + size
    return {
        records: data.slice(start, end),
        current: page,
        size: size,
        total: data.length,
        pages: Math.ceil(data.length / size)
    }
}

// 搜索过滤函数
const filterData = (data, filters) => {
    return data.filter(item => {
        return Object.keys(filters).every(key => {
            const filterValue = filters[key]
            if (!filterValue && filterValue !== 0) return true

            const itemValue = item[key]
            if (typeof filterValue === 'string') {
                return String(itemValue).toLowerCase().includes(filterValue.toLowerCase())
            }
            return itemValue === filterValue
        })
    })
}

// Mock API 路由处理
export const mockRoutes = {
    // ========== 认证相关 ==========
    'POST /api/auth/login': async (config) => {
        await delay()
        const { username, password } = JSON.parse(config.data)

        const user = users.find(u => u.username === username && u.password === password)
        if (!user) {
            return createResponse(null, 401, '用户名或密码错误')
        }

        const token = generateToken(user)
        const { password: _, ...userInfo } = user

        return createResponse({
            token,
            userInfo: {
                ...userInfo,
                lastLoginTime: new Date().toISOString()
            }
        }, 200, '登录成功')
    },

    'POST /api/auth/logout': async () => {
        await delay()
        return createResponse(null, 200, '退出登录成功')
    },

    // ========== 菜品管理 ==========
    'GET /api/recipes': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10
        const recipeName = params.get('recipeName') || ''
        const category = params.get('category') || ''
        const status = params.get('status')

        console.log('🔍 菜品搜索参数:', {
            recipeName,
            category,
            status,
            page,
            size,
            原始URL: config.url,
            查询字符串: queryString
        })

        let filteredData = [...recipes] // 创建副本避免修改原数据

        // 菜品名称搜索过滤
        if (recipeName && recipeName.trim()) {
            console.log('📝 按菜品名称筛选:', recipeName)
            filteredData = filteredData.filter(item =>
                item.recipeName && item.recipeName.includes(recipeName.trim())
            )
            console.log('📝 名称筛选后结果数量:', filteredData.length)
            console.log('📝 名称筛选后的菜品:', filteredData.map(item => item.recipeName))
        }

        // 分类搜索过滤
        if (category && category.trim()) {
            console.log('🏷️ 按分类筛选:', category)
            filteredData = filteredData.filter(item =>
                item.category && item.category === category.trim()
            )
            console.log('🏷️ 分类筛选后结果数量:', filteredData.length)
            console.log('🏷️ 分类筛选后的菜品:', filteredData.map(item => `${item.recipeName}(${item.category})`))
        }

        // 状态搜索过滤
        if (status !== null && status !== undefined && status !== '') {
            console.log('🔄 按状态筛选:', status, '(类型:', typeof status, ')')
            const statusValue = parseInt(status)
            if (!isNaN(statusValue)) {
                filteredData = filteredData.filter(item => item.status === statusValue)
                console.log('🔄 状态筛选后结果数量:', filteredData.length)
            }
        }

        console.log('✅ 最终筛选结果:', filteredData.length, '条记录')
        if (filteredData.length > 0) {
            console.log('✅ 最终筛选的菜品列表:', filteredData.map(item => `${item.recipeName}(${item.category})`))
        }

        const result = paginate(filteredData, page, size)
        return createResponse(result)
    },

    'POST /api/recipes': async (config) => {
        await delay()
        const recipeData = JSON.parse(config.data)
        const newRecipe = {
            id: recipes.length + 1,
            ...recipeData,
            createTime: new Date().toISOString(),
            updateTime: new Date().toISOString()
        }
        recipes.push(newRecipe)
        return createResponse(newRecipe, 201, '菜品创建成功')
    },

    'PUT /api/recipes/:id': async (config) => {
        await delay()

        // 安全地提取ID，支持多种URL格式
        const urlPath = config.url.split('?')[0] // 移除查询参数
        const apiMatch = urlPath.match(/\/api\/recipes\/(\d+)/)
        const recipesMatch = urlPath.match(/\/recipes\/(\d+)/)
        const match = apiMatch || recipesMatch

        if (!match) {
            console.error('❌ Mock Recipe Update: URL格式不匹配，期望格式: /api/recipes/数字 或 /recipes/数字, 实际:', config.url)
            return createResponse(null, 400, 'Invalid recipe ID format')
        }

        const id = parseInt(match[1])
        console.log('✅ Recipe Update Mock: 解析到 recipeId =', id)

        const recipeData = JSON.parse(config.data)

        const index = recipes.findIndex(r => r.id === id)
        if (index === -1) {
            return createResponse(null, 404, '菜品不存在')
        }

        recipes[index] = {
            ...recipes[index],
            ...recipeData,
            updateTime: new Date().toISOString()
        }

        return createResponse(recipes[index], 200, '菜品更新成功')
    },

    'DELETE /api/recipes/:id': async (config) => {
        await delay()

        // 安全地提取ID，支持多种URL格式
        const urlPath = config.url.split('?')[0] // 移除查询参数
        const apiMatch = urlPath.match(/\/api\/recipes\/(\d+)/)
        const recipesMatch = urlPath.match(/\/recipes\/(\d+)/)
        const match = apiMatch || recipesMatch

        if (!match) {
            console.error('❌ Mock Recipe Delete: URL格式不匹配，期望格式: /api/recipes/数字 或 /recipes/数字, 实际:', config.url)
            return createResponse(null, 400, 'Invalid recipe ID format')
        }

        const id = parseInt(match[1])
        console.log('✅ Recipe Delete Mock: 解析到 recipeId =', id)

        const index = recipes.findIndex(r => r.id === id)
        if (index === -1) {
            return createResponse(null, 404, '菜品不存在')
        }

        recipes.splice(index, 1)
        return createResponse(null, 200, '菜品删除成功')
    },

    // ========== BOM管理 ==========
    'GET /api/bom/:recipeId': async (config) => {
        await delay()
        console.log('🔍 BOM Mock: 收到请求', config.url, config.method)

        // 支持两种URL格式：/api/bom/数字 和 /bom/数字
        const apiMatch = config.url.match(/\/api\/bom\/(\d+)/)
        const bomMatch = config.url.match(/\/bom\/(\d+)/)
        const match = apiMatch || bomMatch

        if (!match) {
            console.error('❌ Mock BOM: URL格式不匹配，期望格式: /api/bom/数字 或 /bom/数字, 实际:', config.url)
            return createResponse(null, 400, 'Invalid recipe ID format')
        }
        const recipeId = parseInt(match[1])
        console.log('✅ BOM Mock: 解析到 recipeId =', recipeId)

        let bom = bomMasters.find(b => b.recipeId === recipeId && b.isCurrent === 1)

        // 如果没有找到现有的BOM数据，创建一个默认的空BOM
        if (!bom) {
            console.log('⚠️ Mock BOM: 为菜品', recipeId, '创建默认BOM')
            bom = {
                id: Date.now(),
                bomCode: `BOM${String(recipeId).padStart(3, '0')}`,
                recipeId: recipeId,
                version: 'V1.0',
                parentBomId: null,
                level: 1,
                totalCost: 0,
                yieldQty: 1.00,
                lossRate: 5.00,
                isCurrent: 1,
                effectiveDate: new Date().toISOString().split('T')[0],
                expireDate: null,
                status: 1,
                createBy: 1,
                createTime: new Date().toISOString(),
                updateTime: new Date().toISOString()
            }
        }

        const details = bomDetails
            .filter(d => d.bomId === bom.id)
            .map(detail => {
                const material = materialsWithUnit.find(m => m.id === detail.materialId)
                const unit = units.find(u => u.id === detail.unitId)
                return {
                    ...detail,
                    materialName: material?.materialName || '未知原料',
                    specification: material?.specification || '',
                    unitName: unit?.unitName || '未知单位',
                    imageUrl: material?.imageUrl || ''
                }
            })

        return createResponse({
            ...bom,
            details
        })
    },

    // 兼容没有 /api 前缀的BOM请求
    'GET /bom/:recipeId': async (config) => {
        // 直接调用已有的BOM处理函数
        return mockRoutes['GET /api/bom/:recipeId'](config)
    },

    'POST /api/bom': async (config) => {
        await delay()
        const bomData = JSON.parse(config.data)
        console.log('💾 BOM保存Mock: 收到保存数据', bomData)

        // 查找或创建BOM主记录
        let bomMaster = bomMasters.find(b => b.recipeId === bomData.recipeId && b.isCurrent === 1)

        if (bomMaster) {
            // 更新现有BOM
            bomMaster.totalCost = bomData.totalCost || 0
            bomMaster.yieldQty = bomData.yieldQty || 1
            bomMaster.lossRate = bomData.lossRate || 5
            bomMaster.updateTime = new Date().toISOString()
            console.log('📝 更新现有BOM主记录:', bomMaster.id)
        } else {
            // 创建新BOM
            bomMaster = {
                id: Date.now(),
                bomCode: bomData.bomCode || `BOM${String(bomData.recipeId).padStart(3, '0')}`,
                recipeId: bomData.recipeId,
                version: bomData.version || 'V1.0',
                parentBomId: null,
                level: 1,
                totalCost: bomData.totalCost || 0,
                yieldQty: bomData.yieldQty || 1,
                lossRate: bomData.lossRate || 5,
                isCurrent: 1,
                effectiveDate: new Date().toISOString().split('T')[0],
                expireDate: null,
                status: 1,
                createBy: 1,
                createTime: new Date().toISOString(),
                updateTime: new Date().toISOString()
            }
            bomMasters.push(bomMaster)
            console.log('🆕 创建新BOM主记录:', bomMaster.id)
        }

        // 删除原有的BOM明细
        const originalDetailsLength = bomDetails.length
        bomDetails.splice(0, bomDetails.length, ...bomDetails.filter(d => d.bomId !== bomMaster.id))
        console.log('🗑️ 删除原BOM明细:', originalDetailsLength - bomDetails.length, '条')

        // 保存新的BOM明细
        if (bomData.details && bomData.details.length > 0) {
            bomData.details.forEach((detail, index) => {
                const newDetail = {
                    id: Date.now() + index,
                    bomId: bomMaster.id,
                    materialId: detail.materialId,
                    unitId: detail.unitId || 1, // 默认单位ID
                    quantity: detail.quantity || 0,
                    unitCost: detail.unitCost || 0,
                    totalCost: detail.totalCost || 0,
                    lossRate: detail.lossRate || 0,
                    actualQuantity: detail.actualQuantity || detail.quantity || 0,
                    remark: detail.remark || '',
                    sortOrder: index + 1,
                    createTime: new Date().toISOString(),
                    updateTime: new Date().toISOString()
                }
                bomDetails.push(newDetail)
            })
            console.log('💾 保存BOM明细:', bomData.details.length, '条')
        }

        console.log('✅ BOM保存完成, 主记录ID:', bomMaster.id, '明细数量:', bomData.details?.length || 0)

        return createResponse({
            ...bomMaster,
            details: bomData.details || []
        }, 201, 'BOM保存成功')
    },

    'POST /bom': async (config) => {
        // 兼容没有 /api 前缀的BOM保存请求
        return mockRoutes['POST /api/bom'](config)
    },

    // ========== 原料管理 ==========
    'GET /api/materials': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10
        const materialName = params.get('materialName') || ''
        const category = params.get('category') || ''

        let filteredData = materialsWithUnit

        if (materialName) {
            filteredData = filteredData.filter(item =>
                item.materialName.includes(materialName)
            )
        }
        if (category) {
            filteredData = filteredData.filter(item => item.category === category)
        }

        const result = paginate(filteredData, page, size)
        return createResponse(result)
    },

    // ========== 门店管理 ==========
    'GET /api/stores': async () => {
        await delay()
        return createResponse(stores)
    },

    // ========== 成本核算 ==========
    'GET /api/cost/usage': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10
        const storeId = params.get('storeId')
        const recipeId = params.get('recipeId')
        const materialName = params.get('materialName')
        const recipeName = params.get('recipeName')
        const date = params.get('date')

        // 直接使用已经包含完整信息的mock数据
        let filteredData = [...dailyMaterialUsage]

        // 应用过滤条件
        if (storeId) {
            filteredData = filteredData.filter(item => item.storeId === parseInt(storeId))
        }
        if (recipeId) {
            filteredData = filteredData.filter(item => item.recipeId === parseInt(recipeId))
        }
        if (materialName) {
            filteredData = filteredData.filter(item =>
                item.materialName && item.materialName.includes(materialName)
            )
        }
        if (recipeName) {
            filteredData = filteredData.filter(item =>
                item.recipeName && item.recipeName.includes(recipeName)
            )
        }
        if (date) {
            filteredData = filteredData.filter(item => item.usageDate === date)
        }

        const result = paginate(filteredData, page, size)

        // 添加统计信息（基于全部筛选后的数据）
        const statistics = {
            totalCost: filteredData.reduce((sum, item) => sum + (item.totalCost || 0), 0),
            materialCount: new Set(filteredData.map(item => item.materialName).filter(Boolean)).size,
            recordCount: filteredData.length
        }

        return createResponse({
            ...result,
            statistics
        })
    },

    'GET /api/cost/variance': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10

        const result = paginate(varianceSummary, page, size)
        return createResponse(result)
    },

    'GET /api/cost/tracking': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10

        const enrichedData = costTracking.map(track => {
            const store = stores.find(s => s.id === track.storeId)
            const recipe = recipes.find(r => r.id === track.recipeId)
            return {
                ...track,
                storeName: store?.storeName || '未知门店',
                recipeName: recipe?.recipeName || '未知菜品'
            }
        })

        const result = paginate(enrichedData, page, size)
        return createResponse(result)
    },

    'GET /api/cost/trends': async () => {
        await delay()

        // 生成与预警数据相匹配的2024年1月的成本趋势数据
        const sevenDaysTrends = [];

        // 从2024-01-01到2024-01-07的日期
        const dates = [
            '2024-01-01', '2024-01-02', '2024-01-03',
            '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07'
        ];

        // 标准成本和实际成本数据，与预警数据一致
        dates.forEach((date, index) => {
            // 标准成本基准值为12000，并随日期略有变化
            const standardCost = 12000 + (index * 100);

            // 实际成本比标准成本略高，确保与预警数据中的"成本超标"情况一致
            const actualCost = standardCost + 400 + (index * 50);

            sevenDaysTrends.push({
                date: date,
                standardCost: standardCost,
                actualCost: actualCost,
                variance: actualCost - standardCost,
                varianceRate: Number(((actualCost - standardCost) / standardCost * 100).toFixed(2))
            });
        });

        console.log('成本趋势数据:', sevenDaysTrends);
        return createResponse(sevenDaysTrends);
    },

    // 获取按菜品维度的原料使用数据
    'GET /api/cost/recipe-usage': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10
        const recipeName = params.get('recipeName')
        const materialName = params.get('materialName')
        const date = params.get('date')

        console.log('🔍 菜品视图搜索参数:', {
            recipeName,
            materialName,
            date,
            page,
            size,
            原始URL: config.url,
            查询字符串: queryString
        })

        // 按菜品分组统计原料使用
        const recipeUsageMap = new Map()

        dailyMaterialUsage.forEach(usage => {
            if (!usage.recipeId) return // 跳过共用原料

            const key = `${usage.recipeId}-${usage.usageDate}`
            if (!recipeUsageMap.has(key)) {
                recipeUsageMap.set(key, {
                    recipeId: usage.recipeId,
                    recipeName: usage.recipeName,
                    recipeCode: usage.recipeCode,
                    recipeCategory: usage.recipeCategory,
                    recipeSellingPrice: usage.recipeSellingPrice,
                    recipeStandardCost: usage.recipeStandardCost,
                    recipeTargetMargin: usage.recipeTargetMargin,
                    recipeImageUrl: usage.recipeImageUrl,
                    usageDate: usage.usageDate,
                    materials: []
                })
            }

            recipeUsageMap.get(key).materials.push({
                materialId: usage.materialId,
                materialName: usage.materialName,
                materialCategory: usage.materialCategory,
                standardQty: usage.standardQty,
                actualQty: usage.actualQty,
                bomQuantity: usage.bomQuantity,
                recipeCount: usage.recipeCount,
                unitName: usage.unitName,
                unitPrice: usage.unitPrice,
                totalCost: usage.totalCost,
                varianceQty: usage.varianceQty,
                varianceCost: usage.varianceCost
            })
        })

        let filteredData = Array.from(recipeUsageMap.values())

        // 应用过滤条件
        if (recipeName) {
            console.log('📝 按菜品名称筛选:', recipeName)
            filteredData = filteredData.filter(item =>
                item.recipeName && item.recipeName.includes(recipeName)
            )
            console.log('📝 菜品名称筛选后结果数量:', filteredData.length)
        }
        if (materialName && materialName.trim()) {
            console.log('🥬 按原料名称筛选:', materialName)
            filteredData = filteredData.filter(item =>
                item.materials && item.materials.some(material =>
                    material.materialName && material.materialName.includes(materialName.trim())
                )
            )
            console.log('🥬 原料名称筛选后结果数量:', filteredData.length)
            console.log('🥬 筛选后的菜品:', filteredData.map(item => `${item.recipeName}(包含原料:${item.materials.filter(m => m.materialName.includes(materialName.trim())).map(m => m.materialName).join(',')})`))
        }
        if (date) {
            console.log('📅 按日期筛选:', date)
            filteredData = filteredData.filter(item => item.usageDate === date)
            console.log('📅 日期筛选后结果数量:', filteredData.length)
        }

        console.log('✅ 菜品视图最终筛选结果:', filteredData.length, '条记录')

        const result = paginate(filteredData, page, size)

        // 添加统计信息（菜品视图）
        const allMaterials = new Set()
        let totalRecipeCost = 0

        filteredData.forEach(recipe => {
            recipe.materials.forEach(material => {
                allMaterials.add(material.materialName)
                totalRecipeCost += material.totalCost || 0
            })
        })

        const statistics = {
            totalCost: totalRecipeCost,
            materialCount: allMaterials.size,
            recordCount: filteredData.length
        }

        return createResponse({
            ...result,
            statistics
        })
    },

    // 获取基于BOM的预期用量对比
    'GET /api/cost/bom-comparison': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10
        const recipeId = params.get('recipeId')
        const date = params.get('date')

        // 生成BOM对比数据
        const comparisonData = []

        // 找到相关的BOM数据和实际使用数据
        recipes.forEach(recipe => {
            const bom = bomMasters.find(b => b.recipeId === recipe.id && b.isCurrent === 1)
            if (!bom) return

            const bomDetailsList = bomDetails.filter(d => d.bomId === bom.id)
            const actualUsage = dailyMaterialUsage.filter(u => u.recipeId === recipe.id)

            bomDetailsList.forEach(bomDetail => {
                const material = materialsWithUnit.find(m => m.id === bomDetail.materialId)
                const actual = actualUsage.find(u => u.materialId === bomDetail.materialId)

                if (material) {
                    comparisonData.push({
                        recipeId: recipe.id,
                        recipeName: recipe.recipeName,
                        materialId: material.id,
                        materialName: material.materialName,
                        bomStandardQty: bomDetail.quantity,
                        actualStandardQty: actual?.standardQty || 0,
                        actualQty: actual?.actualQty || 0,
                        bomUnitCost: bomDetail.unitCost,
                        actualUnitCost: actual?.unitPrice || bomDetail.unitCost,
                        unitName: material.unitName,
                        variance: actual ? (actual.actualQty - actual.standardQty) : 0,
                        costVariance: actual ? actual.varianceCost : 0,
                        usageDate: actual?.usageDate || new Date().toISOString().split('T')[0]
                    })
                }
            })
        })

        let filteredData = comparisonData

        // 应用过滤条件
        if (recipeId) {
            filteredData = filteredData.filter(item => item.recipeId === parseInt(recipeId))
        }
        if (date) {
            filteredData = filteredData.filter(item => item.usageDate === date)
        }

        const result = paginate(filteredData, page, size)
        return createResponse(result)
    },

    // 基于BOM和销售数据生成原料使用记录
    'POST /api/cost/generate-from-bom': async (config) => {
        await delay()

        const { salesData, targetDate, storeId } = JSON.parse(config.data)
        console.log('🎯 基于BOM生成原料使用记录:', { salesData, targetDate, storeId })

        const generatedUsage = []
        let nextId = Math.max(...dailyMaterialUsage.map(item => item.id)) + 1

        salesData.forEach(sale => {
            const recipe = recipes.find(r => r.id === sale.recipeId)
            if (!recipe) return

            const bom = bomMasters.find(b => b.recipeId === sale.recipeId && b.isCurrent === 1)
            if (!bom) return

            const bomDetailsList = bomDetails.filter(d => d.bomId === bom.id)

            bomDetailsList.forEach(bomDetail => {
                const material = materialsWithUnit.find(m => m.id === bomDetail.materialId)
                if (!material) return

                const standardQty = bomDetail.quantity * sale.quantity
                const actualQty = standardQty * (1 + (Math.random() * 0.1 - 0.05)) // 模拟5%以内的差异

                const newUsage = {
                    id: nextId++,
                    usageDate: targetDate,
                    storeId: storeId,
                    materialId: bomDetail.materialId,
                    materialName: material.materialName,
                    materialCategory: material.category,
                    recipeId: recipe.id,
                    recipeName: recipe.recipeName,
                    recipeCode: recipe.recipeCode,
                    recipeCategory: recipe.category,
                    recipeSellingPrice: recipe.sellingPrice,
                    recipeStandardCost: recipe.standardCost,
                    recipeTargetMargin: recipe.targetMargin,
                    recipeImageUrl: recipe.imageUrl,
                    standardQty: standardQty,
                    actualQty: actualQty,
                    bomQuantity: bomDetail.quantity,
                    recipeCount: sale.quantity,
                    unitId: bomDetail.unitId,
                    unitName: material.unitName,
                    unitPrice: bomDetail.unitCost,
                    totalCost: actualQty * bomDetail.unitCost,
                    varianceQty: actualQty - standardQty,
                    varianceCost: (actualQty - standardQty) * bomDetail.unitCost,
                    usageType: 'NORMAL',
                    remark: `基于BOM自动生成，菜品销量：${sale.quantity}份`,
                    createTime: new Date().toISOString()
                }

                generatedUsage.push(newUsage)
                dailyMaterialUsage.push(newUsage)
            })
        })

        console.log('✅ 成功生成原料使用记录:', generatedUsage.length, '条')

        return createResponse({
            generated: generatedUsage.length,
            records: generatedUsage
        }, 201, `成功生成${generatedUsage.length}条原料使用记录`)
    },

    // 批量录入菜品销售数据
    'POST /api/cost/sales-data': async (config) => {
        await delay()

        const salesData = JSON.parse(config.data)
        console.log('📊 批量录入销售数据:', salesData)

        // 这里可以存储销售数据，用于后续分析
        return createResponse(salesData, 201, '销售数据录入成功')
    },

    // 获取菜品销售数据
    'GET /api/cost/sales-data': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10
        const date = params.get('date')
        const storeId = params.get('storeId')

        // 模拟销售数据（基于现有的原料使用记录推算）
        const salesDataMap = new Map()

        dailyMaterialUsage.forEach(usage => {
            if (!usage.recipeId || !usage.recipeCount) return

            const key = `${usage.recipeId}-${usage.usageDate}-${usage.storeId}`
            if (!salesDataMap.has(key)) {
                salesDataMap.set(key, {
                    recipeId: usage.recipeId,
                    recipeName: usage.recipeName,
                    recipeCode: usage.recipeCode,
                    recipeCategory: usage.recipeCategory,
                    salesDate: usage.usageDate,
                    storeId: usage.storeId,
                    quantity: usage.recipeCount,
                    totalRevenue: usage.recipeCount * (usage.recipeSellingPrice || 0),
                    createTime: usage.createTime
                })
            }
        })

        let filteredData = Array.from(salesDataMap.values())

        // 应用过滤条件
        if (date) {
            filteredData = filteredData.filter(item => item.salesDate === date)
        }
        if (storeId) {
            filteredData = filteredData.filter(item => item.storeId === parseInt(storeId))
        }

        const result = paginate(filteredData, page, size)
        return createResponse(result)
    },

    // ========== 损耗分析 ==========
    'GET /api/loss/daily': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10
        const materialName = params.get('materialName') || ''
        const lossType = params.get('lossType') || ''

        console.log('🔍 损耗分析搜索参数:', {
            materialName,
            lossType,
            page,
            size,
            原始URL: config.url,
            查询字符串: queryString
        })

        // 损耗类型映射：将数据库中的类型映射为前端期望的类型
        const lossTypeMapping = {
            'OPERATION': 'ABNORMAL',    // 操作损耗 → 异常损耗
            'NATURAL': 'NORMAL',        // 自然损耗 → 正常损耗  
            'STORAGE': 'EXPIRED'        // 储存损耗 → 过期损耗
        }

        const enrichedData = lossAnalysis.map(loss => {
            const store = stores.find(s => s.id === loss.storeId)
            const recipe = recipes.find(r => r.id === loss.recipeId)
            const material = materialsWithUnit.find(m => m.id === loss.materialId)
            return {
                ...loss,
                storeName: store?.storeName || '未知门店',
                recipeName: recipe?.recipeName || '未知菜品',
                materialName: material?.materialName || '未知原料',
                category: material?.category || '其他',
                unitName: material?.unitName || '未知单位',
                lossDate: loss.analysisDate, // 将analysisDate映射为lossDate
                lossType: lossTypeMapping[loss.lossType] || loss.lossType, // 映射损耗类型
                totalQty: loss.standardQty + loss.lossQty, // 计算总用量
                remark: loss.remark || loss.lossReason || '无备注'
            }
        })

        console.log('📊 数据增强完成，共', enrichedData.length, '条记录')

        // 应用搜索过滤
        let filteredData = enrichedData

        // 按原料名称过滤
        if (materialName && materialName.trim()) {
            console.log('📝 按原料名称筛选:', materialName)
            filteredData = filteredData.filter(item =>
                item.materialName && item.materialName.includes(materialName.trim())
            )
            console.log('📝 原料名称筛选后结果数量:', filteredData.length)
        }

        // 按损耗类型过滤
        if (lossType && lossType.trim()) {
            console.log('🏷️ 按损耗类型筛选:', lossType)
            filteredData = filteredData.filter(item =>
                item.lossType && item.lossType === lossType.trim()
            )
            console.log('🏷️ 损耗类型筛选后结果数量:', filteredData.length)
        }

        console.log('✅ 最终筛选结果:', filteredData.length, '条记录')

        const result = paginate(filteredData, page, size)
        return createResponse(result)
    },

    'GET /api/loss/material': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10

        const result = paginate(materialLossData, page, size)
        return createResponse(result)
    },

    'GET /api/loss/store': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10

        const result = paginate(storeLossData, page, size)
        return createResponse(result)
    },

    'GET /api/loss/trends': async () => {
        await delay()
        return createResponse(lossTrends)
    },

    'GET /api/loss/distribution': async () => {
        await delay()
        return createResponse(lossTypeDistribution)
    },

    // ========== 仪表板数据 ==========
    'GET /api/dashboard/stats': async () => {
        await delay()

        // 获取毛利数据
        const profitItems = profitAnalysis || [];

        // 计算总成本 - 使用与毛利率看板相同的计算方式
        let totalCost = 0;
        let totalRevenue = 0;
        let totalProfit = 0;

        // 计算平均毛利率
        let profitMargin = 0;
        if (profitItems.length > 0) {
            // 总成本 - 与毛利率看板一致，汇总每个菜品的 totalCost，并四舍五入到整数
            totalCost = Math.round(profitItems.reduce((sum, item) => sum + (item.totalCost || 0), 0));

            // 总收入
            totalRevenue = profitItems.reduce((sum, item) => sum + (item.totalRevenue || 0), 0);

            // 总利润
            totalProfit = profitItems.reduce((sum, item) => sum + (item.totalProfit || 0), 0);

            // 平均毛利率
            const totalMargin = profitItems.reduce((sum, item) => sum + (item.actualMargin || 0), 0);
            profitMargin = parseFloat((totalMargin / profitItems.length).toFixed(1));
        }

        // 获取预警数据
        const warnings = warningRecords || [];
        const warningCount = warnings.length;

        // 获取门店数量
        const storeCount = stores.length;

        console.log('仪表盘动态数据:', {
            totalCost,
            totalRevenue,
            totalProfit,
            profitMargin,
            warningCount,
            storeCount
        });

        return createResponse({
            totalCost: totalCost,
            profitMargin: profitMargin,
            warningCount: warningCount,
            storeCount: storeCount,
            costTrend: 3.2,
            varianceRate: 4.8,
            abnormalCount: 3,
            materialCount: 15
        })
    },

    'GET /api/dashboard/warnings': async () => {
        await delay()

        // 使用与预警页面相同的数据源，确保时间一致性
        const recentWarnings = warningRecords
            .slice(0, 5) // 最近5条预警
            .map(record => {
                // 从record获取预警类型和等级
                let type, level;

                // 映射预警类型
                switch (record.warningType) {
                    case 'COST_OVER': type = '成本超标'; break;
                    case 'LOSS_OVER': type = '损耗异常'; break;
                    case 'PRICE_CHANGE': type = '价格波动'; break;
                    case 'MARGIN_LOW': type = '毛利偏低'; break;
                    default: type = record.warningType;
                }

                // 映射预警等级
                switch (record.warningLevel) {
                    case 'HIGH': level = '严重'; break;
                    case 'MEDIUM': level = '警告'; break;
                    case 'LOW': level = '提醒'; break;
                    default: level = '提醒';
                }

                return {
                    time: record.warningTime?.split(' ')[0] || '2024-01-07',
                    type,
                    message: record.warningMessage,
                    level
                };
            });

        console.log('仪表盘预警数据:', recentWarnings);
        return createResponse(recentWarnings)
    },

    // ========== 供应商比价 ==========
    'GET /api/suppliers': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10

        // 为供应商选项添加正确的字段映射
        const enrichedSuppliers = suppliers.map(supplier => ({
            ...supplier,
            id: supplier.id,
            name: supplier.supplierName // 页面期望name字段
        }))

        const result = paginate(enrichedSuppliers, page, size)
        return createResponse(result)
    },

    'GET /api/suppliers/quotations': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10
        const materialId = params.get('materialId')
        const materialName = params.get('materialName') || ''
        const supplierId = params.get('supplierId') || ''

        console.log('🔍 供应商报价搜索参数:', {
            materialId,
            materialName,
            supplierId,
            page,
            size,
            原始URL: config.url,
            查询字符串: queryString
        })

        // 计算每个原料的价格排名
        const materialPriceMap = new Map()
        supplierQuotations.forEach(quotation => {
            const materialKey = quotation.materialId
            if (!materialPriceMap.has(materialKey)) {
                materialPriceMap.set(materialKey, [])
            }
            materialPriceMap.get(materialKey).push(quotation)
        })

        // 为每个原料的报价排序并计算排名
        materialPriceMap.forEach((quotations, materialId) => {
            quotations.sort((a, b) => a.price - b.price) // 按价格升序排列
            quotations.forEach((quotation, index) => {
                quotation.priceRank = index + 1
                quotation.minPrice = quotations[0].price
                quotation.maxPrice = quotations[quotations.length - 1].price
                // 计算价格优势 (相对于平均价格的百分比)
                const avgPrice = quotations.reduce((sum, q) => sum + q.price, 0) / quotations.length
                quotation.priceAdvantage = ((avgPrice - quotation.price) / avgPrice * 100)
            })
        })

        // 数据映射和增强
        let filteredData = supplierQuotations.map(quotation => {
            const supplier = suppliers.find(s => s.id === quotation.supplierId)
            const material = materialsWithUnit.find(m => m.id === quotation.materialId)

            // 计算有效期天数
            const validDays = quotation.expiryDate ?
                Math.max(0, Math.ceil((new Date(quotation.expiryDate) - new Date(quotation.quotationDate)) / (1000 * 60 * 60 * 24))) : 0

            return {
                ...quotation,
                // 页面期望的字段映射
                materialName: material?.materialName || '未知原料',
                specification: quotation.packageSpec || material?.specification || '标准规格',
                supplierName: supplier?.supplierName || '未知供应商',
                quotedPrice: quotation.price,
                unitName: material?.unitName || '未知单位',
                priceRank: quotation.priceRank || 1,
                priceAdvantage: quotation.priceAdvantage || 0,
                validDays: validDays,
                contactPerson: supplier?.contactPerson || '无',
                phone: supplier?.phone || '无',
                // 保留原有字段用于计算
                minPrice: quotation.minPrice,
                maxPrice: quotation.maxPrice
            }
        })

        console.log('📊 供应商报价数据增强完成，共', filteredData.length, '条记录')

        // 应用搜索过滤
        if (materialName && materialName.trim()) {
            console.log('📝 按原料名称筛选:', materialName)
            filteredData = filteredData.filter(item =>
                item.materialName && item.materialName.includes(materialName.trim())
            )
            console.log('📝 原料名称筛选后结果数量:', filteredData.length)
        }

        if (supplierId && supplierId.trim()) {
            console.log('🏢 按供应商筛选:', supplierId)
            filteredData = filteredData.filter(item =>
                item.supplierId === parseInt(supplierId)
            )
            console.log('🏢 供应商筛选后结果数量:', filteredData.length)
        }

        if (materialId) {
            filteredData = filteredData.filter(item => item.materialId === parseInt(materialId))
        }

        console.log('✅ 供应商报价最终筛选结果:', filteredData.length, '条记录')

        const result = paginate(filteredData, page, size)
        return createResponse(result)
    },

    'GET /api/suppliers/suggestions': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10

        const result = paginate(purchaseSuggestions, page, size)
        return createResponse(result)
    },

    'GET /api/suppliers/evaluations': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10

        const enrichedData = supplierEvaluations.map(evaluation => {
            const supplier = suppliers.find(s => s.id === evaluation.supplierId)
            return {
                ...evaluation,
                supplierName: supplier?.supplierName || '未知供应商'
            }
        })

        const result = paginate(enrichedData, page, size)
        return createResponse(result)
    },

    'GET /api/suppliers/price-comparison': async () => {
        await delay()
        return createResponse(priceComparisonHistory)
    },

    // ========== 成本异常预警 ==========
    'GET /api/warnings/rules': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10

        const result = paginate(warningRules, page, size)
        return createResponse(result)
    },

    'POST /api/warnings/rules': async (config) => {
        await delay()
        const ruleData = JSON.parse(config.data)
        const newRule = {
            id: warningRules.length + 1,
            ...ruleData,
            createTime: new Date().toISOString(),
            updateTime: new Date().toISOString()
        }
        warningRules.push(newRule)
        return createResponse(newRule, 201, '预警规则创建成功')
    },

    'PUT /api/warnings/rules/:id': async (config) => {
        await delay()
        const id = parseInt(config.url.match(/\/api\/warnings\/rules\/(\d+)/)[1])
        const ruleData = JSON.parse(config.data)

        const index = warningRules.findIndex(r => r.id === id)
        if (index === -1) {
            return createResponse(null, 404, '预警规则不存在')
        }

        warningRules[index] = {
            ...warningRules[index],
            ...ruleData,
            updateTime: new Date().toISOString()
        }

        return createResponse(warningRules[index], 200, '预警规则更新成功')
    },

    'GET /api/warnings/records': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10
        const warningLevel = params.get('warningLevel') || params.get('level') // 兼容两种参数名
        const warningType = params.get('warningType') || ''
        const status = params.get('status') || ''

        console.log('🔍 预警记录搜索参数:', {
            warningLevel,
            warningType,
            status,
            page,
            size,
            原始URL: config.url,
            查询字符串: queryString
        })

        // 预警类型映射：将数据库中的类型映射为前端期望的类型
        const warningTypeMapping = {
            'COST_OVER': 'COST_EXCEED',      // 成本超标 → 成本超标
            'LOSS_OVER': 'LOSS_ABNORMAL',    // 损耗异常 → 损耗异常
            'PRICE_CHANGE': 'PRICE_FLUCTUATION',  // 价格波动 → 价格波动
            'MARGIN_LOW': 'MARGIN_LOW'       // 毛利偏低 → 保持不变
        }

        // 状态映射：将数据库中的状态映射为前端期望的状态
        const statusMapping = {
            'UNPROCESSED': 'PENDING',        // 未处理 → 待处理
            'PROCESSED': 'PROCESSED',        // 已处理 → 已处理
            'IGNORED': 'IGNORED'             // 已忽略 → 已忽略
        }

        // 数据映射和增强
        let enrichedData = warningRecords.map(record => {
            // 提取日期部分作为预警日期
            const warningDate = record.warningTime ? record.warningTime.split(' ')[0] : ''

            return {
                ...record,
                // 页面期望的字段映射
                warningDate: warningDate,
                currentValue: record.triggerValue || 0,
                deviationRate: record.excessRate || 0,
                warningType: warningTypeMapping[record.warningType] || record.warningType,
                status: statusMapping[record.status] || record.status,
                // 保留原有字段
                warningTime: record.warningTime, // 保留完整时间信息
                triggerValue: record.triggerValue,
                excessRate: record.excessRate
            }
        })

        console.log('📊 预警记录数据增强完成，共', enrichedData.length, '条记录')

        // 应用搜索过滤
        let filteredData = enrichedData

        if (warningLevel && warningLevel.trim()) {
            console.log('📝 按预警级别筛选:', warningLevel)
            filteredData = filteredData.filter(item => item.warningLevel === warningLevel.trim())
            console.log('📝 预警级别筛选后结果数量:', filteredData.length)
        }

        if (warningType && warningType.trim()) {
            console.log('🏷️ 按预警类型筛选:', warningType)
            filteredData = filteredData.filter(item => item.warningType === warningType.trim())
            console.log('🏷️ 预警类型筛选后结果数量:', filteredData.length)
        }

        if (status && status.trim()) {
            console.log('📊 按状态筛选:', status)
            filteredData = filteredData.filter(item => item.status === status.trim())
            console.log('📊 状态筛选后结果数量:', filteredData.length)
        }

        console.log('✅ 预警记录最终筛选结果:', filteredData.length, '条记录')

        const result = paginate(filteredData, page, size)
        return createResponse(result)
    },

    'PUT /api/warnings/records/:id/process': async (config) => {
        await delay()
        const id = parseInt(config.url.match(/\/api\/warnings\/records\/(\d+)\/process/)[1])
        const processData = JSON.parse(config.data)

        console.log('📝 处理预警记录:', { id, processData })

        const index = warningRecords.findIndex(r => r.id === id)
        if (index === -1) {
            return createResponse(null, 404, '预警记录不存在')
        }

        // 状态反向映射：将前端状态映射为数据库状态
        const statusReverseMapping = {
            'PROCESSED': 'PROCESSED',    // 已处理 → 已处理
            'IGNORED': 'IGNORED'         // 已忽略 → 已忽略
        }

        const dbStatus = statusReverseMapping[processData.status] || processData.status

        warningRecords[index] = {
            ...warningRecords[index],
            status: dbStatus,
            processedBy: processData.processedBy || '系统管理员',
            processedTime: new Date().toISOString(),
            processingResult: processData.processingResult || (processData.status === 'IGNORED' ? '已忽略该预警' : '已处理该预警'),
            ...processData
        }

        console.log('✅ 预警记录处理完成:', warningRecords[index])

        return createResponse(warningRecords[index], 200, '预警处理成功')
    },

    'GET /api/warnings/stats': async () => {
        await delay()
        return createResponse(warningStats[0]) // 返回最新统计
    },

    'GET /api/warnings/trends': async () => {
        await delay()
        return createResponse(warningTrends)
    },

    'GET /api/warnings/distribution': async () => {
        await delay()
        return createResponse(warningTypeDistribution)
    },

    // ========== 毛利率看板 ==========
    'GET /api/profit/analysis': async (config) => {
        await delay()

        // 安全地解析URL参数
        const urlParts = config.url.split('?')
        const queryString = urlParts.length > 1 ? urlParts[1] : ''
        const params = new URLSearchParams(queryString)

        const page = parseInt(params.get('page')) || 1
        const size = parseInt(params.get('size')) || 10
        const category = params.get('category') || ''
        const recipeName = params.get('recipeName') || ''

        console.log('🔍 毛利分析搜索参数:', {
            category,
            recipeName,
            page,
            size,
            原始URL: config.url,
            查询字符串: queryString
        })

        // 计算利润排名（按总利润降序排列）
        const sortedByProfit = [...profitAnalysis].sort((a, b) => b.totalProfit - a.totalProfit)
        sortedByProfit.forEach((item, index) => {
            item.profitRank = index + 1
        })

        // 数据映射和增强
        let enrichedData = profitAnalysis.map(item => {
            const recipe = recipes.find(r => r.id === item.recipeId)

            return {
                ...item,
                // 页面期望的字段映射
                costPrice: item.actualCost || item.standardCost || 0,
                profit: item.sellingPrice - (item.actualCost || item.standardCost || 0),
                marginRate: item.actualMargin || 0,
                salesVolume: item.salesQty || 0,
                profitRank: item.profitRank || 1,
                imageUrl: recipe?.imageUrl || `/images/recipes/${item.recipeId}.png`,
                // 保留原有字段
                actualCost: item.actualCost,
                actualMargin: item.actualMargin,
                salesQty: item.salesQty
            }
        })

        console.log('📊 毛利数据增强完成，共', enrichedData.length, '条记录')

        // 应用搜索过滤
        let filteredData = enrichedData

        if (category && category.trim()) {
            console.log('🏷️ 按菜品分类筛选:', category)
            filteredData = filteredData.filter(item =>
                item.category && item.category === category.trim()
            )
            console.log('🏷️ 分类筛选后结果数量:', filteredData.length)
        }

        if (recipeName && recipeName.trim()) {
            console.log('📝 按菜品名称筛选:', recipeName)
            filteredData = filteredData.filter(item =>
                item.recipeName && item.recipeName.includes(recipeName.trim())
            )
            console.log('📝 菜品名称筛选后结果数量:', filteredData.length)
        }

        console.log('✅ 毛利分析最终筛选结果:', filteredData.length, '条记录')

        const result = paginate(filteredData, page, size)
        return createResponse(result)
    },

    'GET /api/profit/trends': async () => {
        await delay()
        return createResponse(profitTrends)
    },

    'GET /api/profit/categories': async () => {
        await delay()
        return createResponse(categoryProfitDistribution)
    },

    'GET /api/profit/stores': async () => {
        await delay()
        return createResponse(storeProfitComparison)
    },

    'GET /api/profit/forecast': async () => {
        await delay()
        return createResponse(profitForecast)
    },

    'GET /api/profit/pricing-recommendations': async () => {
        await delay()
        return createResponse(pricingRecommendations)
    },
    // 添加不带/api前缀的路由支持
    'GET /recipes': async (config) => {
        // 直接调用带/api前缀的路由处理函数
        return mockRoutes['GET /api/recipes'](config)
    }
}

// 路由匹配函数
export const matchRoute = (method, url) => {
    // 移除查询参数，只保留路径部分
    const cleanUrl = url.split('?')[0]
    const key = `${method} ${cleanUrl}`

    console.log('🔍 路由匹配尝试:', key)
    console.log('🔍 当前注册的路由:', Object.keys(mockRoutes))

    // 精确匹配
    if (mockRoutes[key]) {
        console.log('✅ 精确匹配成功:', key)
        return mockRoutes[key]
    }

    // 参数匹配
    for (const route in mockRoutes) {
        const [routeMethod, routePath] = route.split(' ')
        if (routeMethod !== method) continue

        const routeRegex = routePath.replace(/:\w+/g, '\\d+')
        const regex = new RegExp(`^${routeRegex}$`)

        console.log(`🔍 尝试参数匹配: ${route} → 正则: ${routeRegex} → 测试URL: ${cleanUrl}`)

        if (regex.test(cleanUrl)) {
            console.log('✅ 参数匹配成功:', route, '→', cleanUrl)
            return mockRoutes[route]
        }
    }

    console.warn('❌ 没有找到匹配的路由:', key)
    console.warn('❌ 可用的路由列表:', Object.keys(mockRoutes).filter(r => r.startsWith(method)))
    return null
} 