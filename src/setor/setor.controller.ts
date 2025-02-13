import { Controller, Post } from '@nestjs/common';
import { SetorService } from './setor.service';

@Controller('setor')
export class SetorController {
    constructor(private readonly setorService : SetorService){}

    @Post()
    createSetor(){

    }
    
}
