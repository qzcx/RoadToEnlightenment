package modelInterfaces.map;

import model.map.LocationImpl;
import model.map.VertexLocationImpl;

/**
 * Created by qzcx on 3/18/14.
 */
public interface Port {
    void init(String inputResource,
              LocationImpl location,
              String orientation,
              int ratio,
              VertexLocationImpl validVertex1,
              VertexLocationImpl validVertex2);

    String getInputResource();

    void setInputResource(String inputResource);

    LocationImpl getLocation();

    void setLocation(LocationImpl location);

    String getOrientation();

    void setOrientation(String orientation);

    int getRatio();

    void setRatio(int ratio);

    VertexLocationImpl getValidVertex1();

    void setValidVertex1(VertexLocationImpl validVertex1);

    VertexLocationImpl getValidVertex2();

    void setValidVertex2(VertexLocationImpl validVertex2);
}
