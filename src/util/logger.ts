import * as log4js from 'log4js';
import '@log4js-node/logstashudp';

const appenders = ['console'];

if (process.env.LOGSTASH_ENABLED === 'yes') {
  appenders.push('logstash');
}

log4js.configure({
  appenders: {
    console: {
      type: 'console',
    },
    logstash: {
      type: '@log4js-node/logstashudp',
      host: process.env.LOGSTASH_HOST,
      port: process.env.LOGSTASH_PORT,

      // @BEGIN EXTRA_DATA_PROVIDER
      /**
       * Todas as vezes que o logger for chamado
       * Ele chamará essa função, passando os argumentos que
       * você mesmo enviou para a função
       *
       * Note que o primeiro parâmetro é sempre uma string "mensagem"
       * É uma boa prática padronizar que o logger aceite apenas 2 parâmetros
       * no máximo. Uma mensagem: string; e payload: any
       *
       * @param loggingEvent
       * @param loggingEvent.data[0] ~ String: mensagem
       * @param logginEvent.data[1...n] ~ Os argumentos que você passou para a função
       */
      extraDataProvider: (loggingEvent: any) => ({
        NODE_ENV: process.env.NODE_ENV || 'unknown',
        pid: loggingEvent.pid,    // <- Campo especial, ele sempre existe
        application: 'tsapi',    // <- Boas práticas
        fields: loggingEvent.data[1],    // <- Padronizar assim é bom
      }),
      // @END EXTRA_DATA_PROVIDER
    },
  },
  categories: {
    default: { appenders, level: process.env.LOGGER_LEVEL },
  },
});

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

export default logger;
