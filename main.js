const nextIndex = function(slide, offset) {

    let numberOfImgs = parseInt(slide.dataset.imgs, 10)

    let activeIndex = Number(slide.dataset.active)
    
    let i = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return i
}


const showImageAtIndex = function(slide, index) {
    let nextIndex = index

    slide.dataset.active = nextIndex

    let className = 'fire-active'
    removeClassAll(className)

    let nextSelector = '#id-fireimage-' + String(nextIndex)
    log('nextIndex ===',nextIndex)
    log('nextSelector ===',nextSelector)
    let img = e(nextSelector)
    log('img.src', img.src)
    img.classList.add(className)


    let indicatorClassName = 'fire-white'

    removeClassAll(indicatorClassName)

    let indicatorSelector = '#id-indicator-' + String(nextIndex)
    let indicator = e(indicatorSelector)
    indicator.classList.add(indicatorClassName)
}


const bindEventSlide = function() {
    let selector = '.fire-slide-button'
    bindAll(selector, 'click', function(event) {
        log('click next')
        let self = event.target
        let slide = self.parentElement
        let offset = Number(self.dataset.offset)
        let index = nextIndex(slide, offset)

        showImageAtIndex(slide, index)
    })
}


const bindEventIndicator = function() {
    let selector = '.fire-slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        let self = event.target
        let index = Number(self.dataset.index)
        log('index', index, typeof index)
        
        let slide = self.closest('.fire-slide')
        
        showImageAtIndex(slide, index)
    })
}

const bindEvents = function() {
    bindEventSlide()
    bindEventIndicator()
}

const playNextImage = function() {
    let slide = e('.fire-slide')
    let index = nextIndex(slide, 1)
    showImageAtIndex(slide, index)
}

const autoPlay = function() {
    let interval = setInterval(function() {
        playNextImage()
    }, 2000)
}

// 在 __main 入口函数里面调用全部事件
const __main = function() {
    bindEvents()
    autoPlay()
}

__main()
