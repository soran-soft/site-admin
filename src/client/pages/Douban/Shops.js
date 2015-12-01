import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchShop } from '../../actions/douban';
import { FormText } from '../../components/Form/';
import { Table } from '../../components/Table/';
import shopsChart from './kit/shopsChart';

class Shops extends Component {
    static defaultProps = {
        aboutChart: { // 图表的图例及图表类型
            type: 'line'
        }
    }

    state = {
        values: ['1', '5'],
        tables: []
    }

    componentDidMount() {
        this.renderChart();
    }

    formSubmit(e) {
        e.preventDefault();

        this.renderChart();
    }

    renderChart() {
        let { aboutChart, shops, fetchShop } = this.props;
        let values = this.state.values,
            page = values[0],
            page_size = values[1];

        let asEcharts,
            chartInfo = {
                ...aboutChart,
                page,
                page_size
            };

        fetchShop(page, page_size, function () {
            asEcharts = shopsChart.init('douban-shops');
        }, function (shops) {
            shopsChart.output(asEcharts, chartInfo, shops);
            
            let { tables } = this.state;

            tables = shops.map(shop => {
                return {
                    caption: shop.name,
                    title: ['商品名称', '优惠价', '市场价'],
                    data: shop.skus.map(v => {
                        return { 
                            title: v.title, 
                            promote_price: v.promote_price,
                            market_price: v.market_price
                        }
                    })
                }
            });

            this.setState({ values, tables });
        }.bind(this));
    }

    handleChangeOne(e) {
        let state = this.state;
        state.values[0] = e.target.value;

        this.setState(state);
    }

    handleChangeTwo(e) {
        let state = this.state;
        state.values[1] = e.target.value;console.log(typeof e.target.value)

        this.setState(state);
    }

    render() {
        let { values } = this.state;
        return (
            <section>
                <form action="" className="df-douban-shops-form" onSubmit={this.formSubmit.bind(this)}>
                    <FormText inputId="shops-input-1" title="当前页" 
                        placeholder={values[0]} 
                        inline="auto" asStyle="df-douban-shops-input"
                        handleChange={this.handleChangeOne.bind(this)} />
                    <FormText inputId="shops-input-2" title="每页显示数量" 
                        placeholder={values[1]} 
                        inline="auto" asStyle="df-douban-shops-input"
                        handleChange={this.handleChangeTwo.bind(this)} />
                    <button type="submit" className="button">渲染图表</button>
                </form>

                <div id="douban-shops" style={{height: '400px'}}></div>

                {this.state.tables.map((table, i) => <Table key={i} asStyle="df-douban-table" config={table} />)}
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        shops: state.douban.shops
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchShop
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Shops);
