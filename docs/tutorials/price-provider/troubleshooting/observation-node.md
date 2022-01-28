# Observation node

### **The node does not sync after a long time and dies abruptly, what to do?**

Make sure, that the database location has sufficient disk space (database size might change a lot during bootstrapping).

### I'm getting strange errors on submission and revert messages are cryptic

This might be a symptom of node connection error. Try to restart node and make sure you have enough disk space.

### **I am getting a strange error `failed to send GetAcceptedFrontier(MtF8bVH241hetCQJgsKEdKyJBs8vhp1BC, 11111111111111111111111111111111LpoYY, NUMBER)` when bootstrapping the node, what should I do?**

It seems, that your node got disconnected during the bootstrapping. Restart the node, but to speed up the process, use `--existing` flag to reuse the data and don’t do the bootstrap from zero.

### **I have synced the node but it does not become healthy. What can I do?**

It often happens that a new node gets synced but stays unhealthy for no apparent reason. A restart with `--existing` flag usually helps.
