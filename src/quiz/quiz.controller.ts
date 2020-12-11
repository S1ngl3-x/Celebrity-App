import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import FindOneParams from '../utils/params/findOneParams';
import RequestWithUser from '../authentication/types/requestWithUser';
import JwtAuthenticationGuard from '../authentication/guards/jwtAuthentication.guard';
import AnswerQuizDto from './dto/answerQuiz.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('quiz')
@Controller('quiz')
@UseGuards(JwtAuthenticationGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiResponse({ status: 403, description: 'Access forbidden' })
@ApiResponse({ status: 400, description: 'Inappropriate input' })
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @ApiOperation({ summary: 'Generate random quiz' })
  @ApiResponse({ status: 201, description: 'New quiz with questions' })
  @Post('/')
  create(@Req() req: RequestWithUser): Promise<Quiz> {
    return this.quizService.createRandomWithQuestions(req.user);
  }

  @ApiOperation({ summary: 'Submit your answer' })
  @ApiResponse({ status: 202, description: 'Quiz with questions and answers ' })
  @Patch('/')
  @HttpCode(202)
  answerQuiz(@Body() quizDto: AnswerQuizDto, @Req() req: RequestWithUser): Promise<Quiz> {
    const quiz: Quiz = {
      ...quizDto,
      user: req.user,
    };
    return this.quizService.answerQuiz(quiz);
  }

  @ApiOperation({ summary: 'Find all quizzes' })
  @ApiResponse({ status: 200, description: 'All quizzes with their questions' })
  @ApiQuery({ name: 'page', example: 1, required: false })
  @ApiQuery({ name: 'limit', example: 5, required: false })
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
        route: 'http://localhost:5000/quiz/', // todo - repair later
      },
      req.user,
    );
  }

  @ApiOperation({ summary: 'Find all completed quizzes' })
  @ApiResponse({ status: 200, description: 'All quizzes with their questions' })
  @ApiQuery({ name: 'page', example: 1, required: false })
  @ApiQuery({ name: 'limit', example: 5, required: false })
  @Get('/completed')
  async findUncompleted(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Req() req: RequestWithUser,
  ): Promise<Pagination<Quiz>> {
    limit = limit > 100 ? 100 : limit;
    return this.quizService.findCompleted(
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
  @ApiResponse({ status: 404, description: 'Info that quiz with given id was not found' })
  @Get(':id')
  findById(@Param() { id }: FindOneParams): Promise<Quiz> {
    return this.quizService.findById(Number(id));
  }

  @ApiOperation({ summary: 'Delete quiz by id' })
  @ApiResponse({ status: 204, description: 'returns nothing' })
  @ApiResponse({ status: 404, description: 'Info that quiz with given id was not found' })
  @HttpCode(204)
  @Delete(':id')
  deleteQuiz(@Param() { id }: FindOneParams) {
    return this.quizService.delete(Number(id));
  }
}
