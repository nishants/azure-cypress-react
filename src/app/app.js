import React from 'react';
import * as Sentry from '@sentry/browser';
import 'antd/dist/antd.css';

import './app.scss';
import Routes from './routes';

Sentry.init({
  dsn: 'https://7bf552970ea54e0ca079bd71c62f3d90@sentry.io/1408911'
});

class App extends React.PureComponent {
  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    return <Routes />;
  }
}

export default App;
