import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './views/Home'
import Details from './views/Details'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tweet/:id" component={Details} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
