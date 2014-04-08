package comm.request;

/**
 * Created by Jon George on 3/7/14.
 */
public class JoinGameRequest {
    private String color;
    private String id;

    public String getColor() {
        return color;
    }

    public String getId() {
        return id;
    }

    public JoinGameRequest(String color, String id) {

        this.color = color;
        this.id = id;
    }
}
