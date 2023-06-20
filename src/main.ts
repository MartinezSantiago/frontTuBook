import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {Amplify} from 'aws-amplify';
import awsConfig from './aws-exports';

Amplify.configure(awsConfig);
Amplify.Logger.LOG_LEVEL = 'DEBUG';
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
