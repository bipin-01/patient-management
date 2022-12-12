import App from 'app';
import route from 'routes/index';
import config from 'config';

const port = config.app.port; // default port to listen

const app = new App(route);

app.listen(port);
