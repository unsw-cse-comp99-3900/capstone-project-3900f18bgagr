import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DashboardPage from './Dashboard/DashboardPage';
import CareerPaths from './CareerPath/CareerPaths';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={DashboardPage} />
        <Route path="/CareerPaths" exact component={CareerPaths} />
        // other routes
      </Switch>
    </Router>
  );
}
