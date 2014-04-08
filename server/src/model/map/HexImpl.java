package model.map;

import com.google.inject.Inject;
import model.JsonImpl;
import modelInterfaces.map.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by: film42 on: 3/7/14.
 */
public class HexImpl extends JsonImpl implements modelInterfaces.map.Hex {

    private boolean isLand;
    private LocationImpl location;
    private List<VertexImpl> vertexes;
    private List<EdgeImpl> edges;
    private String landtype;


    public HexImpl() {
        isLand = false;
        location = new LocationImpl();

        vertexes = new ArrayList<>();
        vertexes.add(new VertexImpl());
        vertexes.add(new VertexImpl());
        vertexes.add(new VertexImpl());
        vertexes.add(new VertexImpl());
        vertexes.add(new VertexImpl());
        vertexes.add(new VertexImpl());


        edges = new ArrayList<>();
        edges.add(new EdgeImpl());
        edges.add(new EdgeImpl());
        edges.add(new EdgeImpl());
        edges.add(new EdgeImpl());
        edges.add(new EdgeImpl());
        edges.add(new EdgeImpl());

    }

    @Override
    public boolean isLand() {
        return isLand;
    }

    @Override
    public String getLandType(){return landtype;}

    @Override
    public void setLandType(String landtype) {
        this.landtype = landtype;
        //if()
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
    public List<VertexImpl> getVertexes() {
        return vertexes;
    }

    @Override
    public void setVertexes(List<VertexImpl> vertexes) {
        this.vertexes = vertexes;
    }

    @Override
    public List<EdgeImpl> getEdges() {
        return edges;
    }

    @Override
    public Edge getEdge(int direction){
        return edges.get(direction);
    }

    @Override
    public Vertex getVertex(int direction){
        return vertexes.get(direction);
    }

    @Override
    public void setEdges(List<EdgeImpl> edges) {
        this.edges = edges;
    }
}
