/* eslint-disable */

import 'eventsource-polyfill'
import hotClient from 'webpack-hot-middleware/client?noInfo=false&reload=true'

hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload()
    }
})