import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

/**
 * Processa as origens CORS da variável de ambiente
 * @returns Uma função de origem ou um array de origens permitidas ou '*'
 */
const processOrigins = ():
  | string
  | string[]
  | ((
      origin: string,
      callback: (err: Error | null, allow: boolean) => void,
    ) => void) => {
  const originsFromEnv = process.env.CORS_ORIGINS;

  // Se não houver configuração, permita todas as origens
  if (!originsFromEnv) {
    return '*';
  }

  // Se for configurado como "*", permita todas as origens
  if (originsFromEnv.trim() === '*') {
    return '*';
  }

  // Normaliza as origens: remove espaços e barras finais
  const normalizeOrigin = (origin: string): string => {
    let cleaned = origin.trim();
    if (cleaned.endsWith('/')) {
      cleaned = cleaned.slice(0, -1);
    }
    return cleaned;
  };

  // Separe as origens por vírgula e normalize-as
  const origins = originsFromEnv.split(',').map(normalizeOrigin);

  // Retorna uma função de callback para verificar as origens
  return (
    origin: string,
    callback: (err: Error | null, allow: boolean) => void,
  ) => {
    // Se origin for undefined (como em solicitações do mesmo servidor), permita
    if (!origin) {
      callback(null, true);
      return;
    }

    // Normaliza a origem da requisição
    const normalizedOrigin = normalizeOrigin(origin);

    // Se o wildcard estiver presente na lista, permite todas as origens
    if (origins.includes('*')) {
      callback(null, true);
      return;
    }

    // Verifica se a origem normalizada está na lista de origens permitidas
    const allowed = origins.includes(normalizedOrigin);

    callback(null, allowed);
  };
};

/**
 * Configuração do CORS baseada em variáveis de ambiente
 */
export const corsConfig: CorsOptions = {
  origin: processOrigins(),
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};
