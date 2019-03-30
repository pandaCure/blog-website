import React, { memo } from 'react'
import { Provider } from 'mobx-react'
import { Router, Switch } from 'react-router-dom'
function Home () {
  return (
    <Provider>
      <Router>
        <div>
          <Switch>
            <div>1111</div>
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

const App = memo(Home)

export default App
