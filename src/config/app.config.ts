/**
 * Configurações de ambiente da aplicação
 */
export const appConfig = {
  /**
   * Porta do servidor
   */
  port: process.env.PORT || 3000,
  /**
   * Ambiente de execução (development, production, test)
   */
  nodeEnv: process.env.NODE_ENV || 'development',
  /**
   * URL de conexão com o banco de dados
   */
  databaseUrl: process.env.DATABASE_URL,
  /**
   * Flag para determinar se estamos em ambiente de desenvolvimento
   */
  isDevelopment: () => appConfig.nodeEnv === 'development',
  /**
   * Flag para determinar se estamos em ambiente de produção
   */
  isProduction: () => appConfig.nodeEnv === 'production',
  /**
   * Flag para determinar se estamos em ambiente de teste
   */
  isTest: () => appConfig.nodeEnv === 'test',
};
