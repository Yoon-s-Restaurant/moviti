import React, { useCallback, useState } from 'react';
import { Route, Switch } from 'react-router';
import GlobalStyle from 'styles/global';
import Home from './pages/home';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Evaluate from './pages/evalute';
import Movie from './pages/movie';
import { Rating } from './components/common/rating';
import styled from 'styled-components';
import { KaKaoRedirect } from './components/redirect';

function App() {
  const [score, setScore] = useState(0);

  const onChangeScore = useCallback((displayedScore) => {
    setScore(displayedScore);
  }, []);
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path={'/signin'}>
          <SignIn />
        </Route>
        <Route path={'/signup'}>
          <SignUp />
        </Route>
        <Route path={'/evaluate'}>
          <Evaluate />
        </Route>
        <Route path={'/movie/:movieId'}>
          <Movie />
        </Route>
        <Route path="/auth/kakao/redirect" component={KaKaoRedirect} />
      </Switch>
    </>
  );
}

export default App;
