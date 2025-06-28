import React from 'react';
import './App.css';
import { Navbar } from './Layouts/NavbarAndFooter/Navbar';
import { Footer } from './Layouts/NavbarAndFooter/Footer';
import { HomePage } from './Layouts/HomePage/HomePage';
import { SearchBooksPage } from './SearchBooksPage/SearchBooksPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { BookCheckoutPage } from './Layouts/BookCheckoutPage/BookCheckoutPage';
import { oktaConfig } from './Lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, Security } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewListPage } from './Layouts/BookCheckoutPage/ReviewListPage/ReviewListPage';

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {

  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginaUri = async (_oktaAuth: any, originaUri: any) => {
    history.replace(toRelativeUrl(originaUri || '/', window.location.origin));
  }

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginaUri}
      onAuthRequired={customAuthHandler}>
        <Navbar />
        <div className='flex-grow-1'>
          <Switch>
            <Route path='/' exact>
              <Redirect to="/home" />
            </Route>
            <Route path='/home'>
              <HomePage />
            </Route>
            <Route path='/search'>
              <SearchBooksPage />
            </Route>
            <Route path='/reviewList/:bookId'>
              <ReviewListPage />
            </Route>
            <Route path='/checkout/:bookId'>
              <BookCheckoutPage />
            </Route>
            <Route path='/login' render={() => <LoginWidget config={oktaConfig} />} />
            <Route path='/login/callback' component={LoginCallback} />
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
}

