import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import Quiz from './quiz.entity';
import CreateQuizDto from './dto/createQuiz.dto';
import FindOneParams from '../utils/params/findOneParams';
import UpdateQuizDto from './dto/updateQuiz.dto';
import RequestWithUser from '../authentication/types/requestWithUser';
import JwtAuthenticationGuard from '../authentication/guards/jwtAuthentication.guard';
import AnswerQuizDto from './dto/answerQuiz.dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('quiz')
@UseGuards(JwtAuthenticationGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('/')
  create(@Body() quizDto: CreateQuizDto, @Req() req: RequestWithUser): Promise<Quiz> {
    return this.quizService.createRandomWithQuestions(req.user);
  }

  @Patch('/')
  answerQuiz(@Body() quizDto: AnswerQuizDto): Promise<Quiz> {
    return this.quizService.answerQuiz(quizDto);
  }

  @Get('/')
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Req() req: RequestWithUser,
  ): Promise<Pagination<Quiz>> {
    limit = limit > 100 ? 100 : limit;
    return this.quizService.findAllByUser(
      {
        page,
        limit,
        route: 'http://localhost:3000/quiz/',
      },
      req.user,
    );
  }

  @Get(':id')
  findById(@Param() { id }: FindOneParams): Promise<Quiz> {
    return this.quizService.findById(Number(id));
  }

  @Patch(':id')
  updateQuiz(@Param() { id }: FindOneParams, @Body() quiz: UpdateQuizDto) {
    return this.quizService.update(Number(id), quiz);
  }

  @Delete(':id')
  deleteQuiz(@Param() { id }: FindOneParams) {
    return this.quizService.delete(Number(id));
  }
}
