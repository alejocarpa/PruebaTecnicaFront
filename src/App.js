import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './componentes/Login/Login';
import Home from './componentes/Home/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Home" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
