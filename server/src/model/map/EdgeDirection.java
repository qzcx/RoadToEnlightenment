package model.map;

import java.util.ArrayList;

/**
 * Created by Adam on 3/18/14.
 */
public class EdgeDirection extends DirectionImpl{

    public EdgeDirection(){
        direction = 0;
        directions = new ArrayList<String>();
        directions.add("NW");
        directions.add("N");
        directions.add("NE");
        directions.add("SE");
        directions.add("S");
        directions.add("SW");
    }

    public EdgeDirection(String direction) {
        this();

        this.setDirection(direction);
    }

    public EdgeDirection(int direction) {
        this();

        this.setDirection(direction);
    }
}
