package model.map;

import modelInterfaces.map.Port;
import modelInterfaces.map.VertexLocation;

/**
 * Created by qzcx on 3/18/14.
 */
public class PortImpl implements Port {
    String inputResource;
    LocationImpl location;
    String orientation;
    int ratio;
    VertexLocationImpl validVertex1;
    VertexLocationImpl validVertex2;

    public PortImpl() {
    }

    @Override
    public void init(String inputResource,                     LocationImpl location,
                     String orientation,
                     int ratio,
                     VertexLocationImpl validVertex1,
                     VertexLocationImpl validVertex2) {
        this.inputResource = inputResource;
        this.location = location;
        this.orientation = orientation;
        this.ratio = ratio;
        this.validVertex1 = validVertex1;
        this.validVertex2 = validVertex2;
    }

    @Override
    public String getInputResource() {
        return inputResource;
    }

    @Override
    public void setInputResource(String inputResource) {
        this.inputResource = inputResource;
    }

    @Override
    public LocationImpl getLocation() {
        return location;
    }

    @Override
    public void setLocation(LocationImpl location) {
        this.location = location;
    }

    @Override
    public String getOrientation() {
        return orientation;
    }

    @Override
    public void setOrientation(String orientation) {
        this.orientation = orientation;
    }

    @Override
    public int getRatio() {
        return ratio;
    }

    @Override
    public void setRatio(int ratio) {
        this.ratio = ratio;
    }

    @Override
    public VertexLocationImpl getValidVertex1() {
        return validVertex1;
    }

    @Override
    public void setValidVertex1(VertexLocationImpl validVertex1) {
        this.validVertex1 = validVertex1;
    }

    @Override
    public VertexLocationImpl getValidVertex2() {
        return validVertex2;
    }

    @Override
    public void setValidVertex2(VertexLocationImpl validVertex2) {
        this.validVertex2 = validVertex2;
    }
}
