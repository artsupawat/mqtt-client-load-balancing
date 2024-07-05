const { connect } = require("mqtt");
const { v4: uuidv4 } = require("uuid");

// MQTT broker URL
const brokerUrl = "mqtt://mqtt-broker"; // Replace with your broker's URL

// Create an MQTT client
const client = connect(brokerUrl, {
  username: "user1",
  password: "admin1234",
});

// Handle connection event
client.on("connect", () => {
  console.log("Publisher connected to MQTT broker");

  setInterval(() => {
    const message = {
      messageId: uuidv4(), // Generate a UUID
      timestamp: Date.now(), // Add a timestamp
      payload: "Hello, MQTT!",
      topic: 'demoTopic'
    };

    client.publish(
      message.topic,
      JSON.stringify(message),
      { qos: 1 },
      (err) => {
        if (err) {
          console.error("Error publishing message:", err);
        } else {
          console.log(
            `Message published successfully: ${JSON.stringify(message)}`
          );
        }
      }
    );
  }, 5000);
});

// Handle error event
client.on("error", (error) => {
  console.error("Publisher could not connect to MQTT broker:", error.message);
});
