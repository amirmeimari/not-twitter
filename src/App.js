import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './views/Home'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
