package comm.request.base;

import com.google.gson.Gson;
import model.JsonParseable;

/**
 * Created by: film42 on: 3/12/14.
 */
public class BaseRequest implements JsonParseable {

    public static <T> T fromJson(String json, Class<T> type) {
        Gson gson = new Gson();
        return gson.fromJson(json, type);
    }

}
