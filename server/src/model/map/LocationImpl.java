package model.map;


import modelInterfaces.map.Direction;
import modelInterfaces.map.Location;

/**
 * Created by: film42 on: 3/7/14.
 */
public class LocationImpl implements modelInterfaces.map.Location {

    private int x;
    private int y;

    public LocationImpl() {
        x = 0;
        y = 0;
    }

    public LocationImpl(int x, int y){
        this.x = x;
        this.y = y;
    }

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
    public Location getNeighborLocation(int direction){
        int x = 0;
        int y = 0;

        switch (direction) {
            case 0: //NW Edge, W Vertex
                x = -1; y = 0;
                break;
            case 1: //N Edge, NW Vertex
                x = 0; y = -1;
                break;
            case 2: //NE Edge, NE Vertex
                x = 1; y = -1;
                break;
            case 3: //SE Edge, E Vertex
                x = 1; y = 0;
                break;
            case 4: //S Edge, SE Vertex
                x = 0; y = 1;
                break;
            case 5: //SW Edge, SW Vertex
                x = -1; y = 1;
                break;

        }
        Location loc = new LocationImpl();
        loc.setX(this.getX() + x);
        loc.setY(this.getY() + y);
        return loc;
    }
}
