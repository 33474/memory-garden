import { useMemo, useState } from 'react'
import './process.css'

const rounds = [
  {
    phase: '启动',
    prompt: '我正在进行一个网站开发，这是我的开发文档，请你开始执行',
    screenshots: ['/concepts/memory-garden-hero-concept.png'],
    note: '首轮视觉方向概念图',
  },
  {
    phase: '原型',
    prompt: '我个人还是觉得这个稍微偏向写实一点的风格还不错。 现在我们有了一个大概的视觉风格,至于视觉的素材可以到时候我再来批量生成制作。 下一步先制作出一个目前的网站原型,能够让我去交互测试。',
    screenshots: ['/process/round-04-prototype.png'],
    note: '第一版可交互植物生长原型',
  },
  {
    phase: '定位',
    prompt: '问题1.目前的记忆收藏来源是什么？能否和我的小红书账号关联起来？如果没办法，我觉得可以抓取一些我们在gpt和codex上的对话（你有这个权限），把个人生活收藏转变成个人记录；2.目前的视觉我觉得不是很好，首页的视觉效果我想的是一颗小植物，从0开始生长，按照节点时的一段段展开，可以是更复古写实的风格。3.有机智能的感觉还不够，有机我觉得之所以有机，是因为它能够对人的一切行为都产生一些反馈，会有生命力以及呼吸感的感觉，请你根据以上三点进行迭代视觉设计',
    screenshots: ['/process/round-04-prototype.png'],
    note: '记忆来源、植物节点与有机反馈合并进原型',
  },
  {
    phase: '动效',
    prompt: '1.我觉得这个视觉还是不太准确，目前有点过于写实；2.关于生长的概念，目前似乎仅仅呈现在静态的视觉上，对于动态的，成长的内容似乎还没有体现？如果改成代码的话是不是能够进行演绎？你觉得这个交互“生长”和呼吸的机制是什么样的，不着急开始，先给我方案',
    screenshots: ['/concepts/memory-garden-v2-listening-concept.png'],
    note: '本轮先形成动效与呼吸机制方案，复用方案对应概念图',
  },
  {
    phase: '内容',
    prompt: '1.20条模拟记忆可以自己编造一下，根据一些生活、旅行、时尚美妆、攻略、学习等；2，去除目前小红书的表现，3.整体的产品定位目前是什么，我觉得初版更像一个个人记忆可视化以及记录的网站，这个和我们最开始的设定一致吗？',
    screenshots: ['/process/round-08-archive.png'],
    note: '20 条模拟记忆进入档案，产品回到个人记忆记录与可视化',
  },
  {
    phase: '内容',
    prompt: 'OK，进行下一步制作',
    screenshots: ['/process/round-10-orbit.png'],
    note: '把模拟记忆继续落实到图像浏览结构',
  },
  {
    phase: '结构',
    prompt: '目前交互形式和可视化并不直观，我觉得可以参考https://www.clouarchitects.com/、https://ca.pinterest.com/pin/518265869641995184/、https://ca.pinterest.com/pin/492649955024750/、https://ca.pinterest.com/pin/713257659768257284/，特别是第一个，需要有很直观展示档案的感觉，但同时可能又有植物的生长属性，因为我们的Memory Garden',
    screenshots: ['/process/round-10-orbit.png'],
    note: '从单株植物转向图像档案与轨道浏览',
  },
  {
    phase: '视觉',
    prompt: '主要参考https://i.pinimg.com/originals/d3/31/df/d331dffd07ee7bb054bf761cb03588e9.gif、https://www.clouarchitects.com/的形式，现在这个很土',
    screenshots: ['/process/round-12-archive-grid.png'],
    note: '第一次针对 Clou 与动态图像档案的简化重构',
  },
  {
    phase: '有机交互',
    prompt: '目前这个结构可以，但是没有动效，我希望的动效以及概念能能够往有机智能上去做，即“有呼吸感”，有交互感，比如1.garden主要是在呈现这些图片和记忆，可以是有好几个集合的同样主题花园，象征着这个主题的记忆花朵，随着每个主题的积累多少不同，花朵集合也不同，长势不同，当鼠标移到某个主题花朵上，这些图片集合就从堆叠聚合的状态转出，转到像目前garden这样的效果，2.archive就是类似于有机档案这样的感觉，目前暂时这样还不错，3.Growth部分则表示时间线的生长，目前这个状态也还可以，还可以提现一下几者之间的关联；4.为了呼应有机感，字体可以整体换为衬线体，另外整体网站里要有更多的动效和互动。',
    screenshots: ['/process/round-16-organic-overview.png', '/process/round-16-organic-bloom.png', '/process/round-16-organic-growth.png'],
    note: '五个主题花园、悬停展开、关系轨道与时间生长',
  },
  {
    phase: '密度与开屏',
    prompt: '1.目前图片为什么都有丢失丢失，2.其次，Garden界面 ，当我鼠标移动到花朵上的时候，反应太快了，我觉得应该是悬停1-2s才开始展开，再者现在花朵的图片堆叠太少了，可以重复摆一些图片，数量更多一些才好看，类似图1这样，图片变小一些，2.整体平面视觉可以参考一下央美2023年毕业展的主视觉“蔚然生长”，包括颜色，字体，以及动效，3.给整个网页加个开屏页动效，可以就是整个“Memory Garden”的字体慢慢生长出来，然后再进去目前的页面状态',
    screenshots: ['/process/round-17-dense.png', '/process/round-18-intro.png'],
    note: '修复图片、增加花朵密度、延迟展开并加入生长开屏',
  },
  {
    phase: '字体',
    prompt: '首先，Garden页面的图片要有大有小，有一点叠压关系，其次目前Garden的“Your memories grow in company”也可以用如图所示的花体英文，并且缩小，整个网页都用衬线体，现在上面的导航栏等用的还是非衬线体',
    screenshots: ['/process/round-18-intro.png', '/process/round-19-final.png'],
    note: '花体品牌语言、全局衬线字体与大小叠压图片',
  },
  {
    phase: '智能感应',
    prompt: '1.开屏页面和导航页面的memory garden还没有改，2.Atchive部分的卡片点击打开应该是类似于详细记录的东西，现在会返回原来的“Garden”界面有点奇怪，3.我觉得可以加一个感应的功能，比如根据目前的时间、地点或者是最近发生的事情自动类似于推荐之前的与之相关的memory，比如目前整个网站应用是建立在自己的收藏以及感悟上的，我想实现的就是一种弱交互，智能交互，假设我刚到上海，这个会自动把我之前收藏过的上海相关的推文和记录过的东西感应出来',
    screenshots: ['/process/round-19-final.png', '/process/round-19-mobile.png'],
    note: '最终品牌字标、Archive 详情与时间/地点/近期记录感应',
  },
]

const phases = ['全部', ...new Set(rounds.map((item) => item.phase))]
const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

function ProcessDashboard() {
  const [phase, setPhase] = useState('全部')
  const visibleRounds = useMemo(
    () => phase === '全部' ? rounds : rounds.filter((item) => item.phase === phase),
    [phase],
  )

  const downloadArchive = () => {
    const blob = new Blob([JSON.stringify(rounds, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'memory-garden-iteration-prompts.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="process-dashboard">
      <header className="process-header">
        <a className="process-wordmark" href="./">Memory Garden</a>
        <span>智能体协作档案 · 2026</span>
        <div><a href="./">打开原型 ↗</a><button onClick={downloadArchive}>下载对话记录 ↓</button></div>
      </header>

      <section className="process-hero">
        <div><span>12轮 / 指令 + 产出</span><h1>迭代<br />档案</h1></div>
        <p>这里仅整理 12 个有效开发轮次的 Prompt 原文和已留存页面截图。因网络重复发送的指令与最终总结已经移除；评价标准和项目复盘暂未开始。</p>
      </section>

      <nav className="process-filters" aria-label="按阶段筛选">
        {phases.map((item) => <button key={item} className={phase === item ? 'is-active' : ''} onClick={() => setPhase(item)}>{item}</button>)}
      </nav>

      <section className="round-list" aria-label="Agent 对话迭代记录">
        {visibleRounds.map((round) => {
          const index = rounds.indexOf(round) + 1
          return (
            <article className="round-row" key={`${index}-${round.phase}`}>
              <div className="round-meta"><strong>{String(index).padStart(2, '0')}</strong><span>{round.phase}</span></div>
              <div className="round-prompt"><small>对话指令原文</small><p>{round.prompt}</p></div>
              <div className={`round-shots ${round.screenshots.length > 1 ? 'has-many' : ''}`}>
                {round.screenshots.map((screenshot, shotIndex) => (
                  <figure key={screenshot}>
                    <img src={assetUrl(screenshot)} alt={`第 ${index} 轮产出截图 ${shotIndex + 1}`} loading="lazy" />
                  </figure>
                ))}
                <p>{round.note}</p>
              </div>
            </article>
          )
        })}
      </section>

      <footer className="process-footer"><span>Memory Garden · 开发档案</span><span>评价标准与项目复盘</span></footer>
    </main>
  )
}

export default ProcessDashboard
