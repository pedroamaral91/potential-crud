import { TypeOrmConfigModule } from '../typeorm/typeorm.module';

type ORMDrivers = 'typeorm' | 'sequelize';

/**
 * Utilizado para criar novas instâncias de outros ORM's
 * Caso necessário, adicionar no Mapa e usar para conexão no DBModule.
 */
export default new Map<ORMDrivers, any>([
  ['typeorm', () => TypeOrmConfigModule],
]);
