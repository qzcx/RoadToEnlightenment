package modelInterfaces.map;

import model.map.VertexValueImpl;

/**
 * Created by Jon George on 3/13/14.
 */
public interface Vertex {

    public static final int EMPTY = 0;
    public static final int SETTLEMENT = 1;
    public static final int CITY = 2;

    VertexValue getValue();

    void setValue(VertexValueImpl newValue);
}
