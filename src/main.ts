import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Consul from 'consul';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

  const app = await NestFactory.create(AppModule);

  const consulHost = 'consul'; // Replace with the Consul agent's host address
  const consulPort = 8500; // Replace with the desired Consul agent's port number
  const consul = new Consul({ host: consulHost, port: consulPort });

  const serviceName = 'NEST-SERVICE'; // Replace with your service name
  const servicePort = 3002; // Replace with your service's port
  const serviceId = 'NEST-SERVICE'; // Replace with a unique service ID

  const details = {
    id: serviceId,
    name: serviceName,
    port: servicePort,
  };

  consul.agent.service.register(details, (err) => {
    if (err) {
      console.error('Error registering with Consul:', err);
    } else {
      console.log(`Registered with Consul as ${serviceName} (ID: ${serviceId})`);
    }
  });

  // Listen for the 'exit' event
  process.on('exit', () => {
    // Deregister the service from Consul when the application exits
    consul.agent.service.deregister(serviceId, (err) => {
      if (err) {
        console.error('Error deregistering from Consul:', err);
      } else {
        console.log(`Deregistered from Consul (ID: ${serviceId})`);
      }
    });
  });

  await app.listen(servicePort);
}

bootstrap();
