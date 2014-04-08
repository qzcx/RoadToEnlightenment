package model.users;

import com.google.inject.Inject;

/**
 * Created by Jon George on 3/13/14.
 */
public class UserImpl implements modelInterfaces.users.User {
    private static int nextID = 0;
    private String name = null;
    private String password = null;
    private int id;

    @Inject
    public UserImpl() {
        this.id = nextID;
        nextID++;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public int getId() {
        return id;
    }
}
