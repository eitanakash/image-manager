import amqp = require('amqplib/callback_api');
import { env } from '../env';

const addQueue = async () => {
  console.log(`amqp://${env.RABBITMQ_HOST}`);
  

  amqp.connect(`amqp://${env.RABBITMQ_HOST}`, (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      const queue = 'image-messages';
      channel.assertQueue(queue, {
        durable: false,
      });
    });
  });
};

export { addQueue };
