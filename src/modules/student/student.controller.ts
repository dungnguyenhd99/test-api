import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpStatus,
  HttpException,
  Query,
} from '@nestjs/common';
import { StudentsService } from './student.service';
import { CreateStudent } from './student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async findAll(@Query('search') search: string) {
    return this.studentsService.getAll(search);
  }

  @Post()
  async createStudent(@Body() dto: CreateStudent) {
    return this.studentsService.createStudent(dto);
  }
}
