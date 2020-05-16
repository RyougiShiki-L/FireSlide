// 计算出下一张图片的 index
const nextIndex = function(slide, offset) {
    // 得到图片总数和当前图片下标
    let numberOfImgs = parseInt(slide.dataset.imgs, 10)
    // log('slide is',slide)
    // log('activeIndex is',activeIndex)
    let activeIndex = Number(slide.dataset.active)
    // 求出下一张图片的 id
    let i = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return i
}

// 显示下一张图片的 index
const showImageAtIndex = function(slide, index) {
    let nextIndex = index
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex

    // 删除当前图片的 class 给下一张图片加上 class
    let className = 'fire-active'
    removeClassAll(className)
    //这里可以用模板字符串拼接(let nextSelector = `#id-fireimage-${nextIndex}`)
    let nextSelector = '#id-fireimage-' + String(nextIndex)
    log('nextIndex ===',nextIndex)
    log('nextSelector ===',nextSelector)
    let img = e(nextSelector)
    log('img.src', img.src)
    img.classList.add(className)

    // 切换小圆点
    let indicatorClassName = 'fire-white'
    // 1. 删除当前小圆点的 class
    removeClassAll(indicatorClassName)
    // 2. 得到下一个小圆点的选择器
    // 用模板字符串拼接一个效果 (`#id-indicator-${String(nextIndex)}`)
    let indicatorSelector = '#id-indicator-' + String(nextIndex)
    let indicator = e(indicatorSelector)
    indicator.classList.add(indicatorClassName)
}

// 给上/下一张按钮批量绑定 click 事件
// 并通过调用 nextIndex 和 showImageAtIndex 函数,达到显示下一张图片功能
const bindEventSlide = function() {
    let selector = '.fire-slide-button'
    bindAll(selector, 'click', function(event) {
        log('click next')
        let self = event.target
        // 找到 slide div
        let slide = self.parentElement
        // 上一张图片的 offset 是 -1
        // 下一张图片的 offset 是 1
        let offset = Number(self.dataset.offset)
        // 算出下一张图片的 index
        let index = nextIndex(slide, offset)
        // 显示下一张图片
        showImageAtIndex(slide, index)
    })
}

// 给小圆点绑定 mouseover 事件,并调用 showImageAtIndex 函数,达到鼠标悬浮播放
const bindEventIndicator = function() {
    let selector = '.fire-slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        let self = event.target
        let index = Number(self.dataset.index)
        log('index', index, typeof index)
        //小圆点和待播放图片的公共祖父元素为 .fire-slide
        let slide = self.closest('.fire-slide')
        // 直接播放第 n 张图片
        showImageAtIndex(slide, index)
    })
}

// 把封装好的上/下一张按钮和小圆点函数放进 bindEvents 批量调用
const bindEvents = function() {
    bindEventSlide()
    bindEventIndicator()
}

// 默认自动播放为下一张图片
const playNextImage = function() {
    let slide = e('.fire-slide')
    // 默认 offset 是 1(往下一张播放)
    let index = nextIndex(slide, 1)
    // 显示下一张图片
    showImageAtIndex(slide, index)
}

// 自动播放
const autoPlay = function() {
    let interval = setInterval(function() {
        // 每 2s 都会调用这个函数
        playNextImage()
    }, 2000)
}

// 在 __main 入口函数里面调用全部事件
const __main = function() {
    bindEvents()
    autoPlay()
}

__main()
