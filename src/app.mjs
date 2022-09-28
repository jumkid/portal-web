import createError from 'http-errors';
import express from 'express';
import { engine } from 'express-handlebars';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.mjs';
import carOwnerRouter from './routes/car-owner.mjs';
import professionalRouter from './routes/professional.mjs';
import signupRouter from './routes/signup.mjs';
import privacyPolicyRouter from './routes/privacy-policy.mjs';

const setRouters = (app) => {
  app.use("/", indexRouter);
  app.use("/professional", professionalRouter);
  app.use("/car-owner", carOwnerRouter);
  app.use("/signup", signupRouter);
  app.use("/privacy-policy", privacyPolicyRouter);
}

// resolve global variables vaule for ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const App = {

  init: () => {
    const app = express();

    // view engine setup
    app.set('view engine', 'hbs');
    app.set('views', './views');

    // handlebars engine configuration
    app.engine('hbs', engine({
      extname: 'hbs',
      defaultView: 'main',
      layoutsDir: __dirname + '../../views/layouts/',
      partialsDir: __dirname + '../../views/partials/'
    }));

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));

    app.use(helmet());
    app.use(helmet.xssFilter());
    app.use(helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "http://localhost", "https://localhost", "https://api.jumkid.com"],
        fontSrc: ["'self'"],
        mediaSrc: ["'self'"],
        childSrc: ["'self'"],
        objectSrc:["'self'"]
      },
      reportOnly: false,
      setAllHeaders: false,
      safari5: false
    }));

    // routers
    setRouters(app);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    return app;
  }
  
}

export default App;
