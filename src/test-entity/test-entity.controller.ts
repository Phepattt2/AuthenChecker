import { Controller, HttpCode, HttpStatus, Post ,Body ,Get } from '@nestjs/common';
import { TestEntityService } from './test-entity.service';
import { testEntity } from 'src/entity/test.Entity';
import { testEntityDTO } from 'src/dto/test-entity.dto';

@Controller('test')
export class TestEntityController {
    constructor( private readonly testEntityService: TestEntityService) {}
    
    @Post("/createTestEntity")
    @HttpCode(HttpStatus.CREATED)
    async createTest(@Body() newTest : testEntityDTO) : Promise<testEntity> {
        const test = new testEntity() ; 
        console.log("controller : ",newTest)
        test.age = newTest.age ; 
        test.user = newTest.user ; 
        return await this.testEntityService.addTest(test) ; 
    }

    @Get("/getAlltest")
    
    async getAll() : Promise<testEntity[]> {
        console.log("recived get request")
        return this.testEntityService.findAll() ; 
    }





}
