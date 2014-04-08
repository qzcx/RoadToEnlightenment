package model.deserializer;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;

import java.lang.reflect.Type;

/**
 * Created by: film42 on: 3/23/14.
 */
public class InterfaceDeserializer<T> implements JsonDeserializer<T> {

    private Class<T> classType;

    public InterfaceDeserializer(Class<T> type) {
        classType = type;
    }

    @Override
    public T deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
            throws JsonParseException {

        return context.deserialize(json, classType);

    }


}

