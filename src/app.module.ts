import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot("mongodb://<dbuser>:<dbpassword>@ds155516.mlab.com:55516/nest-api", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      auth: {
        password: "ad1minadmin",
        user: "erislandio"
      }
    }),
  ],
  controllers: [],
  providers: [],

})

export class AppModule { }
