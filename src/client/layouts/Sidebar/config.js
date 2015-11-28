export default 
[{
    msg: 'Dashboard',
    icon: 'icon-home',
    path: '/',
    navKey: 0
}, {
    msg: 'Demo',
    icon: 'icon-github',
    navKey: 1,
    items: [
        {
            msg: 'line',
            path: '/demo/line'
        }, 
        {
            msg: 'bar',
            path: '/demo/bar'
        }, 
        {
            msg: 'pie',
            path: '/demo/pie'
        }
    ]
}, {
    msg: '豆瓣',
    icon: 'icon-database',
    navKey: 2,
    items: [
        {
            msg: '电影',
            path: '/douban/movies'
        }, 
        {
            msg: '音乐',
            path: '/douban/musics'
        }, 
        {
            msg: '小说',
            path: '/douban/books'
        }
    ]
}]
