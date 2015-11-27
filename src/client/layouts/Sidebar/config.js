export default 
[
    {
        msg: 'Dashboard',
        icon: 'icon-home',
        path: '/',
        navKey: 0
    }, {
        msg: 'Line',
        icon: 'icon-chartline',
        navKey: 1,
        items: [
            {
                msg: 'line-1',
                path: '/line/1'
            }, 
            {
                msg: 'line-2',
                path: '/line/2'
            }, 
            {
                msg: 'line-3',
                path: '/line/3'
            }
        ]
    }, {
        msg: 'Bar',
        icon: 'icon-chartbar',
        navKey: 2,
        items: [
            {
                msg: 'bar-1',
                path: '/bar/1'
            }, 
            {
                msg: 'bar-2',
                path: '/bar/2'
            }, 
            {
                msg: 'bar-3',
                path: '/bar/3'
            }
        ]
    }, {
        msg: 'Pie',
        icon: 'icon-database',
        navKey: 3,
        items: [
            {
                msg: 'pie-1',
                path: '/pie/1'
            }, 
            {
                msg: 'pie-2',
                path: '/pie/2'
            }, 
            {
                msg: 'pie-3',
                path: '/pie/3'
            }
        ]
    }, {
        msg: '豆瓣',
        icon: 'icon-database',
        navKey: 4,
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
    }
]
