function setup() {
    shiftPage(currentPage)

    var allPages = selectAll('.page')
    allPages.map(page => {
        var menuItem = createElement('a')
        menuItem.html(page.attribute('title'))
        menuItem.mousePressed(() => goToPage('#' + page.attribute('id')))
        select('.sidebar').child(menuItem)
    })

    showToast('"Side 2, 15 sek, vent for magien"', 3000, "warning")
}

function goToPage(newPage) {
    if (currentPage === '#page2') stopTimer()
    shiftPage(newPage)
    if (newPage === '#page2') startTimer('#pageTimer')
}




