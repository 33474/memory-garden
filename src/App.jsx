import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const STORAGE_KEY = 'memory-garden-v4'

const themes = [
  { id: 'sensory', name: '植物与感官', latin: 'Sensory flora', note: '气味、颜色与身体留下的细小证据', x: 17, y: 29, accent: '#00a33a' },
  { id: 'wandering', name: '缓慢行走', latin: 'Slow wandering', note: '沿着城市、风和偶然不断伸展', x: 49, y: 20, accent: '#078754' },
  { id: 'time', name: '旧物与时间', latin: 'Objects in time', note: '被使用、保存并反复想起的时间', x: 82, y: 31, accent: '#4d7d2f' },
  { id: 'care', name: '准备与照料', latin: 'Acts of care', note: '为日常与未来保留柔软的秩序', x: 31, y: 71, accent: '#00a43a' },
  { id: 'identity', name: '保存与成为', latin: 'Keeping & becoming', note: '选择如何保存，也在选择如何成为', x: 69, y: 70, accent: '#006f42' },
]

const seedMemories = [
  { id: 'rosemary', order: 1, title: '花市买回的迷迭香', date: '2025.03.09', category: '生活', source: '照片', theme: 'sensory', image: '/memories/01.jpg', trace: '叶片被手指碰过以后，气味一直留在袖口。', meaning: '气味让普通的一天拥有了坐标。', related: ['quanzhou', 'perfume'] },
  { id: 'stew', order: 2, title: '雨天的番茄炖菜', date: '2025.03.21', category: '生活', source: '手动记录', theme: 'care', image: '/memories/02.jpg', trace: '没有照着菜谱，只记下锅里逐渐变暖的颜色。', meaning: '做饭是让混乱重新获得节奏的一种照料。', related: ['sunscreen', 'packing'] },
  { id: 'night-walk', order: 3, title: '深夜散步的语音', date: '2025.04.02', category: '生活', source: '语音转写', theme: 'wandering', image: '/memories/03.jpg', trace: '走到第三个路口时，突然想明白一件拖了很久的事。', meaning: '身体开始移动，思考也更容易松开。', related: ['jeju', 'season-walk'] },
  { id: 'desk', order: 4, title: '搬家后的第一张书桌', date: '2025.04.19', category: '生活', source: '照片', theme: 'time', image: '/memories/04.jpg', trace: '桌面还很空，旧台灯和两本书先有了位置。', meaning: '重新安放旧物，是确认陌生空间开始属于自己的方式。', related: ['kyoto', 'linen'] },
  { id: 'kyoto', order: 5, title: '京都旧书店的收据', date: '2025.05.08', category: '旅行', source: '票据', theme: 'time', image: '/memories/05.jpg', trace: '纸已经有些卷边，背面写着那天下午下过一阵雨。', meaning: '一张无用的收据替一段时间保存了触感。', related: ['desk', 'borges'] },
  { id: 'quanzhou', order: 6, title: '泉州屋顶的植物纹样', date: '2025.05.27', category: '旅行', source: '照片', theme: 'sensory', image: '/memories/06.jpg', trace: '屋脊上的花不像真实植物，却比写实的叶片更有生命。', meaning: '自然如何被人重新描绘，持续影响着你的视觉判断。', related: ['rosemary', 'typography'] },
  { id: 'jeju', order: 7, title: '济州岛被风吹动的草地', date: '2025.06.13', category: '旅行', source: '视频', theme: 'wandering', image: '/memories/07.jpg', trace: '画面里没有事件，只有风连续改变草的方向。', meaning: '极慢的变化也可以成为生命的证据。', related: ['night-walk', 'linen'] },
  { id: 'hangzhou', order: 8, title: '杭州清晨的沿河路线', date: '2025.06.28', category: '旅行', source: '行程与地点', theme: 'wandering', image: '/memories/08.jpg', trace: '刻意绕开热门地点，沿着水声走了一个小时。', meaning: '旅行不只是抵达，也是重新调整注意力的速度。', related: ['season-walk', 'bookstores'] },
  { id: 'lipstick', order: 9, title: '最后没有买的砖红色口红', date: '2025.07.07', category: '时尚美妆', source: '美妆笔记', theme: 'identity', image: '/memories/09.jpg', trace: '颜色很好看，但试完以后觉得它更像想象中的自己。', meaning: '没有购买也是一次有效的选择。', related: ['memory-question', 'garden-dev'] },
  { id: 'linen', order: 10, title: '亚麻衬衫与旧皮包', date: '2025.07.24', category: '时尚美妆', source: '穿搭记录', theme: 'time', image: '/memories/10.jpg', trace: '喜欢会留下折痕、磨损，并且越用越像自己的材料。', meaning: '物品与身体共同留下了时间的质感。', related: ['desk', 'jeju'] },
  { id: 'perfume', order: 11, title: '三款木质香水的试香', date: '2025.08.05', category: '时尚美妆', source: '试香笔记', theme: 'sensory', image: '/memories/11.jpg', trace: '最终记住的是潮湿树皮、焚香和一小段柑橘。', meaning: '气味把旅行、植物和身体经验连在同一条根系里。', related: ['rosemary', 'quanzhou'] },
  { id: 'sunscreen', order: 12, title: '夏季防晒的使用比较', date: '2025.08.18', category: '时尚美妆', source: '使用记录', theme: 'care', image: '/memories/12.jpg', trace: '没有做参数排名，只记下不同天气里的真实感受。', meaning: '你习惯用长期体验修正标准答案。', related: ['stew', 'packing'] },
  { id: 'bookstores', order: 13, title: '上海独立书店的一日路线', date: '2025.09.02', category: '攻略收藏', source: '网页收藏', theme: 'identity', image: '/memories/13.jpg', trace: '路线按街区和步行距离重新排过，最后只保留三家。', meaning: '整理路线的过程，也在整理自己愿意进入怎样的城市。', related: ['hangzhou', 'memory-question'] },
  { id: 'packing', order: 14, title: '日本旅行行李清单', date: '2025.09.20', category: '攻略收藏', source: '行程清单', theme: 'care', image: '/memories/14.jpg', trace: '清单里最后增加了一个空白栏，留给途中偶然得到的东西。', meaning: '准备并不意味着控制一切，也可以为意外留下空间。', related: ['stew', 'museum'] },
  { id: 'museum', order: 15, title: '阴天适合去的美术馆', date: '2025.10.11', category: '攻略收藏', source: '网页收藏', theme: 'care', image: '/memories/15.jpg', trace: '不是景点清单，而是一份给低能量天气准备的方案。', meaning: '攻略也可以成为对未来状态的照料。', related: ['packing', 'season-walk'] },
  { id: 'season-walk', order: 16, title: '按照季节整理的散步地点', date: '2025.10.29', category: '攻略收藏', source: '地点收藏', theme: 'wandering', image: '/memories/16.jpg', trace: '春天看树影，夏天靠近水，秋天寻找旧墙的颜色。', meaning: '地点因为季节和身体感受而持续变化。', related: ['night-walk', 'hangzhou'] },
  { id: 'typography', order: 17, title: '植物版画与字体排印', date: '2025.11.16', category: '学习创作', source: '学习笔记', theme: 'sensory', image: '/memories/17.jpg', trace: '边缘不完全准确的线条，反而比照片更接近观察本身。', meaning: '保留自然证据，但不复制自然表面。', related: ['quanzhou', 'garden-dev'] },
  { id: 'borges', order: 18, title: '读博尔赫斯时留下的一段话', date: '2025.12.03', category: '学习创作', source: '阅读笔记', theme: 'time', image: '/memories/18.jpg', trace: '记忆不是过去的仓库，它每次被想起都会重新改变形状。', meaning: '记忆是一场持续发生的编辑。', related: ['kyoto', 'memory-question'] },
  { id: 'memory-question', order: 19, title: '人为什么需要保存记忆', date: '2026.01.14', category: '学习创作', source: '对话片段', theme: 'identity', image: '/memories/19.jpg', trace: '一次关于收藏、遗忘和自我连续性的长对话。', meaning: '问题从怎样保存更多，转向哪些连接正在塑造我。', related: ['borges', 'garden-dev'] },
  { id: 'garden-dev', order: 20, title: '确定记忆花园的视觉方向', date: '2026.02.08', category: '学习创作', source: '开发记录', theme: 'identity', image: '/memories/20.jpg', trace: '决定让图像档案成为主体，让生长发生在浏览关系里。', meaning: '这段开发记录本身，也成为记忆花园的一部分。', related: ['typography', 'memory-question'] },
]

const categoryOptions = ['全部', '生活', '旅行', '时尚美妆', '攻略收藏', '学习创作']
const fallbackImage = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 700"><rect width="900" height="700" fill="#f4f4ef"/><path d="M-40 650C190 510 250 155 540 130S810 390 950 30" fill="none" stroke="#00a33a" stroke-width="3"/><text x="42" y="650" font-family="Arial" font-size="20" fill="#ff211b">MEMORY IMAGE · RECONNECTING</text></svg>')}`

function Arrow({ direction = 'right' }) {
  return <svg className={`arrow arrow-${direction}`} viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M14 6l6 6-6 6" /></svg>
}

function MemoryImage({ src, alt = '', ...props }) {
  const resolvedSrc = typeof src === 'string' && src.startsWith('/') && !src.startsWith('//')
    ? `${import.meta.env.BASE_URL}${src.slice(1)}`
    : src
  const recover = (event) => {
    if (event.currentTarget.dataset.recovered) return
    event.currentTarget.dataset.recovered = 'true'
    event.currentTarget.src = fallbackImage
  }
  return <img src={resolvedSrc} alt={alt} onError={recover} decoding="async" {...props} />
}

function OpeningSequence({ onComplete }) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(onComplete, reduced ? 650 : 4300)
    return () => window.clearTimeout(timer)
  }, [onComplete])

  return (
    <section className="opening-sequence" aria-label="Memory Garden 正在生长">
      <svg className="opening-vines" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-20 590 C180 590 128 420 336 430 S432 206 522 190 S680 340 1018 70" />
        <path d="M80 720 C190 570 314 648 420 460 S662 446 720 254 S870 194 990 202" />
      </svg>
      <div className="opening-code"><span>01</span><span>2026</span><span>Living archive</span></div>
      <div className="opening-title-wrap">
        <p>Memories gather, connect, and become</p>
        <h1 aria-label="Memory Garden">
          {'Memory Garden'.split('').map((letter, index) => <span key={`${letter}-${index}`} style={{ '--letter': index }}>{letter === ' ' ? '\u00a0' : letter}</span>)}
        </h1>
        <em>fresh roots / new growth</em>
      </div>
      <button onClick={onComplete}>Skip intro ↗</button>
    </section>
  )
}

function Header({ page, onPage, onRecord }) {
  return (
    <header className="app-header">
      <button className="wordmark" onClick={() => onPage('garden')}>Memory Garden</button>
      <nav aria-label="主导航">
        {[
          ['garden', 'Garden'],
          ['archive', 'Archive'],
          ['growth', 'Growth'],
        ].map(([id, label]) => <button key={id} className={page === id ? 'is-active' : ''} onClick={() => onPage(id)}>{label}</button>)}
      </nav>
      <button className="new-memory" onClick={onRecord}><span>＋</span> New memory</button>
    </header>
  )
}

function RelatedLinks({ memory, memories, onSelect }) {
  const memoryMap = useMemo(() => new Map(memories.map((item) => [item.id, item])), [memories])
  const related = memory.related.map((id) => memoryMap.get(id)).filter(Boolean).slice(0, 2)
  return (
    <div className="related-links">
      {related.map((item) => (
        <button key={item.id} onClick={() => onSelect(item.id)}>
          <MemoryImage src={item.image} alt="" />
          <span><strong>{item.title}</strong><small>{item.date}</small></span>
          <Arrow />
        </button>
      ))}
    </div>
  )
}

function MemoryDetail({ memory, memories, onClose, onSelect }) {
  const index = memories.findIndex((item) => item.id === memory?.id)
  const theme = themes.find((item) => item.id === memory?.theme)

  useEffect(() => {
    if (!memory) return undefined
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [memory, onClose])

  if (!memory) return null

  const move = (direction) => {
    const nextIndex = (index + direction + memories.length) % memories.length
    onSelect(memories[nextIndex].id)
  }

  return (
    <div className="memory-detail-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className="memory-detail" role="dialog" aria-modal="true" aria-labelledby="memory-detail-title">
        <header className="memory-detail-head">
          <button onClick={onClose}>← Back to archive</button>
          <span>{String(index + 1).padStart(2, '0')} / {String(memories.length).padStart(2, '0')}</span>
          <button onClick={onClose}>Close ×</button>
        </header>
        <div className="memory-detail-body">
          <figure className="memory-detail-visual">
            <MemoryImage src={memory.image} alt={memory.title} />
            <figcaption>{memory.source} · collected {memory.date}</figcaption>
          </figure>
          <div className="memory-detail-copy">
            <span className="memory-detail-latin">{theme?.latin}</span>
            <h1 id="memory-detail-title">{memory.title}</h1>
            <div className="memory-detail-meta"><span>{memory.date}</span><span>{memory.category}</span><span>{memory.source}</span></div>
            <section><small>WHAT REMAINED</small><p>{memory.trace}</p></section>
            <section><small>GARDEN READING</small><p>{memory.meaning}</p></section>
            <div className="memory-root-note"><i /><span>这段记忆生长在“{theme?.name}”中，并通过相似的地点、感官或念头继续连接。</span></div>
            <div className="memory-detail-related">
              <small>RELATED ROOTS</small>
              <RelatedLinks memory={memory} memories={memories} onSelect={onSelect} />
            </div>
          </div>
        </div>
        <footer className="memory-detail-nav">
          <button onClick={() => move(-1)}>← Previous memory</button>
          <button onClick={() => move(1)}>Next memory →</button>
        </footer>
      </article>
    </div>
  )
}

const LOCATION_PREF_KEY = 'memory-garden-location-sensing'

function ContextSense({ memories, customMemories, onOpen }) {
  const [expanded, setExpanded] = useState(false)
  const [place, setPlace] = useState(null)
  const [locationStatus, setLocationStatus] = useState('idle')
  const hour = new Date().getHours()

  const timeSignal = hour < 5
    ? { label: '深夜仍醒着', memoryId: 'night-walk', note: '现在的时间，和一段曾在深夜松开的思绪很接近。' }
    : hour < 10
      ? { label: '清晨正在发生', memoryId: 'hangzhou', note: '花园感应到清晨，于是沿着水声找回一条旧路线。' }
      : hour < 18
        ? { label: '白日适合重新发现', memoryId: 'bookstores', note: '这个时段适合把曾保存的城市路线重新带回眼前。' }
        : { label: '夜晚正在靠近', memoryId: 'night-walk', note: '花园记得你曾在相似的夜色里，让思考慢慢松开。' }

  const recentTheme = customMemories.at(-1)?.theme
  const recentMemory = recentTheme
    ? [...memories].reverse().find((item) => item.theme === recentTheme && !item.id.startsWith('personal-'))
    : null
  const signal = place || (recentMemory
    ? { label: '最近的记录留下回声', memoryId: recentMemory.id, note: `你刚刚记录的内容，让“${themes.find((item) => item.id === recentTheme)?.name}”中的旧记忆再次活跃。` }
    : timeSignal)
  const memory = memories.find((item) => item.id === signal.memoryId) || memories[0]

  const readLocation = useCallback((remember = true) => {
    if (!navigator.geolocation) {
      setLocationStatus('unsupported')
      return
    }
    setLocationStatus('loading')
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude: lat, longitude: lon } = coords
      const detected = lat > 30.6 && lat < 31.9 && lon > 120.8 && lon < 122.2
        ? { label: '感应到你抵达上海', memoryId: 'bookstores', note: '当前位置与旧收藏相遇：花园把曾保存的上海路线轻轻推回你身边。' }
        : lat > 29.7 && lat < 30.7 && lon > 119.7 && lon < 120.7
          ? { label: '感应到你来到杭州', memoryId: 'hangzhou', note: '当前位置唤醒了一条沿河走过的清晨路线。' }
          : { label: '位置正在改变', memoryId: timeSignal.memoryId, note: '附近还没有明确的地点记忆，花园先从此刻的时间寻找回应。' }
      setPlace(detected)
      setLocationStatus('ready')
      if (remember) window.localStorage.setItem(LOCATION_PREF_KEY, 'enabled')
      setExpanded(true)
    }, () => {
      setLocationStatus('denied')
      setExpanded(true)
    }, { enableHighAccuracy: false, timeout: 7000, maximumAge: 600000 })
  }, [timeSignal.memoryId])

  useEffect(() => {
    if (window.localStorage.getItem(LOCATION_PREF_KEY) === 'enabled') readLocation(false)
  }, [readLocation])

  const simulateShanghai = () => {
    setPlace({ label: '感应到你抵达上海', memoryId: 'bookstores', note: '当前位置与旧收藏相遇：花园把曾保存的上海路线轻轻推回你身边。' })
    setLocationStatus('ready')
    setExpanded(true)
  }

  return (
    <aside className={`context-sense ${expanded ? 'is-expanded' : ''}`} aria-live="polite">
      <button className="sense-trigger" onClick={() => setExpanded((current) => !current)} aria-expanded={expanded}>
        <i /><span><small>GARDEN SENSING</small><strong>{signal.label}</strong></span><b>{expanded ? '×' : '↗'}</b>
      </button>
      {expanded ? (
        <div className="sense-body">
          <p>{signal.note}</p>
          <button className="sense-memory" onClick={() => onOpen(memory.id)}>
            <MemoryImage src={memory.image} alt="" />
            <span><small>THE GARDEN REMEMBERS</small><strong>{memory.title}</strong><em>{memory.date} · {memory.category}</em></span>
            <Arrow />
          </button>
          <div className="sense-actions">
            <button onClick={() => readLocation(true)} disabled={locationStatus === 'loading'}>{locationStatus === 'loading' ? '正在感应位置…' : '允许位置感应'}</button>
            <button onClick={simulateShanghai}>模拟抵达上海</button>
          </div>
          {locationStatus === 'denied' ? <small className="sense-status">没有获得位置权限，时间感应仍会继续。</small> : null}
        </div>
      ) : null}
    </aside>
  )
}

function ThemeFlower({ theme, memories, index, onEnter }) {
  const memoryIds = new Set(memories.map((memory) => memory.id))
  const rootCount = memories.reduce((total, memory) => total + memory.related.filter((id) => memoryIds.has(id)).length, 0)
  const vitality = memories.length + rootCount * .55
  const particleCount = Math.max(36, memories.length * 10)
  const visible = Array.from({ length: particleCount }, (_, particleIndex) => {
    const memory = memories[particleIndex % Math.max(1, memories.length)]
    const angle = particleIndex * 2.399 + index * .43
    const distance = 6 + Math.sqrt(particleIndex / Math.max(1, particleCount - 1)) * 34
    const isAnchor = particleIndex % 9 === 0
    return {
      memory,
      x: 50 + Math.cos(angle) * distance,
      y: 50 + Math.sin(angle) * distance * .82,
      size: isAnchor ? 28 + ((particleIndex * 5) % 13) : 8 + ((particleIndex * 7) % 12),
      rotate: -16 + ((particleIndex * 19) % 33),
      delay: particleIndex * -.07,
      layer: isAnchor ? 4 + (particleIndex % 3) : 1 + (particleIndex % 3),
    }
  }).filter((item) => item.memory)
  return (
    <button
      className="theme-flower"
      style={{ '--x': `${theme.x}%`, '--y': `${theme.y}%`, '--accent': theme.accent, '--flower-size': `${168 + memories.length * 5 + rootCount * 4}px`, '--breath': `${Math.max(4.6, 7.6 - vitality * .32)}s`, '--flower-delay': `${index * -.9}s` }}
      onMouseEnter={() => onEnter(theme.id, 'hover-start')}
      onMouseLeave={() => onEnter(theme.id, 'hover-end')}
      onFocus={() => onEnter(theme.id, 'activate')}
      onClick={() => onEnter(theme.id, 'activate')}
      aria-label={`展开${theme.name}主题花园，共${memories.length}段记忆`}
    >
      <span className="flower-halo" />
      <span className="flower-images">
        {visible.map(({ memory, x, y, size, rotate, delay, layer }, particleIndex) => (
          <MemoryImage key={`${memory.id}-${particleIndex}`} src={memory.image} alt="" style={{ '--petal-x': `${x}%`, '--petal-y': `${y}%`, '--petal-size': `${size}px`, '--petal-rotate': `${rotate}deg`, '--particle-delay': `${delay}s`, '--petal-layer': layer }} />
        ))}
      </span>
      <span className="flower-label"><em>{theme.latin}</em><strong>{theme.name}</strong><small>{String(memories.length).padStart(2, '0')} memories · {rootCount} living roots</small></span>
    </button>
  )
}

function GardenPage({ memories, selectedId, onSelect, onPage }) {
  const [activeTheme, setActiveTheme] = useState(null)
  const [primedTheme, setPrimedTheme] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const sceneRef = useRef(null)
  const hoverTimerRef = useRef(null)
  const groups = useMemo(() => new Map(themes.map((theme) => [theme.id, memories.filter((memory) => memory.theme === theme.id)])), [memories])
  const theme = themes.find((item) => item.id === activeTheme)
  const themeMemories = activeTheme ? groups.get(activeTheme) || [] : []
  const selectedInTheme = themeMemories.find((memory) => memory.id === hoveredId)
    || themeMemories.find((memory) => memory.id === selectedId)
    || themeMemories[themeMemories.length - 1]

  const moveField = (event) => {
    const bounds = sceneRef.current?.getBoundingClientRect()
    if (!bounds) return
    sceneRef.current.style.setProperty('--garden-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 18}px`)
    sceneRef.current.style.setProperty('--garden-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 14}px`)
  }

  const closeTheme = () => {
    window.clearTimeout(hoverTimerRef.current)
    setActiveTheme(null)
    setPrimedTheme(null)
    setHoveredId(null)
  }

  useEffect(() => () => window.clearTimeout(hoverTimerRef.current), [])

  const handleThemeIntent = (themeId, intent) => {
    window.clearTimeout(hoverTimerRef.current)
    if (intent === 'hover-end') {
      setPrimedTheme((current) => current === themeId ? null : current)
      return
    }
    if (intent === 'activate') {
      setPrimedTheme(null)
      setActiveTheme(themeId)
      return
    }
    setPrimedTheme(themeId)
    hoverTimerRef.current = window.setTimeout(() => {
      setPrimedTheme(null)
      setActiveTheme(themeId)
    }, 1400)
  }

  return (
    <main className={`garden-page ${activeTheme ? 'is-bloomed' : 'is-resting'}`}>
      <section className="garden-scene" ref={sceneRef} onPointerMove={moveField} aria-label="五个会生长的主题记忆花园">
        <svg className="garden-root-system" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true">
          <path d="M500 322 C420 300 270 240 170 190 M500 322 C500 252 492 176 490 122 M500 322 C610 286 720 218 820 202 M500 322 C420 372 360 430 310 492 M500 322 C580 372 640 430 690 486" />
          <circle cx="500" cy="322" r="4" />
        </svg>

        {activeTheme ? (
          <div className="theme-bloom" key={activeTheme} style={{ '--accent': theme.accent }}>
            <button className="garden-back" onClick={closeTheme}>← All gardens</button>
            <div className="bloom-title"><span>{theme.latin}</span><h1>{theme.name}</h1><p>{theme.note}</p></div>
            <svg className="bloom-orbit" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true">
              <ellipse cx="500" cy="330" rx="405" ry="245" />
              <ellipse cx="500" cy="330" rx="386" ry="227" />
            </svg>
            {themeMemories.map((memory, index) => {
              const angle = (index / Math.max(1, themeMemories.length)) * Math.PI * 2 - Math.PI * .78
              const x = 50 + Math.cos(angle) * 41
              const y = 51 + Math.sin(angle) * 37
              const size = 82 + ((index * 17) % 42)
              return (
                <button
                  key={memory.id}
                  className={`bloom-memory ${selectedInTheme?.id === memory.id ? 'is-active' : ''}`}
                  style={{ '--x': `${x}%`, '--y': `${y}%`, '--size': `${size}px`, '--float-delay': `${index * -.6}s`, '--rotate': `${Math.cos(angle) * 7}deg` }}
                  onMouseEnter={() => setHoveredId(memory.id)}
                  onFocus={() => setHoveredId(memory.id)}
                  onClick={() => { setHoveredId(memory.id); onSelect(memory.id) }}
                  aria-label={`${memory.title}，${memory.date}`}
                ><MemoryImage src={memory.image} alt="" /><span>{String(memory.order).padStart(2, '0')}</span></button>
              )
            })}
            {selectedInTheme ? (
              <article className="bloom-focus" key={selectedInTheme.id}>
                <div className="bloom-focus-image"><MemoryImage src={selectedInTheme.image} alt={selectedInTheme.title} /><i /></div>
                <div>
                  <span>{selectedInTheme.date} · {selectedInTheme.source}</span>
                  <h2>{selectedInTheme.title}</h2>
                  <p>{selectedInTheme.trace}</p>
                  <button onClick={() => onSelect(selectedInTheme.id)}>Keep this memory in focus <Arrow /></button>
                </div>
              </article>
            ) : null}
            <p className="bloom-hint">Move across the orbit · each image responds</p>
          </div>
        ) : (
          <div className="garden-overview">
            <div className="garden-intro"><span>01—05 / Living collections</span><h1>Your memories<br />grow in company.</h1><p>靠近一座主题花园，看聚合的记忆如何舒展为一条可浏览的关系轨道。</p></div>
            {themes.map((item, index) => (
              <div key={item.id} className={`flower-slot ${primedTheme === item.id ? 'is-primed' : ''}`}>
                <ThemeFlower theme={item} memories={groups.get(item.id) || []} index={index} onEnter={handleThemeIntent} />
              </div>
            ))}
            <p className="garden-instruction">Stay for a moment · let the garden recognize you</p>
          </div>
        )}
      </section>
      <div className="garden-toolbar">
        <div><button className="is-active" onClick={closeTheme}>Gardens</button><button onClick={() => onPage('archive')}>All memories</button></div>
        <span>{memories.length} memories are breathing</span>
      </div>
    </main>
  )
}

function ArchivePage({ memories, selectedId, onSelect, onOpenDetail }) {
  const [category, setCategory] = useState('全部')
  const filtered = category === '全部' ? memories : memories.filter((memory) => memory.category === category)
  return (
    <main className="archive-page">
      <div className="archive-head">
        <h1>Archive <sup>({memories.length})</sup></h1>
        <p>每一张图像都是可返回的入口。按类型筛选，或直接打开一段记忆。</p>
      </div>
      <div className="archive-filters">
        {categoryOptions.map((item) => <button key={item} className={category === item ? 'is-active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <section className="image-index" aria-label="全部记忆">
        {filtered.map((memory, index) => (
          <button
            key={memory.id}
            className={`image-index-item item-${index % 7} ${selectedId === memory.id ? 'is-selected' : ''}`}
            onClick={() => { onSelect(memory.id); onOpenDetail(memory.id) }}
          >
            <MemoryImage src={memory.image} alt={memory.title} />
            <span><strong>{memory.title}</strong><small>{memory.date} · {memory.category}</small></span>
          </button>
        ))}
      </section>
    </main>
  )
}

function GrowthPage({ memories, selectedId, onSelect, onOpen }) {
  const selected = memories.find((memory) => memory.id === selectedId) || memories[memories.length - 1]
  const pointMap = useMemo(() => {
    const map = new Map()
    memories.forEach((memory) => {
      const themeIndex = themes.findIndex((theme) => theme.id === memory.theme)
      map.set(memory.id, { x: 85 + ((memory.order - 1) / Math.max(1, memories.length - 1)) * 830, y: 115 + themeIndex * 88 })
    })
    return map
  }, [memories])

  const relationLines = memories.flatMap((memory) => memory.related.slice(0, 1).map((relatedId) => {
    const from = pointMap.get(memory.id)
    const to = pointMap.get(relatedId)
    return from && to ? { id: `${memory.id}-${relatedId}`, from, to, active: memory.id === selectedId || relatedId === selectedId } : null
  })).filter(Boolean)

  return (
    <main className="growth-page">
      <div className="growth-head">
        <h1>Growth</h1>
        <p>时间向右延伸；同一行是持续出现的主题，弯曲的线表示跨主题关系。</p>
      </div>
      <section className="growth-canvas" aria-label="记忆发展线">
        <div className="growth-months"><span>MAR 2025</span><span>JUN</span><span>SEP</span><span>DEC</span><span>FEB 2026</span></div>
        {themes.map((theme, index) => <div key={theme.id} className="theme-lane" style={{ '--lane': index }}><span>{theme.name}</span><i /></div>)}
        <svg viewBox="0 0 1000 570" preserveAspectRatio="none" aria-hidden="true">
          {relationLines.map(({ id, from, to, active }) => <path key={id} className={active ? 'is-active' : ''} d={`M${from.x} ${from.y} C${(from.x + to.x) / 2} ${from.y}, ${(from.x + to.x) / 2} ${to.y}, ${to.x} ${to.y}`} />)}
        </svg>
        {memories.map((memory) => {
          const point = pointMap.get(memory.id)
          return (
            <button key={memory.id} className={`growth-node ${memory.id === selectedId ? 'is-active' : ''}`} style={{ '--x': `${point.x / 10}%`, '--y': `${point.y / 5.7}%` }} onClick={() => onSelect(memory.id)}>
              <MemoryImage src={memory.image} alt="" /><span>{String(memory.order).padStart(2, '0')}</span>
            </button>
          )
        })}
      </section>
      <aside className="growth-detail">
        <span>{themes.find((theme) => theme.id === selected.theme)?.name}</span>
        <strong>{selected.title}</strong>
        <p>{selected.meaning}</p>
        <button onClick={onOpen}>Open memory <Arrow /></button>
      </aside>
    </main>
  )
}

function RecordModal({ open, onClose, onSave, nextOrder }) {
  const [step, setStep] = useState('write')
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [image, setImage] = useState('')
  const [theme, setTheme] = useState('identity')

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) return
    setStep('write'); setTitle(''); setNote(''); setImage(''); setTheme('identity')
  }, [open])

  if (!open) return null

  const chooseImage = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImage(String(reader.result))
    reader.readAsDataURL(file)
  }

  const continueRecord = (event) => {
    event.preventDefault()
    if (!title.trim() || !note.trim()) return
    const value = `${title} ${note}`
    if (/香|植物|颜色|气味|花/.test(value)) setTheme('sensory')
    else if (/走|旅行|城市|路|风|海/.test(value)) setTheme('wandering')
    else if (/旧|书|时间|物/.test(value)) setTheme('time')
    else if (/准备|清单|照料|比较|做饭/.test(value)) setTheme('care')
    setStep('connect')
  }

  const save = () => onSave({
    id: `personal-${Date.now()}`,
    order: nextOrder,
    title: title.trim(),
    date: new Date().toISOString().slice(0, 10).replaceAll('-', '.'),
    category: '生活',
    source: '手动记录',
    theme,
    image: image || `/memories/${String(((nextOrder - 1) % 20) + 1).padStart(2, '0')}.jpg`,
    trace: note.trim(),
    meaning: `这段记忆刚进入花园，并被暂时连接到“${themes.find((item) => item.id === theme)?.name}”。`,
    related: seedMemories.filter((item) => item.theme === theme).slice(-2).map((item) => item.id),
  })

  return (
    <div className="record-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="record-modal" role="dialog" aria-modal="true" aria-labelledby="record-title">
        <button className="record-close" onClick={onClose}>Close ×</button>
        <span className="record-count">{String(nextOrder).padStart(2, '0')}</span>
        {step === 'write' ? (
          <form onSubmit={continueRecord}>
            <div className="record-question"><h1 id="record-title">What stayed<br />with you?</h1><p>写下一件仍然留在脑海里的事。可以很小，也不需要先分类。</p></div>
            <div className="record-fields">
              <label>Title<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="给它一个名字" autoFocus /></label>
              <label>Memory<textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="发生了什么？为什么想留下它？" rows="5" /></label>
              <label className="image-input">Image<input type="file" accept="image/*" onChange={(event) => chooseImage(event.target.files?.[0])} /><span>{image ? 'Image selected' : '＋ Add an image'}</span></label>
              <button className="record-next" disabled={!title.trim() || !note.trim()}>Find a connection <Arrow /></button>
            </div>
            <div className={`record-preview ${image ? 'has-image' : ''}`}>{image ? <MemoryImage src={image} alt="新记忆预览" /> : <span>Image preview</span>}</div>
          </form>
        ) : (
          <div className="connection-step">
            <div><span>Suggested connection</span><h1 id="record-title">Where could<br />this grow?</h1><blockquote>{note}</blockquote></div>
            <div className="theme-choices">
              {themes.map((item) => <button key={item.id} className={theme === item.id ? 'is-active' : ''} onClick={() => setTheme(item.id)}><span>{item.name}</span><i /></button>)}
            </div>
            <div className="connection-preview"><MemoryImage src={image || `/memories/${String(((nextOrder - 1) % 20) + 1).padStart(2, '0')}.jpg`} alt="" /><span>{title}</span></div>
            <button className="record-next" onClick={save}>Add to the garden <Arrow /></button>
          </div>
        )}
      </section>
    </div>
  )
}

function loadCustomMemories() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null')
    return saved?.version === 4 && Array.isArray(saved.items) ? saved.items : []
  } catch {
    return []
  }
}

function App() {
  const appRef = useRef(null)
  const [introVisible, setIntroVisible] = useState(true)
  const [page, setPage] = useState('garden')
  const [customMemories, setCustomMemories] = useState(loadCustomMemories)
  const [selectedId, setSelectedId] = useState('garden-dev')
  const [recordOpen, setRecordOpen] = useState(false)
  const [detailId, setDetailId] = useState(null)
  const memories = useMemo(() => [...seedMemories, ...customMemories], [customMemories])
  const detailMemory = memories.find((memory) => memory.id === detailId)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 4, items: customMemories }))
  }, [customMemories])

  const saveMemory = (memory) => {
    setCustomMemories((current) => [...current, memory])
    setSelectedId(memory.id)
    setRecordOpen(false)
    setPage('garden')
  }

  const moveAmbientField = (event) => {
    appRef.current?.style.setProperty('--pointer-x', `${event.clientX}px`)
    appRef.current?.style.setProperty('--pointer-y', `${event.clientY}px`)
  }
  const closeIntro = useCallback(() => setIntroVisible(false), [])

  return (
    <div className={`app page-${page}`} ref={appRef} onPointerMove={moveAmbientField}>
      <Header page={page} onPage={setPage} onRecord={() => setRecordOpen(true)} />
      {page === 'garden' ? <GardenPage memories={memories} selectedId={selectedId} onSelect={setSelectedId} onPage={setPage} /> : null}
      {page === 'archive' ? <ArchivePage memories={memories} selectedId={selectedId} onSelect={setSelectedId} onOpenDetail={setDetailId} /> : null}
      {page === 'growth' ? <GrowthPage memories={memories} selectedId={selectedId} onSelect={setSelectedId} onOpen={() => setDetailId(selectedId)} /> : null}
      {!introVisible && !recordOpen && !detailMemory ? <ContextSense memories={memories} customMemories={customMemories} onOpen={setDetailId} /> : null}
      <MemoryDetail memory={detailMemory} memories={memories} onClose={() => setDetailId(null)} onSelect={setDetailId} />
      <RecordModal open={recordOpen} onClose={() => setRecordOpen(false)} onSave={saveMemory} nextOrder={memories.length + 1} />
      {introVisible ? <OpeningSequence onComplete={closeIntro} /> : null}
    </div>
  )
}

export default App
