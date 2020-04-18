import * as cors from 'cors';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as express from 'express';
import * as http from 'http';
import errorMiddleware from './middleware/error.middleware';
import allRoutes from './routes';
import onServerReady from 'util/onServerReady';

export default class HTTPServer {
  public app: express.Application;
  public server: http.Server;
  public port: (string | number);
  public isProduction: boolean;

  constructor(routes?: express.Router[]) {
    this.app = express();
    this.port = process.env.PORT || 3500;
    this.isProduction = process.env.NODE_ENV === 'production';

    this.app.set('json spaces', 2);

    this.server = new http.Server(this.app);

    this.initializeMiddlewares();
    this.initializeRoutes(routes || allRoutes);
    this.initializeErrorHandling();
  }

  public listen(callback?: () => void) {
    this.server.listen(this.port, async () => {
      console.log(`🚀 App listening on the port ${this.port}`);

      // Essa util foi criada para não precisar mexer aqui nesse arquivo
      // Assim esse arquivo fica fácil de ler e a lógica associada ao
      // startup do aplicativo fica separado
      if (process.env.ENABLE_UTIL_ON_SERVER_READY === 'yes') {
        await onServerReady();
      }

      if (callback) callback();
    });
  }

  private initializeMiddlewares() {
    this.app.use(cors());

    // @TODO ~ Ajustar essas regras de cors
    // Por enquanto tudo bem, mas quando o projeto for subir para
    // produção, é bom que não fique tão aberto à requisições

    if (this.isProduction) {
      this.app.use(hpp());
      this.app.use(helmet());
      // this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
    } else {
      // this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: express.Router[]) {
    routes.forEach((router) => {
      this.app.use('/', router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}
