package comm.request;

/**
 * Created by Jon George on 3/7/14.
 */
public class UserRequest {
    private String name;
    private String password;

    public UserRequest(String name, String password) {
        this.name = name;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }
}
