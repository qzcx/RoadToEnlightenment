package model.map;

import java.util.ArrayList;

/**
 * Created by Adam on 3/18/14.
 */
public class VertexDirection extends DirectionImpl{

    public VertexDirection(){
        direction = 0;
        directions = new ArrayList<String>();
        directions.add("W");
        directions.add("NW");
        directions.add("NE");
        directions.add("E");
        directions.add("SE");
        directions.add("SW");
    }

    public VertexDirection(String direction) {
        this();

        this.setDirection(direction);
    }

    public VertexDirection(int direction) {
        this();

        this.setDirection(direction);
    }
}
