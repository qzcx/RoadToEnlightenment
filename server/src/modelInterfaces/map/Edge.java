package modelInterfaces.map;

import model.map.EdgeValueImpl;

/**
 * Created by Jon George on 3/13/14.
 */
public interface Edge {

    EdgeValueImpl getValue();

    void setValue(EdgeValueImpl newValue);
}
