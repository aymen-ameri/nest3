import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Consul from 'consul';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Register your service with Consul
  const consul = new Consul();
  const serviceName = 'nest'; // Replace with your service name
  const servicePort = 3002; // Replace with your service's port

  const details = {
    name: serviceName,
    port: servicePort,
  };

  consul.agent.service.register(details, (err) => {
    if (err) {
      console.error('Error registering with Consul:', err);
    } else {
      console.log(`Registered with Consul as ${serviceName}`);
    }
  });

  await app.listen(servicePort);
}
bootstrap();