import AsEcharts from '../../../utils/AsEcharts';

export default {
    // 初始化图表，并且有加载中动画，返回当前图表实例
    init: function (domId) {
        let asEcharts = new AsEcharts();

        asEcharts.initChart(domId);

        return asEcharts;
    },

    // 使用init返回的实例，配置option并渲染图表
    output: function (asEcharts, chartInfo, shops) {
        let { page, page_size, type } = chartInfo;
    
        let title = {
                text: '商品',
                subtext: '价格分析'
            },
            legend = {
                data: []
            },
            xAxis = [{
                data: []
            }],
            series = [],
            toolSwitch = {
                boundaryGap: (type === 'bar' ? true : false)
            };

        shops.forEach(function (shop, i) {
            legend.data.push(shop.name);

            series.push({
                name: shop.name,
                type: type,
                data: shop.skus.map(v => v.price)
            });
        });
        for (let i = 1, len = shops[0].skus.length; i <= len; i++) {
            xAxis[0].data.push('商品'+i);
        }

        asEcharts.getOption(title, legend, xAxis, series, toolSwitch);

        // 渲染图表
        asEcharts.setOption();
    }
}