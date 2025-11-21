import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePortofolioDto } from './create-portofolio.dto';
import{ Portofolio } from './portofolio';

@Controller("/portofolio")
export class PortofolioController {
  constructor() {}

  @Post("/")
  createPortofolio(@Body() dto: CreatePortofolioDto){
    const portofolio = new Portofolio(dto.id)

  }

  


}
