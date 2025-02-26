import { Global, Module } from "@nestjs/common";
import { ConfigService } from "./config/config.service";
import { UsersModule } from "src/users/users.module";
import { AuthsModule } from "src/auths/auths.module";
import { AuthGuard } from "./guards/authGuard";

@Global()
@Module({
    imports: [UsersModule,AuthsModule],
    providers: [ConfigService,AuthGuard],
    exports: [ConfigService,AuthGuard]
})
export class SharedModule{}