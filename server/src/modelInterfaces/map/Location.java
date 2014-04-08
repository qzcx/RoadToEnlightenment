package modelInterfaces.map;

/**
 * Created by Jon George on 3/13/14.
 */
public interface Location {

    Location getNeighborLocation(int direction);

    int getX();

    void setX(int x);

    int getY();

    void setY(int y);
}
