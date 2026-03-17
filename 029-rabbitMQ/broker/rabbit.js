import amqp from "amqplib";

let channel, connection;

export const connectMQ = async () => {
  connection = await amqp.connect(process.env.RABBITMQ_URI);
  channel = await connection.createChannel();

  console.log("RabbitMQ is Connected");
};

export const publishToQueue = async (queueName, data) => {
  if (!channel) {
    return;
  }
  await channel.assertQueue(queueName, { durable: true });
  await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });

  console.log("Message sent to queue ", queueName);
};

export const subscribeToQueue = async (queueName, callback) => {
  if (!channel) {
    return;
  }
  await channel.assertQueue(queueName, { durable: true });
  await channel.consume(queueName, (msg) => {
    if (msg !== null) {
      callback(JSON.parse(msg.content.toString()));
      channel.ack(msg);
    }
  });
};

/* 
  =========================================
  🚀 USAGE EXAMPLES (Educational)
  =========================================
*/

/**
 * Example: Producer (Sending a message)
 * In a real app, you would call this inside your route/controller.
 */
const producerExample = async () => {
  const mockUser = {
    id: "123",
    email: "test@example.com",
    firstName: "John",
    lastName: "Doe",
    role: "user",
  };

  await publishToQueue("user-created-queue", mockUser);
};

/**
 * Example: Consumer (Receiving a message)
 * In a real app, you would call this when the service starts.
 */
const consumerExample = async () => {
  subscribeToQueue("user-created-queue", async (data) => {
    const { email, firstName, lastName } = data;
    console.log(`Processing welcome email for: ${firstName} ${lastName} (${email})`);

    // In a real app, you'd call your email service here:
    // await sendEmail(email, "Welcome!", undefined, userTemplate);
  });
};

// Note: To test these, you would first need to call connectMQ()
// and ensure RABBITMQ_URI is set in your environment.
// producerExample();
// consumerExample();
