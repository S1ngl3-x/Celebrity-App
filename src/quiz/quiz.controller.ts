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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('quiz')
@Controller('quiz')
@UseGuards(JwtAuthenticationGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiResponse({ status: 403, description: 'Access forbidden' })
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @ApiOperation({ summary: 'Create random quiz' })
  @ApiResponse({ status: 201, description: 'New quiz with questions' })
  @Post('/')
  create(@Body() quizDto: CreateQuizDto, @Req() req: RequestWithUser): Promise<Quiz> {
    return this.quizService.createRandomWithQuestions(req.user);
  }

  @ApiOperation({ summary: 'Submit your answer' })
  @ApiResponse({ status: 202, description: 'Quiz with questions and answers ' })
  @Patch('/')
  answerQuiz(@Body() quizDto: AnswerQuizDto): Promise<Quiz> {
    return this.quizService.answerQuiz(quizDto);
  }

  @ApiOperation({ summary: 'Find all quizzes' })
  @ApiResponse({ status: 200, description: 'All quizzes with their questions' })
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
        route: 'http://localhost:5000/quiz/',
      },
      req.user,
    );
  }

  @ApiOperation({ summary: 'Find one quiz by id' })
  @ApiResponse({ status: 200, description: 'Quiz with its questions', type: Quiz })
  @Get(':id')
  findById(@Param() { id }: FindOneParams): Promise<Quiz> {
    return this.quizService.findById(Number(id));
  }

  @ApiOperation({ summary: 'Update quiz by id' })
  @ApiResponse({ status: 202, description: 'Quiz with its questions' })
  @Patch(':id')
  updateQuiz(@Param() { id }: FindOneParams, @Body() quiz: UpdateQuizDto) {
    return this.quizService.update(Number(id), quiz);
  }

  @ApiOperation({ summary: 'Delete quiz by id' })
  @ApiResponse({ status: 204, description: 'returns nothing' })
  @Delete(':id')
  deleteQuiz(@Param() { id }: FindOneParams) {
    return this.quizService.delete(Number(id));
  }
}
