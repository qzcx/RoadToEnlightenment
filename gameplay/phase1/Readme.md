Phase 1 - Settlers of Catan
===========================

Goal of this phase is to have a functional client side model, tested with qUnit.

Directory Listing
```
./catan: Module Listing
core   models proxy

./catan/core: Core Module
game.js

./catan/models: Model Module
bank.js       client.js     devCards.js   player.js     tradeOffer.js
chat          deck.js       map           resources.js  turn.js

./catan/models/chat: Chat Module
chat.js        message.js

./catan/models/map: Map Module
edge.js           hexGrid.js        places            vertexValue.js
edgeValue.js      hexLocation.js    vertex.js
hex.js            map.js            vertexLocation.js

./catan/models/map/places: Places Module
city.js       port.js       road.js       robber.js     settlement.js

./catan/proxy: Proxy Module
client.js
```
