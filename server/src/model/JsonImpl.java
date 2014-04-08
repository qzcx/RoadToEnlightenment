package model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import model.base.*;
import model.deserializer.InterfaceDeserializer;
import model.map.LocationImpl;
import model.map.MapImpl;
import model.messaging.ChatImpl;
import model.messaging.LineImpl;
import model.messaging.LogImpl;
import modelInterfaces.base.*;
import modelInterfaces.map.Location;
import modelInterfaces.map.Map;
import modelInterfaces.messaging.Chat;
import modelInterfaces.messaging.Line;
import modelInterfaces.messaging.Log;

/**
 * Created by Jon George on 3/13/14
 */
public class JsonImpl implements JsonSerializable, JsonParseable{


    @Override
    public String toJson() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    public static <T> T fromJson(String json, Class<T> type) {

        // Attach Special Cases
        GsonBuilder gb = new GsonBuilder();
        gb.registerTypeAdapter(Game.class, new InterfaceDeserializer<GameImpl>(GameImpl.class));
        gb.registerTypeAdapter(Deck.class, new InterfaceDeserializer<DeckImpl>(DeckImpl.class));
        gb.registerTypeAdapter(Player.class, new InterfaceDeserializer<PlayerImpl>(PlayerImpl.class));
        gb.registerTypeAdapter(Log.class, new InterfaceDeserializer<LogImpl>(LogImpl.class));
        gb.registerTypeAdapter(Chat.class, new InterfaceDeserializer<ChatImpl>(ChatImpl.class));
        gb.registerTypeAdapter(Resources.class, new InterfaceDeserializer<ResourcesImpl>(ResourcesImpl.class));
        gb.registerTypeAdapter(TurnTracker.class, new InterfaceDeserializer<TurnTrackerImpl>(TurnTrackerImpl.class));
        gb.registerTypeAdapter(TradeOffer.class, new InterfaceDeserializer<TradeOfferImpl>(TradeOfferImpl.class));
        gb.registerTypeAdapter(Line.class, new InterfaceDeserializer<LineImpl>(LineImpl.class));
        gb.registerTypeAdapter(Map.class, new InterfaceDeserializer<MapImpl>(MapImpl.class));
        gb.registerTypeAdapter(Location.class, new InterfaceDeserializer<LocationImpl>(LocationImpl.class));


        // Create and deserialize
        Gson gson = gb.create();
        return gson.fromJson(json, type);
    }


}
