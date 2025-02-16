export default {
  // 漏洞审核状态
  post_status: {
    1: '审核中',
    2: '已忽略',
    3: '已确认',
    4: '已修复',
    5: '已完成'
  },
  // 用户状态
  user_status: {
    0: '禁止登录',
    1: '正常'
  },
  // 漏洞级别
  rankLevel: {
    1: '无影响',
    2: '低危',
    3: '中危',
    4: '高危'
  },
  // 礼品类型
  gift_type: {
    1: '实物',
    2: '虚拟'
  },
  // 礼品订单状态
  gift_status: {
    1: '处理中',
    2: '已发放',
    3: '已取消'
  },
  // 是否置顶
  top: {
    1: '置顶',
    2: '非置顶'
  },
  // 快递公司
  tracking: {
    SF: '顺丰速运',
    HTKY: '百世快递',
    ZTO: '中通快递',
    STO: '申通快递',
    YTO: '圆通快递',
    YD: '韵达快递',
    YZPY: '邮政快递包裹',
    EMS: 'EMS',
    HHTT: '天天快递',
    JD: '京东快递',
    UC: '优速快递',
    DBL: '德邦快递',
    ZJS: '宅急送'
  }
}
