import { connect } from "mqtt";

// MQTT broker URL
const brokerUrl = "mqtt://mqtt-broker"; // Replace with your broker's URL

// Create an MQTT mqttClient
const mqttClient = connect(brokerUrl, {
  username: "user1",
  password: "admin1234",
});

mqttClient.on("connect", () => {
  console.log("Subscriber connected to MQTT broker");
  console.log(
    `Subscribing to topic demoTopic/partition${process.env.PARTITION_NUMBER}`
  );

  // Subscribe to a topic
  const topic = `demoTopic/partition${process.env.PARTITION_NUMBER}`;
  mqttClient.subscribe(topic, { qos: 1 });
});

// Handle incoming messages
mqttClient.on("message", async (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message}`);
});

// Handle error event
mqttClient.on("error", (error) => {
  console.error("Subscriber could not connect to MQTT broker:", error.message);
});
