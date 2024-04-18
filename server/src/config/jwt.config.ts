import { JwtModuleOptions } from '@nestjs/jwt';

export default (): { jwtConfig: JwtModuleOptions } => ({
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
  },
});
