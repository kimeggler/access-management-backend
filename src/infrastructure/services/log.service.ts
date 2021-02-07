import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from 'src/domain/models/log.entity';
import { LogDTO } from 'src/domain/dto/log.dto';
import { LogResponseDTO } from 'src/domain/dto/responses/logResponse.dto';
import { LogTypeENUM } from 'src/domain/enums/logtype';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  toResponseObject(data: any): LogResponseDTO {
    const { log, createdAt } = data;
    return { log, createdAt };
  }

  public async findAllAccessLogs(): Promise<LogResponseDTO[]> {
    const logs = await this.logRepository.find({
      take: 50,
      where: { type: LogTypeENUM.RASPBERRYPI },
    });
    const formattedlogs = logs.map((log) => this.toResponseObject(log));

    return formattedlogs;
  }

  public async findAllUserLogs(): Promise<LogResponseDTO[]> {
    const logs = await this.logRepository.find({
      take: 50,
      where: { type: LogTypeENUM.USER },
    });
    const formattedlogs = logs.map((log) => this.toResponseObject(log));

    return formattedlogs;
  }

  public async createEntry(log: LogDTO): Promise<Log> {
    return this.logRepository.save(log);
  }
}
