import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortofolioModule } from './portofolio/portofolio.module';

@Module({
  imports: [PortofolioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
