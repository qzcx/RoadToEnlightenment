package model.map;

/**
 * Created by qzcx on 3/18/14.
 */
public class VertexLocationImpl implements modelInterfaces.map.VertexLocation {
    int x;
    int y;
    String direction;

    @Override
    public int getX() {
        return x;
    }

    @Override
    public void setX(int x) {
        this.x = x;
    }

    @Override
    public int getY() {
        return y;
    }

    @Override
    public void setY(int y) {
        this.y = y;
    }

    @Override
    public String getDirection() {
        return direction;
    }

    @Override
    public void setDirection(String direction) {
        this.direction = direction;
    }
}
