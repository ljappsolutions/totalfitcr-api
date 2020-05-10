import { Connection, ConnectionManager, ConnectionOptions, getConnectionManager, createConnection } from 'typeorm'
import { logger } from './logger';
import { Company } from './models/Company';
import { Client } from './models/Client';
import { CompanyClass } from './models/CompanyClass';
import { CompanyExercise } from './models/CompanyExercise';
import { Employee } from './models/Employee';
import { Exercise } from './models/Exercise';
import { Person } from './models/Person';
import { Review } from './models/Review';
import { Routine } from './models/Routine';
import { RoutineDay } from './models/RoutineDay';
import { RoutineDayExercise } from './models/RoutineDayExercise';
import { RoutineDayExerciseDescription } from './models/RoutineDayExerciseDescription';
import { RoutineFocus } from './models/RoutineFocus';
import { RoutineTemplate } from './models/RoutineTemplate';
import { RoutineTemplateExercise } from './models/RoutineTemplateExercise';

export class Database {
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager()
  }

  public async getContext() {
    const connection = await this.getConnection();
    return {
      clients: connection.getRepository(Client),
      companies: connection.getRepository(Company),
      companyClasses: connection.getRepository(CompanyClass),
      companyExercises: connection.getRepository(CompanyExercise),
      employees: connection.getRepository(Employee),
      exercises: connection.getRepository(Exercise),
      people: connection.getRepository(Person),
      reviews: connection.getRepository(Review),
      routines: connection.getRepository(Routine),
      routineDays: connection.getRepository(RoutineDay),
      routineDayExercises: connection.getRepository(RoutineDayExercise),
      routineDayExerciseDescriptions: connection.getRepository(RoutineDayExerciseDescription),
      routineFocuses: connection.getRepository(RoutineFocus),
      routineTemplates: connection.getRepository(RoutineTemplate),
      routineTemplateExercises: connection.getRepository(RoutineTemplateExercise),
    }
  }

  private async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = `default`

    let connection: Connection

    if (this.connectionManager.has(CONNECTION_NAME)) {
      logger.log(`Database.getConnection()-using existing connection ...`)
      connection = this.connectionManager.get(CONNECTION_NAME)

      if (!connection.isConnected) {
        connection = await connection.connect()
      }
    }
    else {
      logger.log(`Database.getConnection()-creating connection ...`)

      const connectionOptions: ConnectionOptions = {
        type: "mysql",
        host: "totalfit.cakdrde2ewkd.us-east-1.rds.amazonaws.com",
        port: 3306,
        username: "totalfit_dev",
        password: "totalfit_dev$$",
        database: "totalfit_dev",
        synchronize: false,
        logging: true,
        timezone: 'Z',
        entities: [Client, Company, CompanyClass, CompanyExercise,
          Employee, Exercise, Person, Review, Routine, RoutineDay,
          RoutineDayExercise, RoutineDayExerciseDescription, RoutineFocus,
          RoutineTemplate, RoutineTemplateExercise]
      }
      connection = await createConnection(connectionOptions)
    }
    return connection
  }
}