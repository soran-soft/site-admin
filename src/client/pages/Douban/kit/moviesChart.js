import AsEcharts from '../../../utils/AsEcharts';

export default {
    // 初始化图表，并且有加载中动画，返回当前图表实例
    init: function (domId) {
        let asEcharts = new AsEcharts();

        asEcharts.initChart(domId);

        return asEcharts;
    },

    // 使用init返回的实例，配置option并渲染图表
    output: function (asEcharts, chartInfo, movie) {
        let { tag, sort, name, type } = chartInfo;
    
        let title = {
                text: tag,
                subtext: sort
            },
            legend = {
                data: [name]
            },
            xAxis = [{
                axisLabel: {
                    interval: 0,    //类目全显
                    rotate: '-30'   //顺时针旋转
                },
                data: []
            }],
            series = [{
                name: name,
                type: type,
                data: []
            }],
            toolSwitch = {
                boundaryGap: (type === 'bar' ? true : false)
            };

        movie.forEach(function (v, i) {
            xAxis[0].data.push(v.title);
            series[0].data.push(v.rate);
        });

        asEcharts.getOption(title, legend, xAxis, series, toolSwitch);

        // 渲染图表
        asEcharts.setOption();
    }
}