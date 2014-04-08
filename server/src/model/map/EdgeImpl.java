package model.map;

import model.JsonImpl;
import model.Model;
import modelInterfaces.map.EdgeValue;

/**
 * Created by: film42 on: 3/7/14.
 */
public class EdgeImpl extends JsonImpl implements modelInterfaces.map.Edge {

    private EdgeValueImpl value;

    public EdgeImpl() {
        value = new EdgeValueImpl();
    }

    @Override
    public EdgeValueImpl getValue(){
        return value;
    }

    @Override
    public void setValue(EdgeValueImpl newValue){
        value = newValue;
    }
}
