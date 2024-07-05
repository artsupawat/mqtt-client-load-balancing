This repository contains source code for demonstrating the use of MQTT v5 shared supscriptons feature. You can select the branch for each approach that you want to see in action.

## Approach 1: Shared Subscriptions with Multiple Partitions
branch: **multiple-partitions-topic-hierarchy**

This approach uses the topic hierarchy to create multiple partitions for shared subscriptions. The topic hierarchy is used to create multiple partitions for shared subscriptions to each consumer. The consumers can subscribe to the shared subscription by using the topic filter that matches the topic hierarchy.

For example:
- Publisher publishes messages to the topic 'demoTopic/partition1', 'demoTopic/partition2', or 'demoTopic/partition3' randomly.
- Consumer1 subscribes to the shared subscription 'demoTopic/partition1'.
- Consumer2 subscribes to the shared subscription 'demoTopic/partition2'.
- Consumer3 subscribes to the shared subscription 'demoTopic/partition3'.

## Approach 2: Shared Subscriptions with new Feature in MQTT (MQTT v5)
branch: **shared-subscriptions-mqtt-v5**

From HiveMQ.com:
> In a standard MQTT subscription, each subscribing client is privy to a copy of each message broadcasted to that topic. With shared subscriptions, clients sharing a subscription in the same group receive messages in rotation, a process sometimes referred to as client load balancing. The message load of a single topic is distributed across all subscribers.

Structure of the shared subscription topic:
```
$share/<group>/topic
```

The first part is the shared subscription identifier, which is `$share`. The second part is the group identifier, which is the name of the group. The third part is the actual topic that the shared subscription is subscribing to.

For example:
![shared-subscriptions](mqtt-shared-subscription-v2.png)

- Publisher publishes messages to the topic 'demoTopic'.
- Consumer1 subscribes to the shared subscription '$share/group1/demoTopic'.
- Consumer2 subscribes to the shared subscription '$share/group1/demoTopic'.
- Consumer3 subscribes to the shared subscription '$share/group1/demoTopic'.

### References:
- [StackOverflow thread: Is it possible to distribute reads of an MQTT topic over multiple consumers?](https://stackoverflow.com/questions/27850819/is-it-possible-to-distribute-reads-of-an-mqtt-topic-over-multiple-consumers)
- [HiveMQ Blog: Shared Subscriptions in MQTT v5](https://www.hivemq.com/blog/mqtt5-essentials-part7-shared-subscriptions/)
