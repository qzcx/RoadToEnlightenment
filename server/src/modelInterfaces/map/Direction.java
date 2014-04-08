package modelInterfaces.map;

/**
 * Created by Adam on 3/14/14.
 */
public interface Direction {
    int getOppositeDirection();
    int nextDirectionClockwise();
    int nextDirectionCounterClockwise();
    int nextDoubleClockwise();
    int nextDoubleCounterClockwise();

    int getNumDirection();
    String getStringDirection();

    void setDirection(int dir);
    void setDirection(String dir);
}
