const { connect } = require("mqtt");

// MQTT broker URL
const brokerUrl = "mqtt://mqtt-broker"; // Replace with your broker's URL

// Create an MQTT mqttClient
const mqttClient = connect(brokerUrl, {
  username: "user1",
  password: "admin1234",
});

mqttClient.on("connect", () => {
  console.log("Subscriber connected to MQTT broker");
  // Subscribe to a topic
  const topic = 'demoTopic'

  // If the MQTT_GROUP_ID environment variable is set, use shared subscriptions
  if (process.env.MQTT_GROUP_ID) {
    console.log(`Using shared subscription with group ID ${process.env.MQTT_GROUP_ID} for topic ${topic}`);
    mqttClient.subscribe(`$share/${process.env.MQTT_GROUP_ID}/${topic}`, { qos: 1 });
  } else {
    console.log(`Using regular subscription for topic ${topic}`);
    mqttClient.subscribe(topic, { qos: 1 });
  }
});

// Handle incoming messages
mqttClient.on("message", async (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message}`);
});

// Handle error event
mqttClient.on("error", (error) => {
  console.error("Subscriber could not connect to MQTT broker:", error.message);
});
