export const themes = [
  { id: 'sensory', name: '植物与感官', description: '气味、纹样与触感反复把你带回自然材料。' },
  { id: 'wandering', name: '缓慢行走', description: '你常在没有明确目的的行走中保存注意力。' },
  { id: 'time', name: '旧物与时间', description: '旧纸、皮革和书桌让时间留下可以触摸的表面。' },
  { id: 'care', name: '准备与照料', description: '清单、比较与烹饪，是你照料未来的一种方法。' },
  { id: 'identity', name: '保存与成为', description: '你借由一次次保存与放弃，理解自己正在成为谁。' },
]

export const categories = ['全部', '生活', '旅行', '时尚美妆', '攻略收藏', '学习创作']

export const seedMemories = [
  { id: 'rosemary', order: 1, photo: 0, title: '花市买回的迷迭香', date: '2025.03.09', category: '生活', source: '照片', place: '上海', theme: 'sensory', trace: '周日花市。叶片被手指碰过以后，气味一直留在袖口。', meaning: '你保存的不是一盆植物，而是气味如何让普通的一天拥有坐标。', related: ['quanzhou', 'perfume'] },
  { id: 'stew', order: 2, photo: 1, title: '雨天的番茄炖菜', date: '2025.03.21', category: '生活', source: '手动记录', place: '家', theme: 'care', trace: '没有照着菜谱，只记下锅里逐渐变暖的颜色。', meaning: '做饭在这里不是任务，而是一种让混乱重新获得节奏的照料。', related: ['sunscreen', 'packing'] },
  { id: 'night-walk', order: 3, photo: 2, title: '深夜散步的语音', date: '2025.04.02', category: '生活', source: '语音转写', place: '上海', theme: 'wandering', trace: '走到第三个路口时，突然想明白一件拖了很久的事。', meaning: '当身体开始移动，你的思考也更容易从原来的路径里松开。', related: ['jeju', 'season-walk'] },
  { id: 'desk', order: 4, photo: 3, title: '搬家后的第一张书桌', date: '2025.04.19', category: '生活', source: '照片', place: '上海', theme: 'time', trace: '桌面还很空，旧台灯和两本书先有了位置。', meaning: '重新安放旧物，是你确认一个陌生空间开始属于自己的方式。', related: ['kyoto', 'linen'] },
  { id: 'kyoto', order: 5, photo: 4, title: '京都旧书店的收据', date: '2025.05.08', category: '旅行', source: '票据', place: '京都', theme: 'time', trace: '纸已经有些卷边，背面写着那天下午下过一阵雨。', meaning: '一张无用的收据被留下，因为它替一段时间保存了触感。', related: ['desk', 'borges', 'typography'] },
  { id: 'quanzhou', order: 6, photo: 5, title: '泉州屋顶的植物纹样', date: '2025.05.27', category: '旅行', source: '照片', place: '泉州', theme: 'sensory', trace: '屋脊上的花不像真实植物，却比写实的叶片更有生命。', meaning: '你反复被“自然如何被人重新描绘”吸引，这也影响了你的视觉判断。', related: ['rosemary', 'typography'] },
  { id: 'jeju', order: 7, photo: 6, title: '济州岛被风吹动的草地', date: '2025.06.13', category: '旅行', source: '视频', place: '济州岛', theme: 'wandering', trace: '画面里没有事件，只有风连续改变草的方向。', meaning: '你会为极慢的变化停留，并把这种变化理解为生命的证据。', related: ['night-walk', 'linen'] },
  { id: 'hangzhou', order: 8, photo: 7, title: '杭州清晨的沿河路线', date: '2025.06.28', category: '旅行', source: '行程与地点', place: '杭州', theme: 'wandering', trace: '刻意绕开热门地点，沿着水声走了一个小时。', meaning: '旅行对你而言并不只是抵达，而是重新调整注意力的速度。', related: ['season-walk', 'bookstores'] },
  { id: 'lipstick', order: 9, photo: 8, title: '最后没有买的砖红色口红', date: '2025.07.07', category: '时尚美妆', source: '美妆笔记', place: '上海', theme: 'identity', trace: '颜色很好看，但试完以后觉得它更像想象中的自己。', meaning: '没有购买也是一次有效选择：你开始区分喜欢的形象和真实的需要。', related: ['memory-question', 'garden-dev'] },
  { id: 'linen', order: 10, photo: 9, title: '亚麻衬衫与旧皮包', date: '2025.07.24', category: '时尚美妆', source: '穿搭记录', place: '上海', theme: 'time', trace: '喜欢会留下折痕、磨损，并且越用越像自己的材料。', meaning: '你偏爱的不是崭新，而是物品与身体共同留下时间的质感。', related: ['desk', 'jeju'] },
  { id: 'perfume', order: 11, photo: 10, title: '三款木质香水的试香', date: '2025.08.05', category: '时尚美妆', source: '试香笔记', place: '上海', theme: 'sensory', trace: '最终记住的是潮湿树皮、焚香和一小段柑橘。', meaning: '气味收藏把旅行、植物和身体经验连接在同一条感官根系里。', related: ['rosemary', 'quanzhou'] },
  { id: 'sunscreen', order: 12, photo: 11, title: '夏季防晒的使用比较', date: '2025.08.18', category: '时尚美妆', source: '使用记录', place: '上海', theme: 'care', trace: '没有做参数排名，只记下不同天气和皮肤状态里的真实感受。', meaning: '你倾向于用长期体验修正标准答案，而不是把选择交给排行榜。', related: ['stew', 'packing'] },
  { id: 'bookstores', order: 13, photo: 12, title: '上海独立书店的一日路线', date: '2025.09.02', category: '攻略收藏', source: '网页收藏', place: '上海', theme: 'identity', trace: '路线按街区和步行距离重新排过，最后只保留三家。', meaning: '整理路线的过程也在整理偏好：你在选择自己愿意进入怎样的城市。', related: ['hangzhou', 'memory-question'] },
  { id: 'packing', order: 14, photo: 13, title: '日本旅行行李清单', date: '2025.09.20', category: '攻略收藏', source: '行程清单', place: '东京', theme: 'care', trace: '清单里最后增加了一个空白栏：给途中偶然得到的东西。', meaning: '准备并不意味着控制一切，你也在为意外主动留下空间。', related: ['stew', 'museum'] },
  { id: 'museum', order: 15, photo: 14, title: '阴天适合去的美术馆', date: '2025.10.11', category: '攻略收藏', source: '网页收藏', place: '上海', theme: 'care', trace: '不是景点清单，而是一份给低能量天气准备的温和方案。', meaning: '攻略成为对未来状态的照料，而不只是最高效率的安排。', related: ['packing', 'season-walk'] },
  { id: 'season-walk', order: 16, photo: 15, title: '按照季节整理的散步地点', date: '2025.10.29', category: '攻略收藏', source: '地点收藏', place: '上海', theme: 'wandering', trace: '春天看树影，夏天靠近水，秋天寻找旧墙的颜色。', meaning: '地点因为季节和身体感受而变化，你在收藏一种动态的城市。', related: ['night-walk', 'hangzhou'] },
  { id: 'typography', order: 17, photo: 16, title: '植物版画与字体排印', date: '2025.11.16', category: '学习创作', source: '学习笔记', place: '工作室', theme: 'sensory', trace: '边缘不完全准确的线条，反而比照片更接近观察本身。', meaning: '这条笔记解释了你的视觉判断：保留自然证据，但不复制自然表面。', related: ['quanzhou', 'garden-dev', 'kyoto'] },
  { id: 'borges', order: 18, photo: 17, title: '读博尔赫斯时留下的一段话', date: '2025.12.03', category: '学习创作', source: '阅读笔记', place: '家', theme: 'time', trace: '记忆不是过去的仓库，它每次被想起都会重新改变形状。', meaning: '你开始把记忆理解为持续发生的编辑，而不是静止的档案。', related: ['kyoto', 'memory-question'] },
  { id: 'memory-question', order: 19, photo: 18, title: '人为什么需要保存记忆', date: '2026.01.14', category: '学习创作', source: '对话片段', place: '线上', theme: 'identity', trace: '一次关于收藏、遗忘和自我连续性的长对话。', meaning: '问题从“怎样保存更多”转向“哪些连接正在塑造我”。', related: ['borges', 'garden-dev', 'kyoto'] },
  { id: 'garden-dev', order: 20, photo: 19, title: '确定记忆花园的视觉方向', date: '2026.02.08', category: '学习创作', source: '开发记录', place: '工作室', theme: 'identity', trace: '决定让植物成为档案的时间线与关系结构，而不是档案本身。', meaning: '这段开发记录本身也成为记忆：你正在用作品回答自己为何保存事物。', related: ['typography', 'memory-question'] },
]
