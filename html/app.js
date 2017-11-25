var TradeItem = Vue.extend({
    props: ['trade'],
    template: `
        <tr>
            <th scope="row">{{ trade.id }}</th>
            <td>{{ trade.tradedOn }}</td>
            <td>{{ trade.type }}</td>
            <td>@{{ trade.security }}</td>
        </tr>
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
        <div class="row mt-3">
            <table class="table table-dark table-striped table-bordered table-hover vcenter">
            <caption class="text-dark text-top h2">List of trades</caption>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Traded On</th>
                        <th scope="col">Type</th>
                        <th scope="col">Security</th>
                    </tr>
                </thead>
                <tbody>
                    <trade-item v-for="trade in trades" :trade="trade" :key="trade.id"></trade-item>
                </tbody>
            </table>
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