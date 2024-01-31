import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Consul from 'consul';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Specify the host for Consul agent
  const consulHost = 'consul'; // Replace with the Consul agent's host address
  const consul = new Consul({ host: consulHost });

  const serviceName = 'nest'; // Replace with your service name
  const servicePort = 3002; // Replace with your service's port
  const serviceId = 'unique-service-id'; // Replace with a unique ID for your service

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
