var TradeItem = Vue.extend({
    props: ['trade'],
    template: `
        <li>
            <div>Trade ID = {{ trade.id }}</div>
            <div>traded on {{ trade.tradedOn }}</div>
            <div>type = {{ trade.type }}</div>
            <div>security = {{ trade.security }}</div>
        </li>
    `            
})

var tradesSample =    [
        {
            'id': 1,
            tradedOn: '21 nov 2017',
            type: 'Buy',
            security: 'FB'
        },
        {
            'id': 2,
            tradedOn: '26 nov 2017',
            type: 'Buy',
            security: 'AAPL'
        },
        {
            'id': 3,
            tradedOn: '28 nov 2017',
            type: 'Buy',
            security: 'GOOG'
        }
]

var TradeList = Vue.extend({
    template: `
        <div>
            <h1>List of trades</h1>
            <ol type="1">
                <trade-item v-for="trade in trades" :trade="trade" :key="trade.id"></trade-item>
            </ol>
        </div>
    `,
    data: function () {
        return {'trades': tradesSample}
    },
    components: {
        'trade-item': TradeItem
    }
})

Vue.component('trade-list', TradeList)

// create a root instance
new Vue({
    el: '#app'
})