package model.map;

import modelInterfaces.map.Direction;

import java.security.InvalidParameterException;
import java.util.List;

/**
 * Created by Adam on 3/14/14.
 */
public abstract class DirectionImpl implements Direction {

    protected int direction;
    protected List<String> directions;

    private int positiveModulo(int lhs, int rhs){
        return ((lhs % rhs) + rhs) % rhs;
    }

    public int getOppositeDirection(){
        return positiveModulo((direction + 3),6);
    }

    public int nextDirectionClockwise(){
        return positiveModulo((direction + 1),6);
    }

    public int nextDirectionCounterClockwise(){
        return positiveModulo((direction - 1),6);
    }

    public int nextDoubleClockwise(){
        return positiveModulo((direction + 2),6);
    }
    public int nextDoubleCounterClockwise(){
        return positiveModulo((direction - 2),6);
    }

    public int getNumDirection(){return direction;}

    public String getStringDirection(){return directions.get(direction);}

    public void setDirection(int dir){
        if(dir < 0 || dir > 5){
            throw new InvalidParameterException("Direction not between 0 and 6");
        }
        else{
            direction = dir;
        }
    }

    public void setDirection(String dir){
        dir = dir.toUpperCase();
        int index = directions.indexOf(dir);
        if(index == -1){
            throw new InvalidParameterException("Direction not valid");
        }
        else{
            direction = index;
        }
    }
}
