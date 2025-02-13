import { Body, Controller, Post, Get, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { SetorService } from './setor.service';
import { CreateSetorDto } from './dto/setor-dto';
import { UpdateSetorDto } from './dto/updateSetor-dto';
import { Res } from '@nestjs/common';
import { Response } from "express" 

@Controller('setor')
export class SetorController {
    constructor(private readonly setorService : SetorService){}

    @Get()
    GetAllSetor(@Res() response: Response){
        return this.setorService.getAllSetor(response)
    }
    
    @Post('create')
    CreateSetor(@Body() createSetor: CreateSetorDto, @Res() response: Response){
        return this.setorService.createSetor(createSetor, response)
    }

    @Put("update/:id")
    updateSetor(@Param("id", ParseIntPipe) id: number, @Body() updatesetor : UpdateSetorDto){
        return this.setorService.updateSetor(id, updatesetor)
    }

    @Delete("delete/:id")
    deleteSetor(@Param("id", ParseIntPipe) id: number) {
        return this.setorService.deleteSetor(id)
    }
    
}
