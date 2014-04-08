package model.map;

import model.JsonImpl;
import model.Model;

/**
 * Created by: film42 on: 3/7/14.
 */
public class RobberImpl extends JsonImpl implements modelInterfaces.map.Robber {

    private int x;
    private int y;

    public RobberImpl() {
        // TODO: This is code duplication, but easier to serialize when duplicated.
        x = 0;
        y = 0;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getX() {

        return x;
    }

    public void setX(int x) {
        this.x = x;
    }
}
