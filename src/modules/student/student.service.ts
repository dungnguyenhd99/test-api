import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entities';
import { CreateStudent } from './student.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async createStudent(dto: CreateStudent) {
    const newStudent = this.dataSource.query(
      `INSERT INTO game_db.student (name, birthDate, score) VALUES ('${dto.name}', '${dto.birthDate.toString()}', ${dto.score})`,
    );

    return newStudent;
  }

  async getAll(search: string) {
    let query = 'SELECT * FROM game_db.student s';
    if (search.length > 0) {
      query = query + ` WHERE s.name LIKE '%${search}%'`;
    }

    return this.dataSource.query(query);
  }
}
