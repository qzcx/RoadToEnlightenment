package model.map;

import model.JsonImpl;
import model.Model;
import modelInterfaces.map.VertexValue;

/**
 * Created by: film42 on: 3/7/14.
 */
public class VertexImpl extends JsonImpl implements modelInterfaces.map.Vertex {

    private VertexValueImpl value;

    public VertexImpl() {
        value = new VertexValueImpl();
    }

    @Override
    public VertexValueImpl getValue(){
        return value;
    }

    @Override
    public void setValue(VertexValueImpl newValue){
        value = newValue;
    }
}
