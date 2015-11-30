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
        doms: [],
        tables: []
    }

    componentDidMount() {
        let { aboutChart, shops, fetchShop } = this.props;
        let page = 1,
            page_size = 5;

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
            
            let { doms, tables } = this.state;

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

            doms.push(document.getElementById('shops-input-1'), document.getElementById('shops-input-2'));

            this.setState({ doms, tables });
        }.bind(this));
    }

    formSubmit(e) {
        e.preventDefault();

        let { aboutChart, shops, fetchShop } = this.props;
        let doms = this.state.doms,
            page = doms[0].value,
            page_size = doms[1].value;
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

            this.setState({ doms, tables });
        }.bind(this));
    }

    render() {
        return (
            <section>
                <form action="" className="df-douban-shops-form" onSubmit={this.formSubmit.bind(this)}>
                    <FormText inputId="shops-input-1" title="page" placeholder="page" inline="auto" asStyle="df-douban-shops-input" />
                    <FormText inputId="shops-input-2" title="page_size" placeholder="page_size" inline="auto" asStyle="df-douban-shops-input" />
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
