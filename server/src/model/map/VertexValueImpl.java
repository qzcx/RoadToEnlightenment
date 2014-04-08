package model.map;

import model.JsonImpl;
import model.Model;

/**
 * Created by: film42 on: 3/7/14.
 */
public class VertexValueImpl extends JsonImpl implements modelInterfaces.map.VertexValue {

    private int worth;
    private int ownerID;

    public VertexValueImpl() {
        worth = 0;
        ownerID = -1;
    }

    @Override
    public int getWorth(){
        return worth;
    }

    @Override
    public void setWorth(int newWorth){
        worth = newWorth;
    }

    @Override
    public int getOwnerID(){
        return ownerID;
    }

    @Override
    public void setOwnerID(int newID){
        ownerID = newID;
    }
}
