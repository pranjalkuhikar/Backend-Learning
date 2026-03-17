# 🐰 Learning RabbitMQ with amqplib

This module introduces **RabbitMQ**, a powerful open-source message broker that allows different parts of your system to communicate asynchronously.

## 📌 What is RabbitMQ?

**RabbitMQ** acts as a middleman (broker) for messages. Instead of one service calling another directly (synchronous), it sends a message to RabbitMQ, which then delivers it to one or more "consumers".

### Key Concepts:
- **Producer:** The application that sends messages.
- **Consumer:** The application that receives and processes messages.
- **Queue:** A buffer that stores messages until they are consumed.
- **Exchange:** Logic that decides which queue a message should go to (like a routing desk).
- **Message:** The data being sent (usually JSON).

### Why use RabbitMQ?
- **Decoupling:** Services don't need to know about each other.
- **Scalability:** You can have many consumers processing messages from one queue.
- **Reliability:** Messages aren't lost if a service goes down; they wait in the queue.
- **Asynchronous Work:** Handle heavy tasks (like sending emails) in the background.

---

## 🛠 Setup & Configuration

### 1. Installation
Ensure you have installed the client library:
```bash
npm install amqplib
```

### 2. Environment Variables
Add your RabbitMQ connection URI (e.g., from CloudAMQP or a local instance) to your environment:
```env
RABBITMQ_URI="amqp://your_username:your_password@your_host"
```

### 3. Connection Logic
We initialize the connection and channel in [broker/rabbit.js](file:///Users/pranjalkuhikar/Desktop/Backend-Learning/029-rabbitMQ/broker/rabbit.js):

```javascript
import amqp from "amqplib";

let channel, connection;

export const connectMQ = async () => {
    connection = await amqp.connect(process.env.RABBITMQ_URI);
    channel = await connection.createChannel();
    console.log("RabbitMQ is Connected");
};
```

---

## 🚀 Using the Helper Methods

### Publishing to a Queue (Producer)
Use `publishToQueue` to send a message.

```javascript
import { publishToQueue } from './broker/rabbit.js';

const orderData = { id: 101, total: 50.00 };
await publishToQueue("order-processing", orderData);
```

### Subscribing to a Queue (Consumer)
Use `subscribeToQueue` to listen for and process messages.

```javascript
import { subscribeToQueue } from './broker/rabbit.js';

subscribeToQueue("order-processing", (data) => {
    console.log("Processing order:", data.id);
});
```

---

## 💡 Practical Use Cases

1. **Email/SMS Notifications:** When a user registers, send a "welcome" message to a queue. An email service consumes it and sends the email.
2. **Image Processing:** Upload a high-res image, send a job to the queue, and have a worker service create thumbnails.
3. **Log Aggregation:** Send logs from multiple services to a central queue for processing and storage.
4. **Order Fullfillment:** After a payment is successful, send a message to the "warehouse" and "shipping" queues.

---

## 📚 Further Learning

- [RabbitMQ Official Tutorials](https://www.rabbitmq.com/getstarted.html)
- [amqplib Documentation](http://squaremo.github.io/amqp.node/channel_api.html)
- [CloudAMQP RabbitMQ Guide](https://www.cloudamqp.com/blog/part1-rabbitmq-for-beginners-what-is-rabbitmq.html)

Happy Messaging! 🐇✉️
