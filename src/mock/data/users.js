// 用户模拟数据
export const users = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    realName: '超级管理员',
    avatarUrl: '/images/user/admin.png',
    email: 'admin@restaurant.com',
    phone: '13800138000',
    status: 1,
    lastLoginTime: '2025-09-01 16:30:00',
    createTime: '2025-09-01 00:00:00',
    updateTime: '2025-09-01 16:30:00'
  },
  {
    id: 2,
    username: 'manager',
    password: '123456',
    realName: '系统管理员',
    avatarUrl: '/images/user/admin.png',
    email: 'manager@restaurant.com',
    phone: '13800138001',
    status: 1,
    lastLoginTime: '2025-09-01 15:20:00',
    createTime: '2025-09-01 00:00:00',
    updateTime: '2025-09-01 15:20:00'
  }
]

// 生成JWT Token的模拟函数
export const generateToken = (user) => {
  return `mock-jwt-token-${user.id}-${Date.now()}`
} 